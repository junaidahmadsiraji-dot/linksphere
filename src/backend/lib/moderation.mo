import List "mo:core/List";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AdminTypes "../types/admin";
import FeedTypes "../types/feed";
import ProfileTypes "../types/profile";
import Common "../types/common";

module {
  // Flag a post for review
  public func flagPost(
    flags : List.List<AdminTypes.FlagRecord>,
    postId : Common.PostId,
    flaggedBy : Common.UserId,
    reason : Text,
    now : Common.Timestamp,
  ) : () {
    // Prevent duplicate flags from same user
    let alreadyFlagged = flags.find(func(f : AdminTypes.FlagRecord) : Bool {
      f.postId == postId and Principal.equal(f.flaggedBy, flaggedBy)
    }) != null;
    if (alreadyFlagged) return;
    flags.add({
      postId = postId;
      flaggedBy = flaggedBy;
      reason = reason;
      createdAt = now;
    });
  };

  // Get count of flags for a post
  private func getFlagCount(
    flags : List.List<AdminTypes.FlagRecord>,
    postId : Common.PostId,
  ) : Nat {
    flags.filter(func(f : AdminTypes.FlagRecord) : Bool { f.postId == postId }).size();
  };

  // Get all posts that have been flagged (flag count > 0)
  public func getFlaggedPosts(
    posts : List.List<FeedTypes.Post>,
    flags : List.List<AdminTypes.FlagRecord>,
    profiles : Map.Map<Common.UserId, ProfileTypes.UserProfile>,
  ) : [FeedTypes.PostView] {
    // Collect flagged post IDs
    let flaggedIds = flags.toArray().map(func(f : AdminTypes.FlagRecord) : Common.PostId { f.postId });
    // Deduplicate
    var uniqueIds : [Common.PostId] = [];
    for (pid in flaggedIds.values()) {
      let alreadyIn = uniqueIds.find(func(id : Common.PostId) : Bool { id == pid }) != null;
      if (not alreadyIn) {
        uniqueIds := uniqueIds.concat([pid]);
      };
    };

    uniqueIds.filterMap<Common.PostId, FeedTypes.PostView>(func(postId) {
      switch (posts.find(func(p : FeedTypes.Post) : Bool { p.id == postId })) {
        case null null;
        case (?p) {
          let authorProfile = profiles.get(p.author);
          let authorName = switch (authorProfile) { case (?pr) pr.username; case null "Unknown" };
          let authorAvatar = switch (authorProfile) { case (?pr) pr.avatar; case null null };
          let authorIsVerified = switch (authorProfile) { case (?pr) pr.isVerified; case null false };
          ?{
            id = p.id;
            author = p.author;
            authorName = authorName;
            authorAvatar = authorAvatar;
            authorIsVerified = authorIsVerified;
            text = p.text;
            image = p.image;
            createdAt = p.createdAt;
            likeCount = p.likedBy.size();
            commentCount = 0;
            likedByMe = false;
            flagCount = getFlagCount(flags, p.id);
          };
        };
      };
    });
  };

  // Approve or delete a flagged post
  public func moderatePost(
    posts : List.List<FeedTypes.Post>,
    comments : List.List<FeedTypes.Comment>,
    flags : List.List<AdminTypes.FlagRecord>,
    postId : Common.PostId,
    action : AdminTypes.ModerationAction,
  ) : () {
    // Remove all flags for this post
    let remainingFlags = flags.filter(func(f : AdminTypes.FlagRecord) : Bool {
      f.postId != postId
    });
    flags.clear();
    flags.append(remainingFlags);

    switch (action) {
      case (#delete) {
        // Delete post and its comments
        let filteredPosts = posts.filter(func(p : FeedTypes.Post) : Bool { p.id != postId });
        posts.clear();
        posts.append(filteredPosts);
        let filteredComments = comments.filter(func(c : FeedTypes.Comment) : Bool { c.postId != postId });
        comments.clear();
        comments.append(filteredComments);
      };
      case (#approve) {
        // Mark post as not flagged (flags already cleared above)
        posts.mapInPlace(func(p : FeedTypes.Post) : FeedTypes.Post {
          if (p.id == postId) { { p with isFlagged = false } } else p
        });
      };
    };
  };
};
