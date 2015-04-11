import Ember from 'ember';
import config from 'auth-test-web/config/environment';
import { raw as icAjaxRaw } from 'ic-ajax';

export default Ember.Service.extend({
  init: function() {
    this._super();
    this.setProperties({
      authToken: localStorage.getItem('authToken'),
      userId: localStorage.getItem('userId'),
      serverTokenEndpoint: config.host + '/' + config.namespace,
      state: localStorage.getItem('authToken') ? "logged-in" : "logged-out"
    });
  },
  login: function(data) {
    var _this = this;
    this.set('state', 'logging-in');
    return icAjaxRaw(this.get('serverTokenEndpoint') + '/users/authenticate', {
      type: 'post',
      data: {
        email: data.email,
        password: data.password
      }
    }).then(function(result) {
      _this.loginSucceeded(result);
    }, function(error) { 
      _this.loginFailed(error);
    });
  },
  logout: function() {
    this.setProperties({
      authToken: null,
      userId: null,
      state: "logged-out"
    });
    this.sendToApp('logoutSucceeded');
  },
  loginSucceeded: function(result) {
    var response = result.response
    this.setProperties({
      userId: response.userId,
      authToken: response.authToken,
      state: 'logged-in'
    });
    this.sendToApp('loginSucceeded');
  },
  loginFailed: function() {
    this.set('state', 'logged-out');
    this.sendToApp('loginFailed');
  },
  sendToApp: function(name) {
    var controller = this.container.lookup('controller:login');
    try {
      controller.send(name);
    }
    catch(error) {
      console.log(error);
    }
  },
  loggedIn: function() {
    return this.get("state") === 'logged-in';
  }.property('state'),

  loggedOut: function() {
    return this.get("state") === 'logged-out';
  }.property('state'),
  LoggingIn: function() {
    return this.get("state") === "logging-in";
  }.property('state'),
  propertyChanged: function(propertyName) {
    var data = this.get(propertyName);
    var _this = this;
    if (Ember.isEmpty(data)) {
      localStorage.removeItem(propertyName);
    } else {
      console.log("handling property change of " + propertyName);
      localStorage.setItem(propertyName, this.get(propertyName));
    }
  },
  authTokenObserver: Ember.observer(function() {
    this.propertyChanged('authToken');
  }, 'authToken'),
  userIdObserver: Ember.observer(function() {
    this.propertyChanged('userId');
  }, 'userId')
});
