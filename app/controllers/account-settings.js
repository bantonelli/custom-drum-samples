import Ember from 'ember';
import config from '.././config/environment';
var swal = window.sweetAlert;

export default Ember.Controller.extend({
	needs: ['kitbuilder'],
	userName: null,
	email: null,
	currentPassword: null,
	newPassword: null,
	profile: Ember.computed.alias("model"),
	actions: {
		resetPassword: function () {
			// Dont need to send user_id
			// The view gets user from Auth header.
			var self = this;
			var currentBlank = false;
			var newBlank = false;
			// If the user didn't enter an email value use their current email
			var current_password;
			if ((this.get('currentPassword') === null) || (this.get('currentPassword') === "")){				
				currentBlank = true;
			} else {
				current_password = this.get('currentPassword');
			}

			// If the user didn't enter a username value use their current username
			var new_password;
			if ((this.get('newPassword') === null) || (this.get('newPassword') === "")){
				newBlank = true;
			} else {
				new_password = this.get('newPassword');
			}

			if (currentBlank && newBlank) {
				// ********* ALERT ******** //
				swal({
				  title: "Error!",
				  text: "You didn't enter any passwords!",
				  type: "error",
				  confirmButtonText: "OK"
				});				
			} else {
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
			}
		},
		updateAccount: function () {
			var emailBlank = false;
			var usernameBlank = false;
			// If the user didn't enter an email value use their current email
			var temp_email;
			if ((this.get('email') === null) || (this.get('email') === "")){
				temp_email = this.get('session.currentUser.email');
				emailBlank = true;
			} else {
				temp_email = this.get('email');
			}

			// If the user didn't enter a username value use their current username
			var temp_username;
			if ((this.get('userName') === null) || (this.get('userName') === "")){
				temp_username = this.get('session.currentUser.username');
				usernameBlank = true;
			} else {
				temp_username = this.get('userName');
			}

			if (emailBlank && usernameBlank) {
				// ********* ALERT ******** //
                swal({
				  title: "Error!",
				  text: "You didn't change your account information!",
				  type: "error",
				  confirmButtonText: "OK"
				});   
			} else {
				var data = {
					temp_username: temp_username,
					temp_email: temp_email
				}

				Ember.$.ajax({
					type: "PUT",
					data: data,
					url: config.APP.API_HOST + '/api/accounts/update',
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
			}
		},	
		loadTemplate: function (template){
			var kitbuilderController = this.get('controllers.kitbuilder');
			kitbuilderController.set('currentTemplate', template);
			this.transitionToRoute('your-kit');
		}
	}
});
