import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
  // modal route is on application level scope
    // therefore it works with application controller
  this.modal('login-modal', {
    //with params is the query parameter that triggers the modal appearing
      withParams: ['login'],
      // other params are controller variables that are passed into modal component.
      otherParams: {
          identification: "identification",
          password: "password",
          errorMessage: "errorMessage"
      },
      actions: {
        // actions that are sent to application controller
          authenticate: 'authenticate'
      }
  });
  this.route("login");
  this.resource("protected");
  this.resource("legal", function (){
  });
  this.resource("about");
  this.resource("kitbuilder", function (){
      this.resource("sound-selection", {path: '/'});
      this.resource("your-kit");
      this.resource("kb-checkout", {path: '/checkout'});
  });
  this.resource("account-settings");
  this.resource("register", function (){
      this.resource("sign-up", {path: '/'});
      this.resource("register-thanks", {path: '/thanks/:user_id'});
  });  
});

export default Router;
