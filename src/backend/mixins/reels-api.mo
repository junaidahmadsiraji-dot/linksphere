import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ReelsLib "../lib/reels";
import NotifLib "../lib/notifications";
import ReelTypes "../types/reels";
import ProfileTypes "../types/profile";
import NotifTypes "../types/notifications";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  reels : List.List<ReelTypes.Reel>,
  profiles : Map.Map<Common.UserId, ProfileTypes.UserProfile>,
  notifications : List.List<NotifTypes.Notification>,
) {
  public shared ({ caller }) func createReel(input : ReelTypes.ReelInput) : async ReelTypes.Reel {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    let authorProfile = profiles.get(caller);
    let authorName = switch (authorProfile) { case (?p) p.username; case null "User_" # caller.toText() };
    let authorIsVerified = switch (authorProfile) { case (?p) p.isVerified; case null false };
    ReelsLib.createReel(reels, reels.size(), caller, authorName, authorIsVerified, input, Time.now());
  };

  public query ({ caller }) func getReels(page : Nat, pageSize : Nat) : async [ReelTypes.Reel] {
    ReelsLib.getReels(reels, page, pageSize);
  };

  public shared ({ caller }) func likeReel(reelId : Common.ReelId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    let liked = ReelsLib.toggleLike(reels, reelId, caller);
    // Notify reel author if liked (not unliked)
    if (liked) {
      switch (reels.find(func(r : ReelTypes.Reel) : Bool { r.id == reelId })) {
        case (?reel) {
          let callerName = switch (profiles.get(caller)) { case (?p) p.username; case null "Someone" };
          ignore NotifLib.pushNotification(
            notifications, notifications.size(), reel.authorId, #like_post, caller, callerName,
            ?reelId, ?"reel", callerName # " liked your reel",
            Time.now(),
          );
        };
        case null {};
      };
    };
    liked;
  };

  public shared ({ caller }) func saveReel(reelId : Common.ReelId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    ReelsLib.toggleSaved(reels, reelId, caller);
  };

  public shared ({ caller }) func deleteReel(reelId : Common.ReelId) : async Bool {
    ReelsLib.deleteReel(reels, reelId, caller, false);
  };
};
