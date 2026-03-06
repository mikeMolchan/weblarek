import { Buyer } from "./components/models/Buyer.ts";
import { Cart } from "./components/models/Cart.ts";
import { Catalogue } from "./components/models/Catalogue.ts";
import { LarekApi } from "../src/components/LarekApi.ts";
import { Api } from "../src/components/base/Api.ts";
import { apiProducts } from "../src/utils/data.ts";
import { API_URL } from "../src/utils/constants.ts";
import { IOrderRequest } from "./types/index.ts";

const buyer     = new Buyer();
const cart      = new Cart();
const catalogue = new Catalogue();
const api       = new Api(API_URL);
const service   = new LarekApi(api);

const orderExample: IOrderRequest = {
    payment: "card",
    email: "example@test.com",
    phone: "+37529",
    address: "AddrExample",
    total: 750,
    items: ["854cef69-976d-4c2a-a18c-2aa45046c390"]
}

// Buyer tests
console.log("=== Buyer Tests ===");
console.log("Data:", buyer.getData());
console.log("Validation Errors:", buyer.validate());

buyer.setData({ address: 'Adr1' });
console.log("Data:", buyer.getData());
console.log("Validation Errors:", buyer.validate());

buyer.setData({ payment: 'card' });
console.log("Data:", buyer.getData());
console.log("Validation Errors:", buyer.validate());

buyer.setData({ email: 'test@test.by', phone: '+37529' });
console.log("Data:", buyer.getData());
console.log("Validation Errors:", buyer.validate());

buyer.clear();
console.log("Data:", buyer.getData());
console.log("Validation Errors:", buyer.validate());

// Catalogue Tests
console.log("\n=== Catalogue Tests ===");
console.log("Initial products:", catalogue.products);
console.log("Initial current product:", catalogue.currProduct);

catalogue.products = apiProducts.items;

console.log("Products length:", catalogue.products.length);
console.log("First product title:", catalogue.products[0]?.title);

const productId = apiProducts.items[0].id;
const product = catalogue.getProductById(productId);
console.log("Product by ID:", product);

catalogue.currProduct = product;
console.log("Current product after setting:", catalogue.currProduct);

// Cart tests
console.log("\n=== Cart Tests ===");
console.log("Initial items:", cart.products);
console.log("Initial count:", cart.getCount());

cart.addProduct(apiProducts.items[0]);
cart.addProduct(apiProducts.items[1]);

console.log("Cart count after adding products:", cart.getCount());
console.log("Cart total after adding products:", cart.getTotal());

console.log("Has product with id", apiProducts.items[0].id + ":", cart.hasProduct(apiProducts.items[0].id));

cart.removeProduct(apiProducts.items[0]);
console.log("Cart count after removing a product:", cart.getCount());
console.log("Cart total after removing a product:", cart.getTotal());

cart.clear();
console.log("Cart count after clearing:", cart.getCount());
console.log("Cart total after clearing:", cart.getTotal());

// LarekApi tests (API/service)
console.log("\n=== LarekApi Tests ===");

service
  .getProducts()
  .then((products) => {
    catalogue.products = products;
    console.log("Products:", catalogue.products);
  })
  .catch((error) => {
    console.log("Products error:", error);
  });

service.postOrder(orderExample)
    .then((value) => {
        console.log("Order response:", value);
    })
    .catch((error) => {
        console.log("Order error:", error);
    });
