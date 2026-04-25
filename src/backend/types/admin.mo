import Common "common";

module {
  // Admin credentials and session
  public type AdminRecord = {
    email : Text;
    passwordHash : Text;
  };

  public type AdminSession = {
    token : Common.AdminSessionToken;
    adminEmail : Text;
    createdAt : Common.Timestamp;
  };

  // Moderation
  public type ModerationAction = { #approve; #delete };

  public type FlagRecord = {
    postId : Common.PostId;
    flaggedBy : Common.UserId;
    reason : Text;
    createdAt : Common.Timestamp;
  };

  // Analytics
  public type DailyCount = {
    date : Text;
    count : Nat;
  };

  public type EngagementStats = {
    totalLikes : Nat;
    totalComments : Nat;
    avgLikesPerPost : Nat;
  };

  public type AnalyticsResult = {
    userGrowth : [DailyCount];
    postActivity : [DailyCount];
    engagementStats : EngagementStats;
  };

  public type AdminStats = {
    totalUsers : Nat;
    totalPosts : Nat;
    totalProducts : Nat;
    totalFiles : Nat;
  };
};
