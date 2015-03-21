import Ember from 'ember';

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
    resetFormHidden: true,
    actions: {
      showPassword: function (){
        this.set('passwordHidden', false);
        Ember.$('#signin-password').prop("type", "text");
      },
      hidePassword: function (){
        this.set('passwordHidden', true);
        Ember.$('#signin-password').prop("type", "password");
      },
      showResetForm: function (){
        this.set('resetFormHidden', false);
      },
      hideResetForm: function (){
        this.set('resetFormHidden', true);
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
    		}, 500);                         
      }
    }
});
