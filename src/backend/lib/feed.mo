import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import FeedTypes "../types/feed";
import ProfileTypes "../types/profile";
import Common "../types/common";

module {
  public func createPost(
    posts : List.List<FeedTypes.Post>,
    nextId : Nat,
    author : Common.UserId,
    input : FeedTypes.PostInput,
  ) : FeedTypes.Post {
    let post : FeedTypes.Post = {
      id = nextId;
      author = author;
      text = input.text;
      image = input.image;
      createdAt = Time.now();
      likedBy = [];
      isFlagged = false;
    };
    posts.add(post);
    post;
  };

  public func deletePost(
    posts : List.List<FeedTypes.Post>,
    comments : List.List<FeedTypes.Comment>,
    caller : Common.UserId,
    postId : Common.PostId,
  ) : Bool {
    let found = posts.find(func(p : FeedTypes.Post) : Bool {
      p.id == postId and Principal.equal(p.author, caller)
    });
    switch (found) {
      case null false;
      case (?_) {
        let filtered = posts.filter(func(p : FeedTypes.Post) : Bool {
          not (p.id == postId and Principal.equal(p.author, caller))
        });
        posts.clear();
        posts.append(filtered);
        let filteredComments = comments.filter(func(c : FeedTypes.Comment) : Bool {
          c.postId != postId
        });
        comments.clear();
        comments.append(filteredComments);
        true;
      };
    };
  };

  public func toggleLike(
    posts : List.List<FeedTypes.Post>,
    caller : Common.UserId,
    postId : Common.PostId,
  ) : Bool {
    var liked = false;
    posts.mapInPlace(func(p : FeedTypes.Post) : FeedTypes.Post {
      if (p.id == postId) {
        let alreadyLiked = p.likedBy.find<Common.UserId>(func(uid) {
          Principal.equal(uid, caller)
        }) != null;
        let newLikedBy = if (alreadyLiked) {
          liked := false;
          p.likedBy.filter(func(uid) {
            not Principal.equal(uid, caller)
          });
        } else {
          liked := true;
          p.likedBy.concat([caller]);
        };
        { p with likedBy = newLikedBy };
      } else p;
    });
    liked;
  };

  public func addComment(
    comments : List.List<FeedTypes.Comment>,
    nextId : Nat,
    caller : Common.UserId,
    postId : Common.PostId,
    text : Text,
  ) : FeedTypes.Comment {
    let comment : FeedTypes.Comment = {
      id = nextId;
      postId = postId;
      author = caller;
      text = text;
      createdAt = Time.now();
    };
    comments.add(comment);
    comment;
  };

  public func deleteComment(
    comments : List.List<FeedTypes.Comment>,
    caller : Common.UserId,
    commentId : Common.CommentId,
  ) : Bool {
    let found = comments.find(func(c : FeedTypes.Comment) : Bool {
      c.id == commentId and Principal.equal(c.author, caller)
    });
    switch (found) {
      case null false;
      case (?_) {
        let filtered = comments.filter(func(c : FeedTypes.Comment) : Bool {
          not (c.id == commentId and Principal.equal(c.author, caller))
        });
        comments.clear();
        comments.append(filtered);
        true;
      };
    };
  };

  public func getNewsfeed(
    posts : List.List<FeedTypes.Post>,
    comments : List.List<FeedTypes.Comment>,
    profiles : Map.Map<Common.UserId, ProfileTypes.UserProfile>,
    caller : Common.UserId,
  ) : [FeedTypes.PostView] {
    let arr = posts.toArray();
    let reversed = arr.reverse();
    reversed.map<FeedTypes.Post, FeedTypes.PostView>(func(p) {
      let authorProfile = profiles.get(p.author);
      let authorName = switch (authorProfile) { case (?pr) pr.username; case null "Unknown" };
      let authorAvatar = switch (authorProfile) { case (?pr) pr.avatar; case null null };
      let authorIsVerified = switch (authorProfile) { case (?pr) pr.isVerified; case null false };
      let commentCount = comments.filter(func(c : FeedTypes.Comment) : Bool {
        c.postId == p.id
      }).size();
      let likedByMe = p.likedBy.find<Common.UserId>(func(uid) {
        Principal.equal(uid, caller)
      }) != null;
      {
        id = p.id;
        author = p.author;
        authorName = authorName;
        authorAvatar = authorAvatar;
        authorIsVerified = authorIsVerified;
        text = p.text;
        image = p.image;
        createdAt = p.createdAt;
        likeCount = p.likedBy.size();
        commentCount = commentCount;
        likedByMe = likedByMe;
        flagCount = 0;
      };
    });
  };

  public func getPostComments(
    comments : List.List<FeedTypes.Comment>,
    profiles : Map.Map<Common.UserId, ProfileTypes.UserProfile>,
    postId : Common.PostId,
  ) : [FeedTypes.CommentView] {
    let filtered = comments.filter(func(c : FeedTypes.Comment) : Bool {
      c.postId == postId
    });
    let arr = filtered.toArray();
    arr.map<FeedTypes.Comment, FeedTypes.CommentView>(func(c) {
      let authorProfile = profiles.get(c.author);
      let authorName = switch (authorProfile) { case (?pr) pr.username; case null "Unknown" };
      let authorAvatar = switch (authorProfile) { case (?pr) pr.avatar; case null null };
      {
        id = c.id;
        postId = c.postId;
        author = c.author;
        authorName = authorName;
        authorAvatar = authorAvatar;
        text = c.text;
        createdAt = c.createdAt;
      };
    });
  };
};
