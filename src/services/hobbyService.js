const users = require("../../data");

const getUserHobbies = (userId) => {
  const user = users.find((user) => user.id === userId);
  return user ? user.hobbies : null;
};

const addUserHobby = (userId, hobby) => {
  const user = users.find((user) => user.id === userId);
  if (user) {
    user.hobbies.push(hobby);
    return user;
  } else {
    return null;
  }
};

const deleteUserHobby = (userId, hobby) => {
  const user = users.find((user) => user.id === userId);
  if (user) {
    const index = user.hobbies.indexOf(hobby);
    if (index !== -1) {
      user.hobbies.splice(index, 1);
      return user.hobbies;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = { getUserHobbies, addUserHobby, deleteUserHobby };
