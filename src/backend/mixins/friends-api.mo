import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import FriendsLib "../lib/friends";
import NotifLib "../lib/notifications";
import FriendTypes "../types/friends";
import ProfileTypes "../types/profile";
import NotifTypes "../types/notifications";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  friendships : List.List<FriendTypes.Friendship>,
  friendRequests : List.List<FriendTypes.FriendRequest>,
  profiles : Map.Map<Common.UserId, ProfileTypes.UserProfile>,
  notifications : List.List<NotifTypes.Notification>,
) {
  public shared ({ caller }) func sendFriendRequest(to : Common.UserId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    FriendsLib.sendRequest(friendRequests, friendships, caller, to);
    // Notify the recipient
    let callerName = switch (profiles.get(caller)) { case (?p) p.username; case null "Someone" };
    ignore NotifLib.pushNotification(
      notifications, notifications.size(), to, #friend_request, caller, callerName,
      null, null, callerName # " sent you a friend request",
      Time.now(),
    );
  };

  public shared ({ caller }) func acceptFriendRequest(from : Common.UserId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    FriendsLib.acceptRequest(friendRequests, friendships, caller, from);
    // Notify the requester
    let callerName = switch (profiles.get(caller)) { case (?p) p.username; case null "Someone" };
    ignore NotifLib.pushNotification(
      notifications, notifications.size(), from, #friend_accept, caller, callerName,
      null, null, callerName # " accepted your friend request",
      Time.now(),
    );
  };

  public shared ({ caller }) func cancelFriendRequest(to : Common.UserId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    FriendsLib.cancelRequest(friendRequests, caller, to);
  };

  public shared ({ caller }) func rejectFriendRequest(from : Common.UserId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    FriendsLib.rejectRequest(friendRequests, caller, from);
  };

  public shared ({ caller }) func unfriend(userId : Common.UserId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    FriendsLib.unfriend(friendships, caller, userId);
  };

  public query ({ caller }) func getFriends() : async [FriendTypes.FriendView] {
    FriendsLib.getFriends(friendships, profiles, caller);
  };

  public query ({ caller }) func getFriendRequests() : async [FriendTypes.FriendView] {
    FriendsLib.getFriendRequests(friendRequests, profiles, caller);
  };

  public query ({ caller }) func getSentRequests() : async [FriendTypes.FriendView] {
    FriendsLib.getSentRequests(friendRequests, profiles, caller);
  };

  public query ({ caller }) func getFriendSuggestions() : async [FriendTypes.FriendView] {
    FriendsLib.getSuggestions(friendships, friendRequests, profiles, caller);
  };
};
