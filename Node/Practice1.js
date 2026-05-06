const http = require("http");
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/home") {
    res.write("Home page");
    return res.end();
  } else if (req.url === "/men") {
    res.write("Men Page");
    return res.end();
  } else if (req.url === "/women") {
    res.write("Women Page");
    return res.end();
  } else if (req.url === "/kids") {
    res.write("Kids Page");
    return res.end();
  } else if (req.url === "/cart") {
    res.write("Cart Page");
    return res.end();
  }
   else if (req.url === "/") {
    res.write(`<!DOCTYPE html>
      <html lang="en">
      <head>
        <title>Myntra</title>
      </head>
      <body>
        <nav>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/men">Men</a></li>
            <li><a href="/women">Women</a></li>
            <li><a href="/kids">Kids</a></li>
            <li><a href="/cart">Cart</a></li>
          </ul>
        </nav>
      </body>
      </html>`);
    return res.end();
  } 
  else {
    res.write("404 PAGE NOT FOUND");
    return res.end();
  }
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});