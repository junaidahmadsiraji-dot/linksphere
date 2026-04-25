import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import AdminTypes "../types/admin";
import Common "../types/common";
import ProfileTypes "../types/profile";
import FeedTypes "../types/feed";
import FileTypes "../types/files";
import ProductTypes "../types/products";

module {
  // Hardcoded default admin credentials
  let DEFAULT_ADMIN_EMAIL = "admin@siraji.web";
  let DEFAULT_ADMIN_PASSWORD_HASH = "Admin@123";

  // Generate a unique session token from email + timestamp
  public func generateToken(email : Text, now : Common.Timestamp) : Common.AdminSessionToken {
    email # "_" # now.toText();
  };

  // Validate admin credentials, return session or null
  public func login(
    admins : Map.Map<Text, AdminTypes.AdminRecord>,
    sessions : Map.Map<Common.AdminSessionToken, AdminTypes.AdminSession>,
    email : Text,
    password : Text,
  ) : ?AdminTypes.AdminSession {
    let isDefault = email == DEFAULT_ADMIN_EMAIL and password == DEFAULT_ADMIN_PASSWORD_HASH;
    let isRegistered = switch (admins.get(email)) {
      case (?rec) rec.passwordHash == password;
      case null false;
    };
    if (isDefault or isRegistered) {
      let now = Time.now();
      let token = generateToken(email, now);
      let session : AdminTypes.AdminSession = {
        token = token;
        adminEmail = email;
        createdAt = now;
      };
      sessions.add(token, session);
      ?session;
    } else {
      null;
    };
  };

  // Validate a session token, return admin email or null
  public func validateSession(
    sessions : Map.Map<Common.AdminSessionToken, AdminTypes.AdminSession>,
    token : Common.AdminSessionToken,
  ) : ?Text {
    switch (sessions.get(token)) {
      case (?session) ?session.adminEmail;
      case null null;
    };
  };

  // Add a new admin by email
  public func addAdmin(
    admins : Map.Map<Text, AdminTypes.AdminRecord>,
    email : Text,
    password : Text,
  ) : () {
    admins.add(email, { email = email; passwordHash = password });
  };

  // Remove admin by email
  public func removeAdmin(
    admins : Map.Map<Text, AdminTypes.AdminRecord>,
    email : Text,
  ) : () {
    admins.remove(email);
  };

  // Get all admin emails
  public func listAdmins(
    admins : Map.Map<Text, AdminTypes.AdminRecord>,
  ) : [Text] {
    admins.keys().toArray();
  };

  // Collect aggregate stats
  public func getStats(
    profiles : Map.Map<Common.UserId, ProfileTypes.UserProfile>,
    posts : List.List<FeedTypes.Post>,
    products : List.List<ProductTypes.Product>,
    files : List.List<FileTypes.FileRecord>,
  ) : AdminTypes.AdminStats {
    {
      totalUsers = profiles.size();
      totalPosts = posts.size();
      totalProducts = products.size();
      totalFiles = files.size();
    };
  };

  // Get analytics data (30-day daily counts + engagement)
  public func getAnalytics(
    profiles : Map.Map<Common.UserId, ProfileTypes.UserProfile>,
    posts : List.List<FeedTypes.Post>,
    comments : List.List<FeedTypes.Comment>,
  ) : AdminTypes.AnalyticsResult {
    let now = Time.now();
    let dayNs : Int = 24 * 60 * 60 * 1_000_000_000;
    let thirtyDaysAgo = now - 30 * dayNs;

    let userGrowth = buildDailyCounts(
      profiles.values().toArray(),
      func(p : ProfileTypes.UserProfile) : Int { p.createdAt },
      thirtyDaysAgo,
      now,
    );

    let postArr = posts.toArray();
    let postActivity = buildDailyCounts(
      postArr,
      func(p : FeedTypes.Post) : Int { p.createdAt },
      thirtyDaysAgo,
      now,
    );

    let totalLikes = postArr.foldLeft(0, func(acc : Nat, p : FeedTypes.Post) : Nat {
      acc + p.likedBy.size();
    });
    let totalComments = comments.size();
    let avgLikesPerPost = if (postArr.size() == 0) 0 else totalLikes / postArr.size();

    {
      userGrowth = userGrowth;
      postActivity = postActivity;
      engagementStats = {
        totalLikes = totalLikes;
        totalComments = totalComments;
        avgLikesPerPost = avgLikesPerPost;
      };
    };
  };

  // Helper: build 30-day daily count array
  private func buildDailyCounts<T>(
    items : [T],
    getTs : T -> Int,
    fromTs : Int,
    nowTs : Int,
  ) : [AdminTypes.DailyCount] {
    let dayNs : Int = 24 * 60 * 60 * 1_000_000_000;
    let initArr : [Nat] = Array.tabulate<Nat>(30, func(_) { 0 });
    let buckets = initArr.toVarArray<Nat>();
    for (item in items.values()) {
      let ts = getTs(item);
      if (ts >= fromTs and ts <= nowTs) {
        let diff = ts - fromTs;
        if (diff >= 0) {
          let dayIndex = Int.abs(diff / dayNs);
          if (dayIndex < 30) {
            buckets[dayIndex] := buckets[dayIndex] + 1;
          };
        };
      };
    };
    Array.tabulate<AdminTypes.DailyCount>(30, func(i) {
      let dayTs : Int = fromTs + i.toInt() * dayNs;
      { date = dayTs.toText(); count = buckets[i] };
    });
  };
};
