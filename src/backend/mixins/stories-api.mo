import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import StoriesLib "../lib/stories";
import StoryTypes "../types/stories";
import ProfileTypes "../types/profile";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  stories : List.List<StoryTypes.Story>,
  profiles : Map.Map<Common.UserId, ProfileTypes.UserProfile>,
) {
  public shared ({ caller }) func createStory(input : StoryTypes.StoryInput) : async StoryTypes.Story {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    let authorName = switch (profiles.get(caller)) {
      case (?p) p.username;
      case null "User_" # caller.toText();
    };
    StoriesLib.createStory(stories, stories.size(), caller, authorName, input, Time.now());
  };

  public query ({ caller }) func getStories() : async [StoryTypes.StoryGroup] {
    StoriesLib.getStories(stories, profiles, Time.now());
  };

  public shared ({ caller }) func markStoryViewed(storyId : Common.StoryId) : async () {
    StoriesLib.markViewed(stories, storyId, caller);
  };

  public shared ({ caller }) func deleteStory(storyId : Common.StoryId) : async Bool {
    StoriesLib.deleteStory(stories, storyId, caller, false);
  };
};
