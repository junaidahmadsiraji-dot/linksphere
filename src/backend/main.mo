import Map "mo:core/Map";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import ProfileTypes "types/profile";
import FeedTypes "types/feed";
import FileTypes "types/files";
import ProductTypes "types/products";
import AdminTypes "types/admin";
import FriendTypes "types/friends";
import StoryTypes "types/stories";
import ReelTypes "types/reels";
import NotifTypes "types/notifications";
import Common "types/common";
import ProfileApi "mixins/profile-api";
import FeedApi "mixins/feed-api";
import FilesApi "mixins/files-api";
import ProductsApi "mixins/products-api";
import AdminAuthApi "mixins/admin-auth-api";
import AdminUsersApi "mixins/admin-users-api";
import AdminModerationApi "mixins/admin-moderation-api";
import FriendsApi "mixins/friends-api";
import StoriesApi "mixins/stories-api";
import ReelsApi "mixins/reels-api";
import NotificationsApi "mixins/notifications-api";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object Storage
  include MixinObjectStorage();

  // Notifications state (shared across multiple mixins)
  let notifications = List.empty<NotifTypes.Notification>();

  // Admin state
  let admins = Map.empty<Text, AdminTypes.AdminRecord>();
  let sessions = Map.empty<Common.AdminSessionToken, AdminTypes.AdminSession>();
  include AdminAuthApi(admins, sessions);

  // Profile state
  let profiles = Map.empty<Common.UserId, ProfileTypes.UserProfile>();
  include ProfileApi(accessControlState, profiles, admins, sessions, notifications);

  // Feed state
  let posts = List.empty<FeedTypes.Post>();
  let comments = List.empty<FeedTypes.Comment>();
  include FeedApi(accessControlState, posts, comments, profiles);

  // Files state
  let files = List.empty<FileTypes.FileRecord>();
  include FilesApi(accessControlState, files, profiles);

  // Products state
  let products = List.empty<ProductTypes.Product>();
  include ProductsApi(accessControlState, products);

  // Admin users & stats
  include AdminUsersApi(admins, sessions, profiles, posts, comments, products, files);

  // Admin moderation
  let flags = List.empty<AdminTypes.FlagRecord>();
  include AdminModerationApi(admins, sessions, posts, comments, flags, profiles);

  // Friends state
  let friendships = List.empty<FriendTypes.Friendship>();
  let friendRequests = List.empty<FriendTypes.FriendRequest>();
  include FriendsApi(accessControlState, friendships, friendRequests, profiles, notifications);

  // Stories state
  let stories = List.empty<StoryTypes.Story>();
  include StoriesApi(accessControlState, stories, profiles);

  // Reels state
  let reels = List.empty<ReelTypes.Reel>();
  include ReelsApi(accessControlState, reels, profiles, notifications);

  // Notifications API
  include NotificationsApi(accessControlState, notifications);
};
