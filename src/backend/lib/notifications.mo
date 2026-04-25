import List "mo:core/List";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import NotifTypes "../types/notifications";
import Common "../types/common";

module {
  // Push a notification to a user
  public func pushNotification(
    notifications : List.List<NotifTypes.Notification>,
    nextId : Nat,
    userId : Common.UserId,
    notifType : NotifTypes.NotifType,
    actorId : Common.UserId,
    actorName : Text,
    targetId : ?Nat,
    targetType : ?Text,
    message : Text,
    now : Common.Timestamp,
  ) : NotifTypes.Notification {
    let notif : NotifTypes.Notification = {
      id = nextId;
      userId = userId;
      notifType = notifType;
      actorId = actorId;
      actorName = actorName;
      targetId = targetId;
      targetType = targetType;
      message = message;
      isRead = false;
      createdAt = now;
    };
    notifications.add(notif);
    notif;
  };

  // Get all notifications for a user, newest first
  public func getNotifications(
    notifications : List.List<NotifTypes.Notification>,
    userId : Common.UserId,
  ) : [NotifTypes.Notification] {
    let userNotifs = notifications.filter(func(n : NotifTypes.Notification) : Bool {
      Principal.equal(n.userId, userId)
    });
    userNotifs.toArray().reverse();
  };

  // Mark single notification as read
  public func markRead(
    notifications : List.List<NotifTypes.Notification>,
    notifId : Common.NotifId,
    userId : Common.UserId,
  ) : () {
    notifications.mapInPlace(func(n : NotifTypes.Notification) : NotifTypes.Notification {
      if (n.id == notifId and Principal.equal(n.userId, userId)) {
        { n with isRead = true };
      } else n;
    });
  };

  // Mark all caller's notifications as read
  public func markAllRead(
    notifications : List.List<NotifTypes.Notification>,
    userId : Common.UserId,
  ) : () {
    notifications.mapInPlace(func(n : NotifTypes.Notification) : NotifTypes.Notification {
      if (Principal.equal(n.userId, userId)) {
        { n with isRead = true };
      } else n;
    });
  };
};
