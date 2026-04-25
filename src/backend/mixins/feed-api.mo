import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import FeedLib "../lib/feed";
import ProfileLib "../lib/profile";
import FeedTypes "../types/feed";
import ProfileTypes "../types/profile";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  posts : List.List<FeedTypes.Post>,
  comments : List.List<FeedTypes.Comment>,
  profiles : Map.Map<Common.UserId, ProfileTypes.UserProfile>,
) {
  public query ({ caller }) func getNewsfeed() : async [FeedTypes.PostView] {
    FeedLib.getNewsfeed(posts, comments, profiles, caller);
  };

  public shared ({ caller }) func createPost(input : FeedTypes.PostInput) : async FeedTypes.PostView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    ignore ProfileLib.ensureProfile(profiles, caller);
    let postId = posts.size();
    let post = FeedLib.createPost(posts, postId, caller, input);
    let profile = profiles.get(caller);
    let authorName = switch (profile) { case (?p) p.username; case null "Unknown" };
    let authorAvatar = switch (profile) { case (?p) p.avatar; case null null };
    let authorIsVerified = switch (profile) { case (?p) p.isVerified; case null false };
    {
      id = post.id;
      author = post.author;
      authorName = authorName;
      authorAvatar = authorAvatar;
      authorIsVerified = authorIsVerified;
      text = post.text;
      image = post.image;
      createdAt = post.createdAt;
      likeCount = 0;
      commentCount = 0;
      likedByMe = false;
      flagCount = 0;
    };
  };

  public shared ({ caller }) func deletePost(postId : Common.PostId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    FeedLib.deletePost(posts, comments, caller, postId);
  };

  public shared ({ caller }) func likePost(postId : Common.PostId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    FeedLib.toggleLike(posts, caller, postId);
  };

  public query ({ caller }) func getPostComments(postId : Common.PostId) : async [FeedTypes.CommentView] {
    FeedLib.getPostComments(comments, profiles, postId);
  };

  public shared ({ caller }) func addComment(postId : Common.PostId, text : Text) : async FeedTypes.CommentView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    ignore ProfileLib.ensureProfile(profiles, caller);
    let commentId = comments.size();
    let comment = FeedLib.addComment(comments, commentId, caller, postId, text);
    let profile = profiles.get(caller);
    let authorName = switch (profile) { case (?p) p.username; case null "Unknown" };
    let authorAvatar = switch (profile) { case (?p) p.avatar; case null null };
    {
      id = comment.id;
      postId = comment.postId;
      author = comment.author;
      authorName = authorName;
      authorAvatar = authorAvatar;
      text = comment.text;
      createdAt = comment.createdAt;
    };
  };

  public shared ({ caller }) func deleteComment(commentId : Common.CommentId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    FeedLib.deleteComment(comments, caller, commentId);
  };
};
