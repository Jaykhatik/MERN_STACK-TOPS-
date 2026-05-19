const http = require("http");

// --- Routes ---
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const productsRoute = require("./routes/products");

// --- Server ---
const server = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, "http://localhost:3001");

  // send helper — sets CORS + Content-Type in one writeHead call
  const send = (statusCode, data) => {
    res.writeHead(statusCode, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end(JSON.stringify(data));
  };

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return res.end();
  }

  // Default route — GET /
  if (pathname === "/" && req.method === "GET") {
    return send(200, { message: "✅ Node.js Server Runs Successfully!" });
  }

  // Match routes — each returns true if handled
  if (usersRoute(pathname, req, res, send)) return;
  if (postsRoute(pathname, req, res, send)) return;
  if (productsRoute(pathname, req, res, send)) return;

  // 404 fallback
  send(404, { message: "Route Not Found" });
});

server.listen(3001, () => {
  console.log("=========================================");
  console.log("  ✅ Node.js Server Runs Successfully!");
  console.log("  🌐 http://localhost:3001");
  console.log("=========================================");
  console.log("  Available Routes:");
  console.log("  GET /users");
  console.log("  GET /users/:id");
  console.log("  GET /posts");
  console.log("  GET /posts/:id");
  console.log("  GET /products");
  console.log("  GET /products/:id");
  console.log("=========================================");
});
