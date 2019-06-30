const { gql } = require('apollo-server');

/*

"""
Anything inside of these placed above the type or whatever
can be used for it's description
"""

# this denotes a comment

*/

const typeDefs = gql`
  type User {
    id: String!
    email: String!
    password: String!
    reports: [Report]!
  }
  type Project {
    id: String!
    name: String!
    status: String
    forecast: String
    progress: String
  }
  type Report {
    id: String!
    name: String!
    projects: [Project]!
  }
  type LoginCredentials {
    token: String!
    email: String!
  }
  input LoginInfo {
    email: String!
    password: String!
  }
  input UserInput {
    email: String!
    password: String!
  }
  input CreateReportInput {
    name: String!
    status: String
    forecast: String
    progress: String
  }
  type Query {
    users: [User]!
    reports: [Report]!
    getToken(input: LoginInfo): LoginCredentials!
  }
  type Mutation {
    createUser(input: UserInput!): User!
    deleteUser(id: String!): User!
    createReport(name: String!, input: [CreateReportInput]!): Report!
    deleteReport: Report!
  }
`;

module.exports = {
  typeDefs
};
