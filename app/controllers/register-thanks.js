import Ember from 'ember';
import config from '.././config/environment';


export default Ember.Controller.extend({
	actions: {
		resendActivation: function () {
            var controllerSelf = this;
            
/*
{{input id="first-name-billing" placeholder="Username" class="cds-text-input" type="text" value=username}}
{{input id="last-name-billing" placeholder="Email" class="cds-text-input" type="text" value=email}}
{{input id="address-1-billing" placeholder="Password" class="cds-text-input" type="text" value=password}}
{{input id="address-2-billing" placeholder="Confirm Password" class="cds-text-input" type="password" value=passwordConfirm}}
*/
            var user_id = this.get('model.id');
           
            

            // Function for getting a cookie based on name 
	         function getCookie(name) {
	             var cookieValue = null;
	             if (document.cookie && document.cookie != '') {
	                 var cookies = document.cookie.split(';');
	                 for (var i = 0; i < cookies.length; i++) {
	                     var cookie = jQuery.trim(cookies[i]);
	                     // Does this cookie string begin with the name we want?
	                 	if (cookie.substring(0, name.length + 1) == (name + '=')) {
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
				// have to send 'csrfmiddlewaretoken' as a post parameter for django.
				csrfmiddlewaretoken: csrf_token,
			    user_id: user_id                
			};
			
			return Ember.$.ajax({
					//headers: {'X-CSRFToken' : csrf_token },
                    type: "POST",
                    url: config.APP.API_HOST + "/api/accounts/resend-activation",
                    crossDomain: true,
                    data: data,
                    // xhrFields withCredentials will auto set cookies and session data on the request
                    // This is necessary for validating csrf token on server side.
                    xhrFields: {
    					withCredentials: true
					},
                    success: function (data) {
                        console.log(data);                       
                        // do something with server response data
                    }                
                }).fail(function( jqXHR, textStatus ) {
                    // Error that rises when there is a server error
                    // Or if there is simply an HTTP error that is raised with the request
                    alert( "Request failed: " + textStatus );
                });
			//});
		}
	}
});
