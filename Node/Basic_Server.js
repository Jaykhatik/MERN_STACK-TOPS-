const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.headers);
  console.log(req.url);
  console.log(req.method);
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("Home Page");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("Page Not Found");
  }
  res.end();
});
const PORT = 5001;
server.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
