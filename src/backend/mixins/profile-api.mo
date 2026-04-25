import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Storage "mo:caffeineai-object-storage/Storage";
import AdminLib "../lib/admin";
import ProfileLib "../lib/profile";
import NotifLib "../lib/notifications";
import ProfileTypes "../types/profile";
import AdminTypes "../types/admin";
import NotifTypes "../types/notifications";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  profiles : Map.Map<Common.UserId, ProfileTypes.UserProfile>,
  admins : Map.Map<Text, AdminTypes.AdminRecord>,
  sessions : Map.Map<Common.AdminSessionToken, AdminTypes.AdminSession>,
  notifications : List.List<NotifTypes.Notification>,
) {
  public query ({ caller }) func getCallerUserProfile() : async ?ProfileTypes.UserProfile {
    ProfileLib.getProfile(profiles, caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(username : Text, avatar : ?Storage.ExternalBlob) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    ProfileLib.saveProfile(profiles, caller, username, avatar);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?ProfileTypes.UserProfile {
    ProfileLib.getProfile(profiles, user);
  };

  public shared ({ caller }) func updateProfileAvatar(avatar : Storage.ExternalBlob) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    ProfileLib.updateAvatar(profiles, caller, avatar);
  };

  public shared ({ caller }) func updateProfileUsername(username : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    ProfileLib.updateUsername(profiles, caller, username);
  };

  public shared ({ caller }) func updateProfileCoverPhoto(coverPhoto : Storage.ExternalBlob) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    ProfileLib.updateCoverPhoto(profiles, caller, coverPhoto);
  };

  public shared ({ caller }) func updateProfileBio(bio : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    ProfileLib.updateBio(profiles, caller, bio);
  };

  // Admin-only: grant verified tick
  public shared func grantVerifiedTick(token : Common.AdminSessionToken, userId : Common.UserId) : async () {
    switch (AdminLib.validateSession(sessions, token)) {
      case null Runtime.trap("Unauthorized: Invalid admin session");
      case (?_) {
        ProfileLib.grantVerified(profiles, userId);
        // Notify the user
        let callerName = "Admin";
        ignore NotifLib.pushNotification(
          notifications, notifications.size(), userId, #verified_granted,
          Principal.fromText("aaaaa-aa"), callerName,
          null, null, "Your account has been verified!",
          Time.now(),
        );
      };
    };
  };

  // Admin-only: revoke verified tick
  public shared func revokeVerifiedTick(token : Common.AdminSessionToken, userId : Common.UserId) : async () {
    switch (AdminLib.validateSession(sessions, token)) {
      case null Runtime.trap("Unauthorized: Invalid admin session");
      case (?_) ProfileLib.revokeVerified(profiles, userId);
    };
  };

  // Admin-only: ban user
  public shared func adminBanUser(token : Common.AdminSessionToken, userId : Common.UserId) : async () {
    switch (AdminLib.validateSession(sessions, token)) {
      case null Runtime.trap("Unauthorized: Invalid admin session");
      case (?_) ProfileLib.banUser(profiles, userId);
    };
  };

  // Admin-only: unban user
  public shared func adminUnbanUser(token : Common.AdminSessionToken, userId : Common.UserId) : async () {
    switch (AdminLib.validateSession(sessions, token)) {
      case null Runtime.trap("Unauthorized: Invalid admin session");
      case (?_) ProfileLib.unbanUser(profiles, userId);
    };
  };
};
