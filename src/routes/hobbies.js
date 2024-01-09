const {
  handleGetUserHobbies,
  handleAddUserHobby,
  handleDeleteUserHobby,
} = require("../controllers/hobbyController");

const handleHobbiesRoutes = (req, res) => {
  if (req.method === "GET" && req.url.match(/\/users\/\d+\/hobbies/)) {
    handleGetUserHobbies(req, res);
  } else if (req.method === "POST" && req.url.match(/\/users\/\d+\/hobbies/)) {
    handleAddUserHobby(req, res);
  } else if (
    req.method === "DELETE" &&
    req.url.match(/\/users\/\d+\/hobbies\/\w+/)
  ) {
    handleDeleteUserHobby(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
};

module.exports = { handleHobbiesRoutes };
