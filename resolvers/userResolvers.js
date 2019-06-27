const bcrypt = require('bcrypt');
const { User } = require('../models/userModel');

const userResolvers = {
  Query: {
    users: async () => {
      const users = await User.find();
      return users;
    }
  },
  Mutation: {
    createUser: async (_, args) => {
      const { email, password } = args.input;
      const hashPass = await bcrypt.hash(password, 12);
      const user = new User({
        email,
        password: hashPass,
        reports: []
      });
      user.save();
      return user;
    },
    deleteUser: async (_, args) => {
      const deletedUser = await User.findByIdAndDelete(args.id);
      return deletedUser;
    }
  }
};

module.exports = {
  userResolvers
};
