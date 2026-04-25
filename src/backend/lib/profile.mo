import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Storage "mo:caffeineai-object-storage/Storage";
import Types "../types/profile";
import Common "../types/common";

module {
  public func getProfile(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
  ) : ?Types.UserProfile {
    profiles.get(userId);
  };

  public func saveProfile(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
    username : Text,
    avatar : ?Storage.ExternalBlob,
  ) : () {
    let existing = profiles.get(userId);
    let profile : Types.UserProfile = switch (existing) {
      case (?p) {
        { p with username = username; avatar = avatar };
      };
      case null {
        {
          id = userId;
          username = username;
          avatar = avatar;
          coverPhoto = null;
          bio = null;
          isVerified = false;
          isBanned = false;
          createdAt = Time.now();
        };
      };
    };
    profiles.add(userId, profile);
  };

  public func updateAvatar(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
    avatar : Storage.ExternalBlob,
  ) : () {
    switch (profiles.get(userId)) {
      case (?existing) {
        profiles.add(userId, { existing with avatar = ?avatar });
      };
      case null {};
    };
  };

  public func updateUsername(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
    username : Text,
  ) : () {
    switch (profiles.get(userId)) {
      case (?existing) {
        profiles.add(userId, { existing with username = username });
      };
      case null {};
    };
  };

  public func updateCoverPhoto(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
    coverPhoto : Storage.ExternalBlob,
  ) : () {
    switch (profiles.get(userId)) {
      case (?existing) {
        profiles.add(userId, { existing with coverPhoto = ?coverPhoto });
      };
      case null {};
    };
  };

  public func updateBio(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
    bio : Text,
  ) : () {
    switch (profiles.get(userId)) {
      case (?existing) {
        profiles.add(userId, { existing with bio = ?bio });
      };
      case null {};
    };
  };

  public func grantVerified(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
  ) : () {
    switch (profiles.get(userId)) {
      case (?existing) {
        profiles.add(userId, { existing with isVerified = true });
      };
      case null {};
    };
  };

  public func revokeVerified(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
  ) : () {
    switch (profiles.get(userId)) {
      case (?existing) {
        profiles.add(userId, { existing with isVerified = false });
      };
      case null {};
    };
  };

  public func banUser(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
  ) : () {
    switch (profiles.get(userId)) {
      case (?existing) {
        profiles.add(userId, { existing with isBanned = true });
      };
      case null {};
    };
  };

  public func unbanUser(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
  ) : () {
    switch (profiles.get(userId)) {
      case (?existing) {
        profiles.add(userId, { existing with isBanned = false });
      };
      case null {};
    };
  };

  public func ensureProfile(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
  ) : Types.UserProfile {
    switch (profiles.get(userId)) {
      case (?p) p;
      case null {
        let profile : Types.UserProfile = {
          id = userId;
          username = "User_" # userId.toText();
          avatar = null;
          coverPhoto = null;
          bio = null;
          isVerified = false;
          isBanned = false;
          createdAt = Time.now();
        };
        profiles.add(userId, profile);
        profile;
      };
    };
  };
};
