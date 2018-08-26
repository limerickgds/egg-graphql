'use strict';
const { ApolloServer } = require('apollo-server-koa');

module.exports = app => {
  const options = app.config.graphql;
  const { router: graphQLRouter, disableHealthCheck, onHealthCheck } = options;

  const server = new ApolloServer({
    schema: app.schema,
    context: ({ ctx }) => ctx,
  });
  server.applyMiddleware({
    app,
    path: graphQLRouter,
    disableHealthCheck,
    onHealthCheck,
  });
};
