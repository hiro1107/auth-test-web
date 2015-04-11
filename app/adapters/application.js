import DS from 'ember-data';
import config from 'auth-test-web/config/environment';

export default DS.ActiveModelAdapter.extend({
  namespace: config.namespace,
  host: config.host
});
