import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type MediaType = { #image; #video };

  public type Reel = {
    id : Common.ReelId;
    authorId : Common.UserId;
    authorName : Text;
    authorIsVerified : Bool;
    mediaUrl : Storage.ExternalBlob;
    mediaType : MediaType;
    title : Text;
    description : Text;
    createdAt : Common.Timestamp;
    likedBy : [Common.UserId];
    savedBy : [Common.UserId];
  };

  public type ReelInput = {
    mediaUrl : Storage.ExternalBlob;
    mediaType : MediaType;
    title : Text;
    description : Text;
  };
};
