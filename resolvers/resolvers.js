const { userResolvers } = require('./userResolvers');
const { reportResolvers } = require('./reportResolvers');

const resolvers = {
  Query: {
    ...userResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...reportResolvers.Mutation
  }
};

module.exports = {
  resolvers
};
