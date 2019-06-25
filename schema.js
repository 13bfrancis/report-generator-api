const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    email: String!
    password: String!
    reports: [Report]!
  }
  type Project {
    name: String!
    status: String
    forecast: String
    progress: String
  }
  type Report {
    name: String!
    tasks: [Project]!
  }
  type LoginCredentials {
    token: String!
    name: String!
    email: String!
  }
  input LoginInfo {
    username: String!
    password: String!
  }
  input UserInput {
    email: String!
    password: String!
  }
  type Query {
    users: [User]!
    latestReports: [Report]!
    reports: [Report]!
    getToken(input: LoginInfo): LoginCredentials!
  }
  type Mutation {
    createUser(input: UserInput): User!
    deleteUser: User!
    createReport: Report!
    deleteReport: Report!
  }
`;

module.exports = {
  typeDefs
};
