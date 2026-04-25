import List "mo:core/List";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import StoryTypes "../types/stories";
import ProfileTypes "../types/profile";
import Common "../types/common";

module {
  // 24 hours in nanoseconds
  public let STORY_TTL_NS : Int = 86_400_000_000_000;

  // Create a new story
  public func createStory(
    stories : List.List<StoryTypes.Story>,
    nextId : Nat,
    caller : Common.UserId,
    authorName : Text,
    input : StoryTypes.StoryInput,
    now : Common.Timestamp,
  ) : StoryTypes.Story {
    let story : StoryTypes.Story = {
      id = nextId;
      authorId = caller;
      authorName = authorName;
      image = input.image;
      createdAt = now;
      expiresAt = now + STORY_TTL_NS;
      viewedBy = [];
    };
    stories.add(story);
    story;
  };

  // Return non-expired stories grouped by user
  public func getStories(
    stories : List.List<StoryTypes.Story>,
    profiles : Map.Map<Common.UserId, ProfileTypes.UserProfile>,
    now : Common.Timestamp,
  ) : [StoryTypes.StoryGroup] {
    // Filter to non-expired
    let active = stories.filter(func(s : StoryTypes.Story) : Bool {
      s.expiresAt > now
    });
    let activeArr = active.toArray();

    // Collect unique author IDs (preserving first-seen order)
    var authorOrder : [Common.UserId] = [];
    for (story in activeArr.values()) {
      let alreadySeen = authorOrder.find(func(uid : Common.UserId) : Bool {
        Principal.equal(uid, story.authorId)
      }) != null;
      if (not alreadySeen) {
        authorOrder := authorOrder.concat([story.authorId]);
      };
    };

    // Build a group per author
    authorOrder.map<Common.UserId, StoryTypes.StoryGroup>(func(authorId) {
      let authorStories = activeArr.filter(func(s : StoryTypes.Story) : Bool {
        Principal.equal(s.authorId, authorId)
      });
      let authorName = switch (profiles.get(authorId)) {
        case (?p) p.username;
        case null "Unknown";
      };
      {
        authorId = authorId;
        authorName = authorName;
        stories = authorStories;
      };
    });
  };

  // Mark a story as viewed by caller
  public func markViewed(
    stories : List.List<StoryTypes.Story>,
    storyId : Common.StoryId,
    viewer : Common.UserId,
  ) : () {
    stories.mapInPlace(func(s : StoryTypes.Story) : StoryTypes.Story {
      if (s.id == storyId) {
        let alreadyViewed = s.viewedBy.find(func(uid : Common.UserId) : Bool {
          Principal.equal(uid, viewer)
        }) != null;
        if (alreadyViewed) {
          s
        } else {
          let updated : StoryTypes.Story = { s with viewedBy = s.viewedBy.concat([viewer]) };
          updated
        };
      } else s;
    });
  };

  // Delete a story (owner or admin)
  public func deleteStory(
    stories : List.List<StoryTypes.Story>,
    storyId : Common.StoryId,
    caller : Common.UserId,
    isAdmin : Bool,
  ) : Bool {
    let found = stories.find(func(s : StoryTypes.Story) : Bool { s.id == storyId });
    switch (found) {
      case null false;
      case (?s) {
        if (not (Principal.equal(s.authorId, caller) or isAdmin)) return false;
        let filtered = stories.filter(func(st : StoryTypes.Story) : Bool {
          st.id != storyId
        });
        stories.clear();
        stories.append(filtered);
        true;
      };
    };
  };
};
