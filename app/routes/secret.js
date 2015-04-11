import Ember from 'ember';
import AuthRoute from './auth';

export default AuthRoute.extend({
  model: function() {
    return this.store.find('user', this.get("auth.userId"));
  },
  setupController: function(controller, model) {
    controller.set('model', model)
  }
});
