const posts = require("../data/posts.json");

function postsRoute(pathname, req, res, send) {
  // GET /posts
  if (pathname === "/posts" && req.method === "GET") {
    send(200, posts);
    return true;
  }

  // GET /posts/:id
  if (pathname.startsWith("/posts/") && req.method === "GET") {
    const id = parseInt(pathname.split("/")[2]);
    const post = posts.find((p) => p.id === id);
    if (post) {
      send(200, post);
    } else {
      send(404, { message: "Post not found" });
    }
    return true;
  }

  return false; // route not matched
}

module.exports = postsRoute;
