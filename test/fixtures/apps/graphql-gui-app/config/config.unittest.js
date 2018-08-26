'use strict';

exports.keys = 'plugin-graphql';
exports.graphql = {
  router: '/graphql',
  gui: false,
  async onPreGraphQL(ctx) {
    await ctx.service.user.getUserList();
    return {};
  },
  async onPreGraphiQL(ctx) {
    await ctx.service.user.getUserList();
    return {};
  },
};
