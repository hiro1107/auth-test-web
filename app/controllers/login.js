import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    login: function() {
      var data = this.getProperties('email', 'password');
      var auth = this.get('auth');
      auth.login(data);
    },
    loginSucceeded: function() {
      this.transitionToRoute('secret');
    },
    loginFailed: function() {
      this.set('password', null);
    },
    logoutSucceeded: function() {
      this.transitionToRoute('index');
    }
  }
});
