import Ember from 'ember';
import config from '.././config/environment';

export default Ember.Component.extend({
    classNames: ['login-modal'],
    errorMessage: function (){
    	// computed property that watches for changes in the targetObject's errorMessage
    	// The target object is the parent controller
    		// in this case the parent controller is the application controller 
    		// The application controller also acts as simple-auth login controller mixin.
    	var error = this.get('targetObject.errorMessage');
    	return error;
    }.property('targetObject.errorMessage'),
    showError: false,
    passwordHidden: true,
    resetPasswordHidden: true,
    resetFormHidden: true,
    resetPasswordSuccessMessage: null,
    resetPasswordEmailError: null,
    resetPasswordNewPasswordError: null,
    resetPasswordUserError: null,
    actions: {
      showPassword: function (){
        this.set('passwordHidden', false);
        Ember.$('#signin-password').prop("type", "text");
      },
      hidePassword: function (){
        this.set('passwordHidden', true);
        Ember.$('#signin-password').prop("type", "password");
      },
      showResetPassword: function () {
        this.set('resetPasswordHidden', false);
        Ember.$('#reset-password-new-password').prop("type", "text");
      },
      hideResetPassword: function (){
        this.set('resetPasswordHidden', true);
        Ember.$('#reset-password-new-password').prop("type", "password");
      },
      showResetForm: function (){
        this.set('resetFormHidden', false);
      },
      hideResetForm: function (){
        this.set('resetFormHidden', true);
      },
      resetPassword: function (){

        var email = this.get('email');
        var newPassword = this.get('newPassword');
        var self = this;

        self.set('resetPasswordUserError', null);
        self.set('resetPasswordEmailError', null);
        self.set('resetPasswordNewPasswordError', null);

        function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie !== '') {
             var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                     var cookie = Ember.$.trim(cookies[i]);
                     // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }

         // get the csrftoken cookie stored by django
        var csrf_token = getCookie('csrftoken');

        var data = {
          email: email,
          new_password: newPassword,
          csrfmiddlewaretoken: csrf_token
        };

        Ember.$.ajax({
          type: "POST",
          url: config.APP.API_HOST + '/api/accounts/password/reset',
          crossDomain: true,
          data: data,
          xhrFields: {
              withCredentials: true
          },
          success: function (data){
            var message = "Verification email sent to " + email + ".";
            self.set('resetPasswordUserError', null);
            self.set('resetPasswordEmailError', null);
            self.set('resetPasswordNewPasswordError', null);
            self.set('resetPasswordSuccessMessage', message);
            console.log(data);
          }
        }).fail(function( jqXHR, textStatus ) {
            // Error that rises when there is a server error
            // Or if there is simply an HTTP error that is raised with the request
            var messages = jqXHR.responseJSON;
            var message = "";
            if (messages.user){
                message += "User error: " + messages.user.join(', ');
                self.set('resetPasswordUserError', message);
            }
            if (messages.email){
                message = messages.email.join(', ');
                self.set('resetPasswordEmailError', message);
            }
            if (messages.new_password){
                message = messages.new_password.join(', '); 
                self.set('resetPasswordNewPasswordError', message);
            }
            // ********* ALERT ******** //              
            // swal({
            //   title: "Error(s)!",
            //   text: message,
            //   type: "error",
            //   confirmButtonText: "OK"
            // });  
            self.set('resetPasswordSuccessMessage', null);
        });
      },
      login: function () {
      	var _this = this;
      	// Send the authenticate action to the application controller's authenticate action
      	// authenticate action on app controller is provided by simple auth mixin
    		this.sendAction('authenticate');
    		// use setTimeout for a slight delay after login (for UX)
    		setTimeout(function(){ 
    			// If there is an error show it
    			if (_this.get('errorMessage')){
    				console.log(_this.get('errorMessage'));
            _this.set('showError', true);
    			} 
    			// otherwise close the modal (the login was successful)
    			else {
            _this.set('showError', false);
    				_this.sendAction('dismiss');	
    			}             
    		}, 70);                         
      }
    }
});
