const http = require("http");

const server = http.createServer((req, res) => {
  // API Route
  if (req.url === "/users" && req.method === "GET") {

    const users = [
      { id: 1, name: "Jay" },
      { id: 2, name: "Rahul" },
    ];

    // Response Header
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    // Send JSON Response
    res.end(JSON.stringify(users));
  }

  // Home Route
  else if (req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });

    res.end("Home Page");
  }

  // 404 Route
  else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: "Route Not Found",
      })
    );
  }
});

// Start Server
server.listen(5000, () => {
  console.log("Server running on port 5000");
});