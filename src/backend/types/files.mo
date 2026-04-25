import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type FileRecord = {
    id : Common.FileId;
    title : Text;
    description : Text;
    blob : Storage.ExternalBlob;
    uploadedBy : Common.UserId;
    uploaderName : Text;
    uploadedAt : Common.Timestamp;
  };

  public type FileInput = {
    title : Text;
    description : Text;
    blob : Storage.ExternalBlob;
  };
};
