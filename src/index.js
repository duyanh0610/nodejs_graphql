// import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/schema/index.js";
import express from "express";
import { ApolloServer } from "apollo-server-express";

dotenv.config();
const port = process.env.SERVER_PORT || 3003;

const app = express();
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});
// app.listen(port, () => console.log(`Listening on port ${port}`));
// server.listen(port).then(({ url }) => {
//   console.log(`YOUR API IS RUNNING AT: ${url}`);
// })

await server.start();
server.applyMiddleware({ app });
app.listen({ port }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
});
// const { url } = await startStandaloneServer(server, { listen: { port } });

// console.log(`🚀 Server ready at ${url}`);

// export const graphqlHandler = startServerAndCreateLambdaHandler(
//   server,
//   // We will be using the Proxy V2 handler
//   handlers.createAPIGatewayProxyEventV2RequestHandler()
// );
