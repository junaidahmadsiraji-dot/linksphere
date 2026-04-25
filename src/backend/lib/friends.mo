import List "mo:core/List";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import FriendTypes "../types/friends";
import ProfileTypes "../types/profile";
import Common "../types/common";

module {
  // Check if two users are friends
  private func areFriends(
    friendships : List.List<FriendTypes.Friendship>,
    a : Common.UserId,
    b : Common.UserId,
  ) : Bool {
    friendships.find(func(f : FriendTypes.Friendship) : Bool {
      (Principal.equal(f.userA, a) and Principal.equal(f.userB, b)) or
      (Principal.equal(f.userA, b) and Principal.equal(f.userB, a))
    }) != null;
  };

  // Get all friend IDs for a user
  private func getFriendIds(
    friendships : List.List<FriendTypes.Friendship>,
    userId : Common.UserId,
  ) : [Common.UserId] {
    let friendList = friendships.filter(func(f : FriendTypes.Friendship) : Bool {
      Principal.equal(f.userA, userId) or Principal.equal(f.userB, userId)
    });
    friendList.toArray().map<FriendTypes.Friendship, Common.UserId>(func(f) {
      if (Principal.equal(f.userA, userId)) f.userB else f.userA
    });
  };

  // Count mutual friends between two users
  private func countMutualFriends(
    friendships : List.List<FriendTypes.Friendship>,
    a : Common.UserId,
    b : Common.UserId,
  ) : Nat {
    let friendsA = getFriendIds(friendships, a);
    let friendsB = getFriendIds(friendships, b);
    friendsA.filter(func(fa : Common.UserId) : Bool {
      friendsB.find(func(fb : Common.UserId) : Bool { Principal.equal(fa, fb) }) != null
    }).size();
  };

  // Send a friend request
  public func sendRequest(
    requests : List.List<FriendTypes.FriendRequest>,
    friendships : List.List<FriendTypes.Friendship>,
    from : Common.UserId,
    to : Common.UserId,
  ) : () {
    // Don't send if already friends or request exists
    if (areFriends(friendships, from, to)) return;
    let existing = requests.find(func(r : FriendTypes.FriendRequest) : Bool {
      (Principal.equal(r.from, from) and Principal.equal(r.to, to)) or
      (Principal.equal(r.from, to) and Principal.equal(r.to, from))
    });
    if (existing != null) return;
    requests.add({
      from = from;
      to = to;
      createdAt = Time.now();
    });
  };

  // Accept a pending friend request
  public func acceptRequest(
    requests : List.List<FriendTypes.FriendRequest>,
    friendships : List.List<FriendTypes.Friendship>,
    caller : Common.UserId,
    from : Common.UserId,
  ) : () {
    let found = requests.find(func(r : FriendTypes.FriendRequest) : Bool {
      Principal.equal(r.from, from) and Principal.equal(r.to, caller)
    });
    switch (found) {
      case null {};
      case (?_) {
        // Remove the request
        let filtered = requests.filter(func(r : FriendTypes.FriendRequest) : Bool {
          not (Principal.equal(r.from, from) and Principal.equal(r.to, caller))
        });
        requests.clear();
        requests.append(filtered);
        // Add friendship
        friendships.add({
          userA = from;
          userB = caller;
          createdAt = Time.now();
        });
      };
    };
  };

  // Cancel an outgoing request
  public func cancelRequest(
    requests : List.List<FriendTypes.FriendRequest>,
    caller : Common.UserId,
    to : Common.UserId,
  ) : () {
    let filtered = requests.filter(func(r : FriendTypes.FriendRequest) : Bool {
      not (Principal.equal(r.from, caller) and Principal.equal(r.to, to))
    });
    requests.clear();
    requests.append(filtered);
  };

  // Reject an incoming request
  public func rejectRequest(
    requests : List.List<FriendTypes.FriendRequest>,
    caller : Common.UserId,
    from : Common.UserId,
  ) : () {
    let filtered = requests.filter(func(r : FriendTypes.FriendRequest) : Bool {
      not (Principal.equal(r.from, from) and Principal.equal(r.to, caller))
    });
    requests.clear();
    requests.append(filtered);
  };

  // Remove a friendship
  public func unfriend(
    friendships : List.List<FriendTypes.Friendship>,
    caller : Common.UserId,
    other : Common.UserId,
  ) : () {
    let filtered = friendships.filter(func(f : FriendTypes.Friendship) : Bool {
      not ((Principal.equal(f.userA, caller) and Principal.equal(f.userB, other)) or
           (Principal.equal(f.userA, other) and Principal.equal(f.userB, caller)))
    });
    friendships.clear();
    friendships.append(filtered);
  };

  // Get caller's friends with profile data
  public func getFriends(
    friendships : List.List<FriendTypes.Friendship>,
    profiles : Map.Map<Common.UserId, ProfileTypes.UserProfile>,
    caller : Common.UserId,
  ) : [FriendTypes.FriendView] {
    let friendIds = getFriendIds(friendships, caller);
    friendIds.filterMap<Common.UserId, FriendTypes.FriendView>(func(uid) {
      switch (profiles.get(uid)) {
        case (?p) {
          ?{
            userId = uid;
            username = p.username;
            avatar = p.avatar;
            mutualFriendCount = countMutualFriends(friendships, caller, uid);
            status = #friends;
          };
        };
        case null null;
      };
    });
  };

  // Get incoming friend requests
  public func getFriendRequests(
    requests : List.List<FriendTypes.FriendRequest>,
    profiles : Map.Map<Common.UserId, ProfileTypes.UserProfile>,
    caller : Common.UserId,
  ) : [FriendTypes.FriendView] {
    let incoming = requests.filter(func(r : FriendTypes.FriendRequest) : Bool {
      Principal.equal(r.to, caller)
    });
    incoming.toArray().filterMap<FriendTypes.FriendRequest, FriendTypes.FriendView>(func(r) {
      switch (profiles.get(r.from)) {
        case (?p) {
          ?{
            userId = r.from;
            username = p.username;
            avatar = p.avatar;
            mutualFriendCount = 0;
            status = #received;
          };
        };
        case null null;
      };
    });
  };

  // Get outgoing friend requests
  public func getSentRequests(
    requests : List.List<FriendTypes.FriendRequest>,
    profiles : Map.Map<Common.UserId, ProfileTypes.UserProfile>,
    caller : Common.UserId,
  ) : [FriendTypes.FriendView] {
    let outgoing = requests.filter(func(r : FriendTypes.FriendRequest) : Bool {
      Principal.equal(r.from, caller)
    });
    outgoing.toArray().filterMap<FriendTypes.FriendRequest, FriendTypes.FriendView>(func(r) {
      switch (profiles.get(r.to)) {
        case (?p) {
          ?{
            userId = r.to;
            username = p.username;
            avatar = p.avatar;
            mutualFriendCount = 0;
            status = #sent;
          };
        };
        case null null;
      };
    });
  };

  // Get friend suggestions (non-friends, not self, with mutual count)
  public func getSuggestions(
    friendships : List.List<FriendTypes.Friendship>,
    requests : List.List<FriendTypes.FriendRequest>,
    profiles : Map.Map<Common.UserId, ProfileTypes.UserProfile>,
    caller : Common.UserId,
  ) : [FriendTypes.FriendView] {
    let friendIds = getFriendIds(friendships, caller);
    // Collect pending request IDs
    let pendingIds = requests.filter(func(r : FriendTypes.FriendRequest) : Bool {
      Principal.equal(r.from, caller) or Principal.equal(r.to, caller)
    }).toArray().map(func(r : FriendTypes.FriendRequest) : Common.UserId {
      if (Principal.equal(r.from, caller)) r.to else r.from
    });

    let allProfiles = profiles.entries().toArray();
    allProfiles.filterMap<(Common.UserId, ProfileTypes.UserProfile), FriendTypes.FriendView>(func((uid, p)) {
      if (Principal.equal(uid, caller)) return null;
      let isFriend = friendIds.find(func(fid : Common.UserId) : Bool { Principal.equal(fid, uid) }) != null;
      let hasPending = pendingIds.find(func(pid : Common.UserId) : Bool { Principal.equal(pid, uid) }) != null;
      if (isFriend or hasPending) return null;
      ?{
        userId = uid;
        username = p.username;
        avatar = p.avatar;
        mutualFriendCount = countMutualFriends(friendships, caller, uid);
        status = #none;
      };
    });
  };

  // Determine friendship status between two users
  public func getStatus(
    friendships : List.List<FriendTypes.Friendship>,
    requests : List.List<FriendTypes.FriendRequest>,
    caller : Common.UserId,
    other : Common.UserId,
  ) : FriendTypes.FriendStatus {
    if (areFriends(friendships, caller, other)) return #friends;
    let sentReq = requests.find(func(r : FriendTypes.FriendRequest) : Bool {
      Principal.equal(r.from, caller) and Principal.equal(r.to, other)
    });
    if (sentReq != null) return #sent;
    let receivedReq = requests.find(func(r : FriendTypes.FriendRequest) : Bool {
      Principal.equal(r.from, other) and Principal.equal(r.to, caller)
    });
    if (receivedReq != null) return #received;
    #none;
  };
};
