'use strict';

const assert = require('assert');
const mm = require('egg-mock');

describe('test/graphqlGui.test.js', () => {
  describe('should work', () => {
    let app;
    before(() => {
      app = mm.app({
        baseDir: 'apps/graphql-app',
      });
      return app.ready();
    });

    after(() => app.close());
    after(mm.restore);

    it('should get terminal/console html response', () => {
      return app.httpRequest()
        .get('/graphql')
        .set('Accept', 'text/html')
        .expect(200)
        .then(response => {
          assert(response.type, 'text/html');
        });
    });
  });

  // https://github.com/apollographql/apollo-server/blob/master/packages/apollo-server-core/src/playground.ts#L41
  describe('should not response when env is prod', () => {
    let app;
    const defaultEnv = process.env.NODE_ENV;

    before(() => {
      mm.env('prod');
      process.env.NODE_ENV = 'production';
      app = mm.app({
        baseDir: 'apps/graphql-app',
      });
      return app.ready();
    });

    after(() => {
      app.close();
      process.env.NODE_ENV = defaultEnv;
    });
    after(mm.restore);

    // TODO
    it('should not get terminal/console html response', () => {
      return app.httpRequest()
        .get('/graphql')
        .set('Accept', 'text/html')
        .expect(500);
    });
  });
});
