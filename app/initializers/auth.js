import Auth from 'auth-test-web/services/auth';

export function initialize(container, app) {
  // application.inject('route', 'foo', 'service:foo');
  app.register('auth:main', Auth);

  app.inject('route', 'auth', 'auth:main');
  app.inject('controller', 'auth', 'auth:main');
  app.inject('application', 'auth', 'auth:main');

  app.inject('auth', 'store', 'store:main');
}

export default {
  name: 'auth',
  after: 'ember-data',
  initialize: initialize
};
