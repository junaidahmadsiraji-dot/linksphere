import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type UserProfile = {
    id : Common.UserId;
    username : Text;
    avatar : ?Storage.ExternalBlob;
    coverPhoto : ?Storage.ExternalBlob;
    bio : ?Text;
    isVerified : Bool;
    isBanned : Bool;
    createdAt : Common.Timestamp;
  };
};
