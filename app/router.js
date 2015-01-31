import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
  this.modal('login-modal', {
      withParams: ['login'],
      otherParams: {
          identification: "identification",
          password: "password"
      },
      actions: {
          authenticate: 'authenticate'
      }
  });
  this.route("login");
  this.resource("protected");
  this.resource("legal", function (){
  });
  this.route("about");
});

export default Router;
