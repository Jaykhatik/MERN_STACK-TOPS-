const products = require("../data/products.json");

function productsRoute(pathname, req, res, send) {
  // GET /products
  if (pathname === "/products" && req.method === "GET") {
    send(200, products);
    return true;
  }

  // GET /products/:id
  if (pathname.startsWith("/products/") && req.method === "GET") {
    const id = parseInt(pathname.split("/")[2]);
    const product = products.find((p) => p.id === id);
    if (product) {
      send(200, product);
    } else {
      send(404, { message: "Product not found" });
    }
    return true;
  }

  return false; // route not matched
}

module.exports = productsRoute;
