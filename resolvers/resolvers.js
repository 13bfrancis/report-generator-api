const { userResolvers } = require('./userResolvers');
const { reportResolvers } = require('./reportResolvers');

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...reportResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...reportResolvers.Mutation
  }
};

module.exports = {
  resolvers
};
