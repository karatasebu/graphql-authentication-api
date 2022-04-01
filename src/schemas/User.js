import { gql } from "apollo-server";

const userTypeDefs = gql`
  type User {
    username: String!
    email: String!
    password: String!
    token: String
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    user(input: ID!): User
  }

  type Mutation {
    registerUser(input: RegisterInput!): User
    loginUser(input: LoginInput!): User
  }
`;
export default userTypeDefs;
