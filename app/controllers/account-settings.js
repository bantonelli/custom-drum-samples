import Ember from 'ember';
import config from '.././config/environment';
import EmberValidations from 'ember-validations';
var swal = window.sweetAlert;

export default Ember.Controller.extend(EmberValidations.Mixin, {
	needs: ['kitbuilder'],
	userName: null,
	email: null,
	currentPassword: null,
	newPassword: null,
	profile: Ember.computed.alias("model"),
	validations: {
        userName: {
            format: {
                with: /^([a-zA-Z]|\d)+$/, 
                allowBlank: true, 
                message: 'must be letters and numbers only',
                unless: 'resetPasswordRun'
            }
        },
        email: {
            format: {
                with: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i, 
                allowBlank: true, 
                message: 'must be a valid email address',
                unless: 'resetPasswordRun'
            }
        },
        currentPassword: {
            presence: {
            	message: "Please enter your current account password",
            	unless: 'updateAccountRun'
            }
        },
        newPassword: {
        	presence: {
        		message: "Please enter a new password for your account",
        		unless: 'updateAccountRun'
        	}	
        }
    },
	actions: {
		// currentPassword, newPassword, email, userName
		resetPassword: function () {
			this.set('updateAccountRun', false);
			this.set('resetPasswordRun', true);
			// reset Password simply grabs the result of the client side validation
			var self = this;
			self.validate().then(null, function (){
				if (self.get('isValid')) {
					// Get current password
					var current_password;			
					current_password = self.get('currentPassword');

					// Get new password
					var new_password;			
					new_password = self.get('newPassword');
			
					var data = {				
						current_password: current_password,
						new_password: new_password
					};

					Ember.$.ajax({
						type: "POST",
						url: config.APP.API_HOST + "/" + config.APP.API_NAMESPACE + '/accounts/password',
						crossDomain: true,
						data: data,
						xhrFields: {
							withCredentials: true
						},
						success: function (data){
							// ********* ALERT ******** //
			                swal({
							  title: "Success!",
							  text: 'Your password has been reset!',
							  type: "success",
							  confirmButtonText: "OK"
							});
							self.set('newPassword', null);
							self.set('currentPassword', null);     						
						}
					}).fail(function( jqXHR, textStatus ) {
		                // Error that rises when there is a server error
		                // Or if there is simply an HTTP error that is raised with the request
		                var messages = jqXHR.responseJSON;
		                var message = "";
		                if (messages.current_password){
		                	message += messages.current_password.join(', ');
		                }
		                // ********* ALERT ******** //
		                swal({
						  title: "Error!",
						  text: message,
						  type: "error",
						  confirmButtonText: "OK"
						});                	
		        	});
	        	} else {
                    self.set('submissionErrors', self.get('errors'));
                }
        	});
		},
		updateAccount: function () {
			this.set('resetPasswordRun', false);
			this.set('updateAccountRun', true);			
			var temp_email;
			if ((this.get('email') === null) || (this.get('email') === "")){
				// If nothing is entered use their existing info and set it so validation can run
				temp_email = this.get('session.currentUser.email');
				this.set('email', temp_email);
			} else {
				temp_email = this.get('email');
			}

			// If the user didn't enter a username value use their current username
			var temp_username;
			if ((this.get('userName') === null) || (this.get('userName') === "")){
				// If nothing is entered use their existing info and set it so validation can run				
				temp_username = this.get('session.currentUser.username');
				this.set('userName', temp_username);
			} else {
				temp_username = this.get('userName');
			}

			// Test for any change in username or email. If no change do not make call to server.
			if (temp_username == this.get('session.currentUser.username') && temp_email == this.get('session.currentUser.email')) {
				// there is no change to username and email. alert user.
				// ********* ALERT ******** //				
                swal({
				  title: "Error!",
				  text: "You have not made any changes to your account information.",
				  type: "error",
				  confirmButtonText: "OK"
				});

			} else {
				// old username and/or email have some kind of change so validate and make call to server.
				var self = this;			
				self.validate().then(function (){
	                
					console.log('got passed validation');
					var data = {
						temp_username: temp_username,
						temp_email: temp_email
					}

					Ember.$.ajax({
						type: "PUT",
						data: data,
						url: config.APP.API_HOST + '/' + config.APP.API_NAMESPACE + '/accounts/update',
						crossDomain: true,
						xhrFields: {
							withCredentials: true
						},
						success: function (data) {
							// ********* ALERT ******** //
							var message = 'A confirmation email has been sent to: '+ data.temp_email +' \n Follow the instructions to finish updating your account';
			                swal({
							  title: "Success!",
							  text: message,
							  type: "success",
							  confirmButtonText: "OK"
							});   
						}
					}).fail(function (jqXHR, textStatus) {
					    var messages = jqXHR.responseJSON;
					    var message = "";
		                if (messages.temp_email){
		                	message += messages.temp_email.join(', ');
		                }
		                if (messages.temp_username){
		                	message += messages.temp_username.join(', ');
		                }
						// ********* ALERT ******** //				
		                swal({
						  title: "Error!",
						  text: message,
						  type: "error",
						  confirmButtonText: "OK"
						});                 		            	 
					});	                 	
				}).catch(function (){
					self.set('submissionErrors', self.get('errors'));
				});
			}			
		},	
		loadTemplate: function (template){
			var kitbuilderController = this.get('controllers.kitbuilder');
			kitbuilderController.set('currentTemplate', template);
			this.transitionToRoute('your-kit');
		}
	}
});
