import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import FilesLib "../lib/files";
import FileTypes "../types/files";
import ProfileTypes "../types/profile";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  files : List.List<FileTypes.FileRecord>,
  profiles : Map.Map<Common.UserId, ProfileTypes.UserProfile>,
) {
  public query func listFiles() : async [FileTypes.FileRecord] {
    FilesLib.listFiles(files);
  };

  public shared ({ caller }) func uploadFile(input : FileTypes.FileInput) : async FileTypes.FileRecord {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can upload files");
    };
    let fileId = files.size();
    FilesLib.uploadFile(files, fileId, caller, profiles, input);
  };

  public shared ({ caller }) func deleteFile(fileId : Common.FileId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete files");
    };
    FilesLib.deleteFile(files, caller, fileId);
  };
};
