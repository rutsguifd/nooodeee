const { handleUsersRoutes } = require("./users");
const { handleHobbiesRoutes } = require("./hobbies");

const handleRequests = (req, res) => {
  if (req.url.startsWith("/users")) {
    handleUsersRoutes(req, res);
  } else if (req.url.startsWith("/hobbies")) {
    handleHobbiesRoutes(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
};

module.exports = { handleRequests };
