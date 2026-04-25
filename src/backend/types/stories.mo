import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type Story = {
    id : Common.StoryId;
    authorId : Common.UserId;
    authorName : Text;
    image : Storage.ExternalBlob;
    createdAt : Common.Timestamp;
    expiresAt : Common.Timestamp;
    viewedBy : [Common.UserId];
  };

  public type StoryInput = {
    image : Storage.ExternalBlob;
  };

  public type StoryGroup = {
    authorId : Common.UserId;
    authorName : Text;
    stories : [Story];
  };
};
