const {
  getUserHobbies,
  addUserHobby,
  deleteUserHobby,
} = require("../services/hobbyService");
const { respondWithJSON, respondWithError } = require("../utils/responseUtils");

const handleGetUserHobbies = (req, res) => {
  const userId = parseInt(req.url.split("/")[2]);
  const hobbies = getUserHobbies(userId);
  if (hobbies) {
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.setHeader("Expires", new Date(Date.now() + 3600 * 1000).toUTCString());
    respondWithJSON(res, 200, hobbies);
  } else {
    respondWithError(res, 404, "User not found");
  }
};

const handleAddUserHobby = (req, res) => {
  const userId = parseInt(req.url.split("/")[2]);
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    const hobby = JSON.parse(data).hobby;
    const updatedUser = addUserHobby(userId, hobby);
    if (updatedUser) {
      respondWithJSON(res, 200, updatedUser.hobbies);
    } else {
      respondWithError(res, 404, "User not found");
    }
  });
};

const handleDeleteUserHobby = (req, res) => {
  const userId = parseInt(req.url.split("/")[2]);
  const hobby = req.url.split("/")[4];
  const updatedHobbies = deleteUserHobby(userId, hobby);
  if (updatedHobbies !== null) {
    respondWithJSON(res, 200, updatedHobbies);
  } else {
    respondWithError(res, 404, "User or hobby not found");
  }
};

module.exports = {
  handleGetUserHobbies,
  handleAddUserHobby,
  handleDeleteUserHobby,
};
