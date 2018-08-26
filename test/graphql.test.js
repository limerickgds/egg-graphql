'use strict';

const assert = require('assert');
const mm = require('egg-mock');

describe('test/graphql.test.js', () => {
  let app;

  before(() => {
    app = mm.app({
      baseDir: 'apps/graphql-app',
    });
    return app.ready();
  });

  after(mm.restore);

  it('should return user 11', async () => {
    app.mockCsrf();
    // ?query=query+getUser($id:Int){user(id:$id){name}}&operationName=getUser&variables=1
    const resp = await app.httpRequest()
      .post('/graphql')
      .send({
        query: '{user(id: 11) { name }}',
      })
      .expect(200);

    assert.deepEqual(resp.body.data, {
      user: {
        name: 'name11',
      },
    });
  });

  it('should return user 22', async () => {
    app.mockCsrf();
    // ?query=query+getUser($id:Int){user(id:$id){name}}&operationName=getUser&variables=1
    const resp = await app.httpRequest()
      .post('/graphql')
      .send({
        query: 'query getUser($id: Int) { user(id: $id) { name } }',
        operationName: 'getUser',
        variables: {
          id: 22,
        },
      })
      .expect(200);

    assert.deepEqual(resp.body.data, {
      user: {
        name: 'name22',
      },
    });
  });

  it('should return user 2', async () => {
    const resp = await app.httpRequest()
      .get('/user')
      .expect(200);

    assert.deepEqual(resp.body.data, {
      user: {
        name: 'name2',
      },
    });
  });
});
