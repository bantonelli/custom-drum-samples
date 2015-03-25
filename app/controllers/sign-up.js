import Ember from 'ember';
import config from '.././config/environment';
var swal = window.sweetAlert;

export default Ember.Controller.extend({
	actions: {
		register: function () {
            var controllerSelf = this;
            
/*
{{input id="first-name-billing" placeholder="Username" class="cds-text-input" type="text" value=username}}
{{input id="last-name-billing" placeholder="Email" class="cds-text-input" type="text" value=email}}
{{input id="address-1-billing" placeholder="Password" class="cds-text-input" type="text" value=password}}
{{input id="address-2-billing" placeholder="Confirm Password" class="cds-text-input" type="password" value=passwordConfirm}}
*/
            var username = this.get('username');
            var email = this.get('email');
            var password = this.get('password');
            var passwordConfirm = this.get('passwordConfirm');
           
            
            var registerData = {
                username: username,
                email: email,
                password: password
            };

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

            Ember.$.ajax({
                beforeSend: function(xhr) {
                    var csrftoken = getCookie('mycsrftoken');
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                },
                type: "POST",
                url: config.APP.API_HOST + "/api/accounts/register",
                crossDomain: true,
                data: registerData,
                success: function (data) {
                    console.log(data);
                    var user = data;
                    controllerSelf.transitionToRoute('register-thanks', user.id);
                    // do something with server response data
                }                
            }).fail(function( jqXHR, textStatus ) {
                // Error that rises when there is a server error
                // Or if there is simply an HTTP error that is raised with the request
                var messages = jqXHR.responseJSON;
                var message = "";
                if (messages.username){
                    message += "Username error: " + messages.username.join(', ');
                }
                if (messages.email){
                    message += "\n" + "Email error: " + messages.email.join(', ');
                }
                if (messages.password){
                    message += "\n" + "Password error: " + messages.password.join(', ');   
                }
                // ********* ALERT ******** //              
                swal({
                  title: "Error(s)!",
                  text: message,
                  type: "error",
                  confirmButtonText: "OK"
                });  
            });
		}
	}

});
