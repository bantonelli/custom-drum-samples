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
      this.resource("kb-checkout", {path: '/checkout'}, function (){
          this.resource('kb-payment-method', {path:'/'});
          this.resource('kb-billing', {path:'/billing'});
          this.resource('kb-thank-you', {path:'/thanks'});
      });
  });
  this.resource("account-settings", function () {
      this.resource('update-info', {path: '/update-info/:uid/:token'});
  });
  this.resource('password-reset', {path: '/password-reset/:uid/:token'});
  this.resource("register", {path:'/registration'}, function (){
      this.resource("sign-up", {path: '/'});
      this.resource("register-thanks", {path: '/thanks/:user_id'});
      this.resource("activate", {path: '/activate/:uid/:token'});
  });
  this.route('kb-learn-more');
});

export default Router;
