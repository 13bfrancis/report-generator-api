const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const { User } = require('../models/userModel');

const userResolvers = {
  Query: {
    users: async () => {
      const users = await User.find();
      return users;
    },
    getToken: async (_, args) => {
      const { email, password } = args.input;
      const foundUser = await User.findOne({ email });

      if (!foundUser) {
        throw new Error('Username or password is incorrect');
      }
      const isPassword = await bcrypt.compare(password, foundUser.password);
      if (!isPassword) {
        throw new Error('Username or password is incorrect');
      }
      const token = jwt.encode({ email }, 'supersecret');
      return {
        email,
        token
      };
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
