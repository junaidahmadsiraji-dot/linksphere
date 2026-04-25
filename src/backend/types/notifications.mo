import Common "common";

module {
  public type NotifType = {
    #like_post;
    #comment_post;
    #friend_request;
    #friend_accept;
    #verified_granted;
  };

  public type Notification = {
    id : Common.NotifId;
    userId : Common.UserId;
    notifType : NotifType;
    actorId : Common.UserId;
    actorName : Text;
    targetId : ?Nat;
    targetType : ?Text;
    message : Text;
    isRead : Bool;
    createdAt : Common.Timestamp;
  };
};
