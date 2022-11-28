// const { ApolloServer } = require("@apollo/server");
// const { startStandaloneServer } = require("@apollo/server/standalone");
// const organizationSchema = require("../graphql/type_defs/organizationSchema");
// const data = require("../data/newData0.json");

// // schema
// const typeDefs = organizationSchema;

// // Resolvers define how to fetch the types defined in schema.
// const resolvers = {
//   Query: {
//     organizations: () => data,
//   },
// };

// // create an ApolloServer
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// // create an Express app then add the ApolloServer instance as middleware
// startStandaloneServer(server, {
//   listen: { port: 4000 },
// }).then((result) => console.log(`🚀  Server ready at: ${result.url}`));

//!-------------------------------------------------------------------------------------------------

// const { ApolloServer } = require("@apollo/server");
// const { startStandaloneServer } = require("@apollo/server/standalone");
// require("dotenv").config();
// const typeDefs = require("../schema/blogSchema");
// const resolvers = require("../graphql/resolvers/blogResolvers");
// const BlogAPI = require("../graphql/datasources/BlogAPI");

// const server = new ApolloServer({ typeDefs, resolvers });
// const PORT = process.env.PORT || 9000;

// startStandaloneServer(server, {
//   listen: { port: PORT },
//   async context({ req }) {
//     return {
//       blogAPI: new BlogAPI(),
//     };
//   },
// }).then((result) => console.log(`🚀  Server ready at: ${result.url}`));

//!-------------------------------------------------------------------------------------------------

// npm install @apollo/server express graphql cors body-parser
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const express = require("express");
const http = require("http");
const cors = require("cors");
const typeDefs = require("../schema/blogSchema");
const resolvers = require("../graphql/resolvers/blogResolvers");
const schema = require("../schema/schema");

(async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.get("/test", (req, res) => {
    res.send(resolvers.Query.hello());
  });

  app.use(
    "/graphql",
    cors(),
    express.json(),
    express.urlencoded({ extended: true }),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
})();
