const userResolvers = {
  Query: {
    users: () => {
      return [{ email: '13bfrancis@gmail.com' }];
    }
  }
};

module.exports = {
  userResolvers
};
