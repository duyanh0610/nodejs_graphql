import dotenv from "dotenv";
import { ApolloServer } from "apollo-server";
import typeDefs from "./schema/index.js";
import resolvers from "./resolvers/index.js";


dotenv.config();
const port = process.env.SERVER_PORT || 3003;

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});
// app.listen(port, () => console.log(`Listening on port ${port}`));
server.listen(port).then(({ url }) => {
  console.log(`YOUR API IS RUNNING AT: ${url} :)`);
});