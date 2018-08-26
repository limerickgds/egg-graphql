'use strict';

exports.keys = 'plugin-graphql';
exports.graphql = {
  gui: true,
  async onPreGraphiQL(ctx) {
    await ctx.service.user.getUserList();
    return {};
  },
};
