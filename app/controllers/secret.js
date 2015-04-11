import Ember from 'ember';

export default Ember.Controller.extend({
  name: function() {
    return this.get('model.name');
  }.property('model.name'),
  actions: {
    logout: function() {
      var auth = this.get('auth');
      auth.logout();
    }
  }
});
