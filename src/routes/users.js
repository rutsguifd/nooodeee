const {
  handleGetUsers,
  handleGetUserById,
  handleCreateUser,
  handleDeleteUser,
  handleUpdateUser,
} = require("../controllers/userController");

const handleUsersRoutes = (req, res) => {
  if (req.method === "GET" && req.url === "/users") {
    handleGetUsers(req, res);
  } else if (req.method === "GET" && req.url.match(/\/users\/\d+/)) {
    handleGetUserById(req, res);
  } else if (req.method === "POST" && req.url === "/users") {
    handleCreateUser(req, res);
  } else if (req.method === "DELETE" && req.url.match(/\/users\/\d+/)) {
    handleDeleteUser(req, res);
  } else if (req.method === "PATCH" && req.url.match(/\/users\/\d+/)) {
    handleUpdateUser(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
};

module.exports = { handleUsersRoutes };
