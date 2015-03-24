import Ember from 'ember';
import config from '.././config/environment';

export default Ember.Controller.extend({
	userName: null,
	email: null,
	currentPassword: null,
	newPassword: null,
	profile: Ember.computed.alias("model"),
	actions: {
		resetPassword: function () {
			// Dont need to send user_id
			// The view gets user from Auth header.

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
				alert("You didn't enter any passwords!");
			} else {
				var data = {				
					current_password: current_password,
					new_password: new_password
				};

				Ember.$.ajax({
					type: "POST",
					url: config.APP.API_HOST + '/api/accounts/password',
					crossDomain: true,
					data: data,
					xhrFields: {
						withCredentials: true
					},
					success: function (data){
						alert('your password has been reset');

					}
				}).fail(function( jqXHR, textStatus ) {
	                // Error that rises when there is a server error
	                // Or if there is simply an HTTP error that is raised with the request
	                var messages = jqXHR.responseJSON;
	                var message = "";
	                if (messages.current_password){
	                	message += messages.current_password.join(', ');
	                }                	
	            	alert( "Request failed: " + message );
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
				alert("You didn't change your account information");
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
						alert('A confirmation email has been sent to: '+ data.temp_email +' \n Follow the instructions to finish updating your account');
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
	            	alert("Request failed: " + message);
				});
			}
		}
	}
});
