import User from "../models/user.model";
import userDatabase from "../db/user.db";

class UserRepository {
  findById: (id: string) => User | undefined = (id: string) => {
    return userDatabase.find((user) => user.id === id);
  };

  findByUsername: (username: string) => User | undefined = (
    username: string
  ) => {
    return userDatabase.find((user) => user.username === username);
  };

  create: (user: User) => User = (user: User) => {
    userDatabase.push(user);
    return user;
  };

  update: (user: User) => User | undefined = (user: User) => {
    const index = userDatabase.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      userDatabase[index] = user;
      return user;
    }
    return undefined;
  };

  softDeleteUser: (id: string) => boolean = (id: string) => {
    const user = this.findById(id);
    if (user) {
      user.cartId = null;
      return true;
    }
    return false;
  };
}

export default UserRepository;
