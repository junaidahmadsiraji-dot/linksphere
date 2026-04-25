import List "mo:core/List";
import Array "mo:core/Array";
import Time "mo:core/Time";
import ProductTypes "../types/products";
import Common "../types/common";

module {
  public func createProduct(
    products : List.List<ProductTypes.Product>,
    nextId : Nat,
    caller : Common.UserId,
    input : ProductTypes.ProductInput,
  ) : ProductTypes.Product {
    let product : ProductTypes.Product = {
      id = nextId;
      title = input.title;
      description = input.description;
      price = input.price;
      image = input.image;
      createdBy = caller;
      createdAt = Time.now();
    };
    products.add(product);
    product;
  };

  public func listProducts(
    products : List.List<ProductTypes.Product>,
  ) : [ProductTypes.Product] {
    let arr = products.toArray();
    arr.reverse();
  };

  public func deleteProduct(
    products : List.List<ProductTypes.Product>,
    _caller : Common.UserId,
    productId : Common.ProductId,
  ) : Bool {
    let found = products.find(func(p : ProductTypes.Product) : Bool { p.id == productId });
    switch (found) {
      case null false;
      case (?_) {
        let filtered = products.filter(func(p : ProductTypes.Product) : Bool { p.id != productId });
        products.clear();
        products.append(filtered);
        true;
      };
    };
  };
};
