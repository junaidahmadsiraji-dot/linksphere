import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AdminLib "../lib/admin";
import ModerationLib "../lib/moderation";
import AdminTypes "../types/admin";
import FeedTypes "../types/feed";
import ProfileTypes "../types/profile";
import Common "../types/common";

mixin (
  admins : Map.Map<Text, AdminTypes.AdminRecord>,
  sessions : Map.Map<Common.AdminSessionToken, AdminTypes.AdminSession>,
  posts : List.List<FeedTypes.Post>,
  comments : List.List<FeedTypes.Comment>,
  flags : List.List<AdminTypes.FlagRecord>,
  profiles : Map.Map<Common.UserId, ProfileTypes.UserProfile>,
) {
  // Flag a post for admin review (any logged-in user)
  public shared ({ caller }) func flagPost(postId : Common.PostId, reason : Text) : async () {
    ModerationLib.flagPost(flags, postId, caller, reason, Time.now());
  };

  // Get all flagged posts (admin only)
  public query func getFlaggedPosts(token : Common.AdminSessionToken) : async [FeedTypes.PostView] {
    switch (AdminLib.validateSession(sessions, token)) {
      case null Runtime.trap("Unauthorized: Invalid admin session");
      case (?_) ModerationLib.getFlaggedPosts(posts, flags, profiles);
    };
  };

  // Approve or delete a flagged post (admin only)
  public shared func moderatePost(token : Common.AdminSessionToken, postId : Common.PostId, action : AdminTypes.ModerationAction) : async () {
    switch (AdminLib.validateSession(sessions, token)) {
      case null Runtime.trap("Unauthorized: Invalid admin session");
      case (?_) ModerationLib.moderatePost(posts, comments, flags, postId, action);
    };
  };
};
