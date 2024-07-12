import { gql } from "apollo-server-express";

const UserSchema = gql`
  type User {
    id: ID!
    name: String
    email: String
    password: String
    address: Address
  }

  input UserInput {
    name: String
    email: String
    password: String
  }

  type Query {
    findUsers: [User]
    findUser(id: ID!): User
  }

  type Mutation {
    createUser(input: UserInput): User
    editUser(id: ID!, input: UserInput): User
    deleteUser(id: ID!): User
  }
`;
export default UserSchema;
