import List "mo:core/List";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import ReelTypes "../types/reels";
import ProfileTypes "../types/profile";
import Common "../types/common";

module {
  // Create a new reel
  public func createReel(
    reels : List.List<ReelTypes.Reel>,
    nextId : Nat,
    caller : Common.UserId,
    authorName : Text,
    authorIsVerified : Bool,
    input : ReelTypes.ReelInput,
    now : Common.Timestamp,
  ) : ReelTypes.Reel {
    let reel : ReelTypes.Reel = {
      id = nextId;
      authorId = caller;
      authorName = authorName;
      authorIsVerified = authorIsVerified;
      mediaUrl = input.mediaUrl;
      mediaType = input.mediaType;
      title = input.title;
      description = input.description;
      createdAt = now;
      likedBy = [];
      savedBy = [];
    };
    reels.add(reel);
    reel;
  };

  // Get paginated reel feed (newest first)
  public func getReels(
    reels : List.List<ReelTypes.Reel>,
    page : Nat,
    pageSize : Nat,
  ) : [ReelTypes.Reel] {
    let arr = reels.toArray();
    let reversed = arr.reverse();
    let start = page * pageSize;
    if (start >= reversed.size()) return [];
    let end = Nat.min(start + pageSize, reversed.size());
    reversed.sliceToArray(start.toInt(), end.toInt());
  };

  // Toggle like on a reel, return new liked state
  public func toggleLike(
    reels : List.List<ReelTypes.Reel>,
    reelId : Common.ReelId,
    caller : Common.UserId,
  ) : Bool {
    var liked = false;
    reels.mapInPlace(func(r : ReelTypes.Reel) : ReelTypes.Reel {
      if (r.id == reelId) {
        let alreadyLiked = r.likedBy.find(func(uid : Common.UserId) : Bool {
          Principal.equal(uid, caller)
        }) != null;
        if (alreadyLiked) {
          liked := false;
          { r with likedBy = r.likedBy.filter(func(uid : Common.UserId) : Bool {
            not Principal.equal(uid, caller)
          }) };
        } else {
          liked := true;
          { r with likedBy = r.likedBy.concat([caller]) };
        };
      } else r;
    });
    liked;
  };

  // Toggle saved on a reel, return new saved state
  public func toggleSaved(
    reels : List.List<ReelTypes.Reel>,
    reelId : Common.ReelId,
    caller : Common.UserId,
  ) : Bool {
    var saved = false;
    reels.mapInPlace(func(r : ReelTypes.Reel) : ReelTypes.Reel {
      if (r.id == reelId) {
        let alreadySaved = r.savedBy.find(func(uid : Common.UserId) : Bool {
          Principal.equal(uid, caller)
        }) != null;
        if (alreadySaved) {
          saved := false;
          { r with savedBy = r.savedBy.filter(func(uid : Common.UserId) : Bool {
            not Principal.equal(uid, caller)
          }) };
        } else {
          saved := true;
          { r with savedBy = r.savedBy.concat([caller]) };
        };
      } else r;
    });
    saved;
  };

  // Delete a reel (owner or admin)
  public func deleteReel(
    reels : List.List<ReelTypes.Reel>,
    reelId : Common.ReelId,
    caller : Common.UserId,
    isAdmin : Bool,
  ) : Bool {
    let found = reels.find(func(r : ReelTypes.Reel) : Bool { r.id == reelId });
    switch (found) {
      case null false;
      case (?r) {
        if (not (Principal.equal(r.authorId, caller) or isAdmin)) return false;
        let filtered = reels.filter(func(rl : ReelTypes.Reel) : Bool {
          rl.id != reelId
        });
        reels.clear();
        reels.append(filtered);
        true;
      };
    };
  };
};
