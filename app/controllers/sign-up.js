import Ember from 'ember';
import config from '.././config/environment';
import EmberValidations from 'ember-validations';
var swal = window.sweetAlert;

export default Ember.Controller.extend(EmberValidations.Mixin, {
    validations: {
        username: {
            presence: true,
            format: {
                with: /^([a-zA-Z]|\d)+$/, message: 'must be letters and numbers only'
            }
        },
        email: {
            presence: true,
            format: {
                with: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i, message: 'must be a valid email address'
            }
        },
        password: {
            presence: true,
            confirmation: {message: "passwords don't match"}
        },
        passwordConfirmation: {
            presence: true
        }
    },
	actions: {
		register: function () {            
            var controllerSelf = this;

            controllerSelf.validate().then(function (){
                if (controllerSelf.get('isValid')) {
                    var username = controllerSelf.get('username');
                    var email = controllerSelf.get('email');
                    var password = controllerSelf.get('password');
                    var passwordConfirm = controllerSelf.get('passwordConfirmation');
                   
                    
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
            }); // End validation promise
   
		}
	}

});
