const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    name: String!
  }
  type Query {
    users: [User]!
  }
`;

const resolvers = {
  Query: {
    users: () => {
      return [{ name: 'Brian Francis' }];
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
