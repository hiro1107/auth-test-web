import Ember from 'ember';

var AuthRoute = Ember.Route.extend({
  beforeModel: function() {
    if (this.get('auth.loggedOut')) {
      this.transitionTo('login');
    }
  }
});

export default AuthRoute;