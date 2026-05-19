const fs   = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/users.json");

// Always read fresh from disk
function getUsers() {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

// Write updated array back to disk
function saveUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");
}

function usersRoute(pathname, req, res, send) {
  // GET /users
  if (pathname === "/users" && req.method === "GET") {
    send(200, getUsers());
    return true;
  }

  // GET /users/:id
  if (pathname.startsWith("/users/") && req.method === "GET") {
    const id    = parseInt(pathname.split("/")[2]);
    const users = getUsers();
    const user  = users.find((u) => u.id === id);
    user ? send(200, user) : send(404, { message: "User not found" });
    return true;
  }

  // POST /users
  if (pathname === "/users" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => { body += chunk.toString(); });

    req.on("end", () => {
      try {
        const { name, email, role, department, location } = JSON.parse(body);

        if (!name || !email || !role || !department || !location) {
          send(400, { message: "All fields are required: name, email, role, department, location" });
          return;
        }

        const users = getUsers();

        const newUser = {
          id:         users.length > 0 ? users[users.length - 1].id + 1 : 1,
          name,
          email,
          role,
          department,
          location,
          joined:     new Date().toISOString().split("T")[0],
          status:     "Active",
        };

        users.push(newUser);
        saveUsers(users);  // ← persist to disk

        send(201, { message: "User created successfully", user: newUser });
      } catch (err) {
        send(400, { message: "Invalid JSON body" });
      }
    });

    return true;
  }

  return false;
}

module.exports = usersRoute;
