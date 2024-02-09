const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

async function startServer() {
  const app = express();

  app.use(cors());

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}${apolloServer.graphqlPath}`);
  });
}

startServer().catch(error => {
  console.error('Server failed to start', error);
});
