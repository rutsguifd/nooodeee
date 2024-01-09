const users = require("../../data");

const getAllUsers = () => {
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
  }));
};

const getUserById = (userId) => {
  return users.find((user) => user.id === userId);
};

const createUser = (userData) => {
  const newUser = {
    id: users.length + 1,
    name: userData.name,
    email: userData.email,
    hobbies: userData.hobbies || [],
  };
  users.push(newUser);
  return newUser;
};

const deleteUser = (userId) => {
  const index = users.findIndex((user) => user.id === userId);
  if (index !== -1) {
    const deletedUser = users.splice(index, 1)[0];
    return deletedUser;
  } else {
    return null;
  }
};

const updateUser = (userId, updatedUserData) => {
  const user = users.find((user) => user.id === userId);
  if (user) {
    user.name = updatedUserData.name || user.name;
    user.email = updatedUserData.email || user.email;
    user.hobbies = updatedUserData.hobbies || user.hobbies;
    return user;
  } else {
    return null;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
