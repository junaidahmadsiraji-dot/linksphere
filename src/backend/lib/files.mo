import List "mo:core/List";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import ProfileTypes "../types/profile";
import FileTypes "../types/files";
import Common "../types/common";

module {
  public func uploadFile(
    files : List.List<FileTypes.FileRecord>,
    nextId : Nat,
    caller : Common.UserId,
    profiles : Map.Map<Common.UserId, ProfileTypes.UserProfile>,
    input : FileTypes.FileInput,
  ) : FileTypes.FileRecord {
    let uploaderName = switch (profiles.get(caller)) {
      case (?p) p.username;
      case null "Admin";
    };
    let record : FileTypes.FileRecord = {
      id = nextId;
      title = input.title;
      description = input.description;
      blob = input.blob;
      uploadedBy = caller;
      uploaderName = uploaderName;
      uploadedAt = Time.now();
    };
    files.add(record);
    record;
  };

  public func listFiles(
    files : List.List<FileTypes.FileRecord>,
  ) : [FileTypes.FileRecord] {
    let arr = files.toArray();
    arr.reverse();
  };

  public func deleteFile(
    files : List.List<FileTypes.FileRecord>,
    _caller : Common.UserId,
    fileId : Common.FileId,
  ) : Bool {
    let found = files.find(func(f : FileTypes.FileRecord) : Bool { f.id == fileId });
    switch (found) {
      case null false;
      case (?_) {
        let filtered = files.filter(func(f : FileTypes.FileRecord) : Bool { f.id != fileId });
        files.clear();
        files.append(filtered);
        true;
      };
    };
  };
};
