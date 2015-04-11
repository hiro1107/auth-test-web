import Ember from 'ember';
import config from 'auth-test-web/config/environment';
import { raw as icAjaxRaw } from 'ic-ajax';

export default Ember.Controller.extend({
  actions: {
    signup: function() {
      var _this = this;
      var data = this.getProperties('name', 'email', 'password');
      var auth = this.get('auth');
      icAjaxRaw(config.host + '/' + config.namespace + '/users/create', {
        type: 'post',
        data: {
          user: {
            name: data.name,
            email: data.email,
            password: data.password
          }
        }
      }).then(function(result) {
        _this.setProperties({
          name: null,
          email: null,
          password: null
        })
        auth.login(data);
      }, function(err) {
        console.log(err);
        _this.set('password', null);
      });
    }
  }
});
