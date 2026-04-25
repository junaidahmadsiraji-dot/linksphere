import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type Post = {
    id : Common.PostId;
    author : Common.UserId;
    text : Text;
    image : ?Storage.ExternalBlob;
    createdAt : Common.Timestamp;
    likedBy : [Common.UserId];
    isFlagged : Bool;
  };

  public type PostInput = {
    text : Text;
    image : ?Storage.ExternalBlob;
  };

  public type Comment = {
    id : Common.CommentId;
    postId : Common.PostId;
    author : Common.UserId;
    text : Text;
    createdAt : Common.Timestamp;
  };

  public type PostView = {
    id : Common.PostId;
    author : Common.UserId;
    authorName : Text;
    authorAvatar : ?Storage.ExternalBlob;
    authorIsVerified : Bool;
    text : Text;
    image : ?Storage.ExternalBlob;
    createdAt : Common.Timestamp;
    likeCount : Nat;
    commentCount : Nat;
    likedByMe : Bool;
    flagCount : Nat;
  };

  public type CommentView = {
    id : Common.CommentId;
    postId : Common.PostId;
    author : Common.UserId;
    authorName : Text;
    authorAvatar : ?Storage.ExternalBlob;
    text : Text;
    createdAt : Common.Timestamp;
  };
};
