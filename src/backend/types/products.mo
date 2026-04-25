import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type Product = {
    id : Common.ProductId;
    title : Text;
    description : Text;
    price : Float;
    image : ?Storage.ExternalBlob;
    createdBy : Common.UserId;
    createdAt : Common.Timestamp;
  };

  public type ProductInput = {
    title : Text;
    description : Text;
    price : Float;
    image : ?Storage.ExternalBlob;
  };
};
