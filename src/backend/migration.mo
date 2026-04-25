import Map "mo:core/Map";
import List "mo:core/List";
import Storage "mo:caffeineai-object-storage/Storage";
import NewProfileTypes "./types/profile";
import NewFeedTypes "./types/feed";
import NewFileTypes "./types/files";
import NewProductTypes "./types/products";
import Common "./types/common";

module {
  // ── Old types (copied inline from .old/src/backend/types/) ──────────────

  type OldUserProfile = {
    id : Common.UserId;
    username : Text;
    avatar : ?Storage.ExternalBlob;
    coverPhoto : ?Storage.ExternalBlob;
    bio : ?Text;
    isVerified : Bool;
    isBanned : Bool;
    createdAt : Common.Timestamp;
  };

  type OldPost = {
    id : Common.PostId;
    author : Common.UserId;
    text : Text;
    image : ?Storage.ExternalBlob;
    createdAt : Common.Timestamp;
    likedBy : [Common.UserId];
    isFlagged : Bool;
  };

  type OldComment = {
    id : Common.CommentId;
    postId : Common.PostId;
    author : Common.UserId;
    text : Text;
    createdAt : Common.Timestamp;
  };

  // ── Old actor state ─────────────────────────────────────────────────────

  type OldActor = {
    profiles : Map.Map<Common.UserId, OldUserProfile>;
    posts : List.List<OldPost>;
    comments : List.List<OldComment>;
    files : List.List<NewFileTypes.FileRecord>;
    products : List.List<NewProductTypes.Product>;
  };

  // ── New actor state ─────────────────────────────────────────────────────

  type NewActor = {
    profiles : Map.Map<Common.UserId, NewProfileTypes.UserProfile>;
    posts : List.List<NewFeedTypes.Post>;
    comments : List.List<NewFeedTypes.Comment>;
    files : List.List<NewFileTypes.FileRecord>;
    products : List.List<NewProductTypes.Product>;
  };

  // ── Migration function ──────────────────────────────────────────────────

  public func run(old : OldActor) : NewActor {
    // Profiles and posts already have all required fields — pass through directly
    let profiles = old.profiles.map<Common.UserId, OldUserProfile, NewProfileTypes.UserProfile>(
      func(_uid, p) { p }
    );

    let posts = old.posts.map<OldPost, NewFeedTypes.Post>(
      func(p) { p }
    );

    // Comments, files, products are structurally identical — pass through
    let comments = old.comments.map<OldComment, NewFeedTypes.Comment>(func(c) { c });

    {
      profiles;
      posts;
      comments;
      files = old.files;
      products = old.products;
    };
  };
};
