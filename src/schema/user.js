export const UserSchema = `#graphql
  type User {
    id: ID!
    name: String
    email: String
  }

  type Query {
    user(id: ID!): User
    user(name: String!): User
  }

  type Mutation {
    createUser(name: String!, email: String!): User
  }
  
  `