import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type FriendStatus = { #none; #sent; #received; #friends };

  public type FriendRequest = {
    from : Common.UserId;
    to : Common.UserId;
    createdAt : Common.Timestamp;
  };

  public type Friendship = {
    userA : Common.UserId;
    userB : Common.UserId;
    createdAt : Common.Timestamp;
  };

  public type FriendView = {
    userId : Common.UserId;
    username : Text;
    avatar : ?Storage.ExternalBlob;
    mutualFriendCount : Nat;
    status : FriendStatus;
  };
};
