const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers/resolvers');

require('dotenv').config();

const server = new ApolloServer({ typeDefs, resolvers });

mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${
      process.env.DB_PASS
    }@ds335957.mlab.com:35957/report-gen-api`,
    { useNewUrlParser: true }
  )
  .then(() => {
    server.listen().then(({ url }) => {
      console.log(`Server ready at ${url}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
