// get concurrently for the root folder so I can run a command

const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers/resolvers');
const { isAuth } = require('./helpers/isAuth');

require('dotenv').config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const user = await isAuth(token);
    return { user };
  },
  introspection: true,
  playground: true
});

mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${
      process.env.DB_PASS
    }@ds335957.mlab.com:35957/report-gen-api`,
    { useNewUrlParser: true }
  )
  .then(() => {
    server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
      console.log(`Server ready at ${url}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
