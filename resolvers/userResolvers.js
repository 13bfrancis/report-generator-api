const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const { User } = require('../models/userModel');

const userResolvers = {
  Query: {
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
      const token = jwt.encode({ email }, process.env.JWT_PASS);
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
    deleteUser: async (_, args, context) => {
      if (!context.user) throw new Error('Authorization Failed');
      const foundUser = await User.findOne({ email: context.user.email });
      if (!foundUser) throw new Error("Couldn't find user");
      if (args.id === foundUser.id) {
        const deletedUser = await User.findByIdAndDelete(args.id);
        return deletedUser;
      }
      throw new Error('Failed to delete user');
    }
  }
};

module.exports = {
  userResolvers
};
