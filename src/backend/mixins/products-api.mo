import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ProductsLib "../lib/products";
import ProductTypes "../types/products";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : List.List<ProductTypes.Product>,
) {
  public query func listProducts() : async [ProductTypes.Product] {
    ProductsLib.listProducts(products);
  };

  public shared ({ caller }) func createProduct(input : ProductTypes.ProductInput) : async ProductTypes.Product {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };
    let productId = products.size();
    ProductsLib.createProduct(products, productId, caller, input);
  };

  public shared ({ caller }) func deleteProduct(productId : Common.ProductId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    ProductsLib.deleteProduct(products, caller, productId);
  };
};
