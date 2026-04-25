import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import NotifLib "../lib/notifications";
import NotifTypes "../types/notifications";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  notifications : List.List<NotifTypes.Notification>,
) {
  public query ({ caller }) func getNotifications() : async [NotifTypes.Notification] {
    NotifLib.getNotifications(notifications, caller);
  };

  public shared ({ caller }) func markNotificationRead(notifId : Common.NotifId) : async () {
    NotifLib.markRead(notifications, notifId, caller);
  };

  public shared ({ caller }) func markAllNotificationsRead() : async () {
    NotifLib.markAllRead(notifications, caller);
  };
};
