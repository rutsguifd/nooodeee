const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
} = require("../services/userService");
const { respondWithJSON, respondWithError } = require("../utils/responseUtils");
const addHATEOASLinks = require("../utils/addHATEOASLinks");

const handleGetUsers = (req, res) => {
  const users = getAllUsers();
  respondWithJSON(res, 200, users);
};

const handleGetUserById = (req, res) => {
  const userId = parseInt(req.url.split("/")[2]);
  const user = getUserById(userId);
  if (user) {
    const userWithLinks = addHATEOASLinks(user);
    respondWithJSON(res, 200, userWithLinks);
  } else {
    respondWithError(res, 404, "User not found");
  }
};

const handleCreateUser = (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    const userData = JSON.parse(data);
    const newUser = createUser(userData);
    const newUserWithLinks = addHATEOASLinks(newUser);
    respondWithJSON(res, 201, newUserWithLinks);
  });
};

const handleDeleteUser = (req, res) => {
  const userId = parseInt(req.url.split("/")[2]);
  const deletedUser = deleteUser(userId);
  if (deletedUser) {
    respondWithJSON(res, 200, { message: "User deleted successfully" });
  } else {
    respondWithError(res, 404, "User not found");
  }
};

const handleUpdateUser = (req, res) => {
  const userId = parseInt(req.url.split("/")[2]);
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    const updatedUserData = JSON.parse(data);
    const updatedUser = updateUser(userId, updatedUserData);
    if (updatedUser) {
      const updatedUserWithLinks = addHATEOASLinks(updatedUser);
      respondWithJSON(res, 200, updatedUserWithLinks);
    } else {
      respondWithError(res, 404, "User not found");
    }
  });
};

module.exports = {
  handleGetUsers,
  handleGetUserById,
  handleCreateUser,
  handleDeleteUser,
  handleUpdateUser,
};
