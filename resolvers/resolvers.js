const { userResolvers } = require('./userResolvers');

const resolvers = {
  Query: {
    ...userResolvers.Query
  }
};

module.exports = {
  resolvers
};
