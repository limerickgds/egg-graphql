'use strict';

const { runQuery } = require('apollo-server-core');

module.exports = app => {
  class GraphqlService extends app.Service {

    async query(requestString) {
      let result = {};
      const ctx = this.ctx;

      try {
        const params = JSON.parse(requestString);
        const { query, variables, operationName } = params;
        const context = ctx;
        const schema = this.app.schema;

        // https://github.com/apollographql/apollo-server/blob/master/packages/apollo-server-core/src/runQuery.ts#L78
        result = await runQuery({
          schema,
          queryString: query,
          context,
          variables,
          operationName,
        });

      } catch (e) {
        this.logger.error(e);

        result = {
          data: {},
          errors: [ e ],
        };
      }

      return result;
    }
  }

  return GraphqlService;
};
