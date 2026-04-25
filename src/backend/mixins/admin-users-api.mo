import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import AdminLib "../lib/admin";
import ProfileLib "../lib/profile";
import AdminTypes "../types/admin";
import ProfileTypes "../types/profile";
import FeedTypes "../types/feed";
import FileTypes "../types/files";
import ProductTypes "../types/products";
import Common "../types/common";

mixin (
  admins : Map.Map<Text, AdminTypes.AdminRecord>,
  sessions : Map.Map<Common.AdminSessionToken, AdminTypes.AdminSession>,
  profiles : Map.Map<Common.UserId, ProfileTypes.UserProfile>,
  posts : List.List<FeedTypes.Post>,
  comments : List.List<FeedTypes.Comment>,
  products : List.List<ProductTypes.Product>,
  files : List.List<FileTypes.FileRecord>,
) {
  // Get all user profiles, paginated (admin only)
  public query func getAllUsers(token : Common.AdminSessionToken, page : Nat, pageSize : Nat) : async [ProfileTypes.UserProfile] {
    switch (AdminLib.validateSession(sessions, token)) {
      case null Runtime.trap("Unauthorized: Invalid admin session");
      case (?_) {
        let all = profiles.values().toArray();
        let start = page * pageSize;
        if (start >= all.size()) return [];
        let end = Nat.min(start + pageSize, all.size());
        all.sliceToArray(start.toInt(), end.toInt());
      };
    };
  };

  // Ban a user (admin only)
  public shared func banUser(token : Common.AdminSessionToken, userId : Common.UserId) : async () {
    switch (AdminLib.validateSession(sessions, token)) {
      case null Runtime.trap("Unauthorized: Invalid admin session");
      case (?_) ProfileLib.banUser(profiles, userId);
    };
  };

  // Unban a user (admin only)
  public shared func unbanUser(token : Common.AdminSessionToken, userId : Common.UserId) : async () {
    switch (AdminLib.validateSession(sessions, token)) {
      case null Runtime.trap("Unauthorized: Invalid admin session");
      case (?_) ProfileLib.unbanUser(profiles, userId);
    };
  };

  // Delete a user's account and data (admin only)
  public shared func deleteUser(token : Common.AdminSessionToken, userId : Common.UserId) : async () {
    switch (AdminLib.validateSession(sessions, token)) {
      case null Runtime.trap("Unauthorized: Invalid admin session");
      case (?_) {
        profiles.remove(userId);
        // Remove user's posts
        let remainingPosts = posts.filter(func(p : FeedTypes.Post) : Bool {
          not (p.author == userId)
        });
        posts.clear();
        posts.append(remainingPosts);
        // Remove user's comments
        let remainingComments = comments.filter(func(c : FeedTypes.Comment) : Bool {
          not (c.author == userId)
        });
        comments.clear();
        comments.append(remainingComments);
      };
    };
  };

  // Get aggregate stats (admin only)
  public query func getAdminStats(token : Common.AdminSessionToken) : async AdminTypes.AdminStats {
    switch (AdminLib.validateSession(sessions, token)) {
      case null Runtime.trap("Unauthorized: Invalid admin session");
      case (?_) AdminLib.getStats(profiles, posts, products, files);
    };
  };

  // Get analytics data (admin only)
  public query func getAnalytics(token : Common.AdminSessionToken) : async AdminTypes.AnalyticsResult {
    switch (AdminLib.validateSession(sessions, token)) {
      case null Runtime.trap("Unauthorized: Invalid admin session");
      case (?_) AdminLib.getAnalytics(profiles, posts, comments);
    };
  };
};
