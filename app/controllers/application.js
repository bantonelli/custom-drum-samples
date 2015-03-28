/**
 * Created by brandonantonelli on 1/28/15.
 */
import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(LoginControllerMixin, {
  //authenticator: 'simple-auth-authenticator:oauth2-password-grant'
    authenticator: 'cds-authenticator:oauth2-password-grant',
    queryParams: ['login'],
    login: false,
	actions: {
// display an error when authentication fails
		authenticate: function() {
			// Grab the component object for later use
			var _this = this;
			// grab the login credentials
			var credentials = this.getProperties('identification', 'password');
			// Call authenticate which returns a promise
			// Call then to handle the promise
				// the first function is if it is successful
				// the second function is if an error is returned.
			this.get('session').authenticate('cds-authenticator:oauth2-password-grant', credentials).then(function (){
				// setting this 'errorMessage' property to null causes the property of the
				// login modal to also become null				
				_this.set('errorMessage', null);
				      // Log the user in, then reattempt previous transition if it exists.
				var previousTransition = _this.get('previousTransition');
				if (previousTransition) {
					_this.set('previousTransition', null);
					previousTransition.retry();
				} else {
					// Default back to homepage
					_this.transitionToRoute('application.index');
				}
			}, function(error) {
				var message = error.error;
				if (message === "invalid_client"){
					message = " The email or password you entered is incorrect"
				}
				// set the error message string to the property.
				// This property is also available on the login modal component.
				_this.set('errorMessage', message);				
			});
		}
	}
});