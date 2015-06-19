import Ember from 'ember';
import config from '.././config/environment';
var swal = window.sweetAlert;

export default Ember.Route.extend({
	// renderTemplate: function() {
 //    	this.render({ 
 //    		into: 'account-settings',
 //    		outlet: 'update-info' 
 //    	});
 //  	},
	model: function(params) {
		// params are the query parameters in the URL
		// {uid}/{token}
		return {uid: params.uid, token: params.token};
	},
	serialize: function(model) {
		// this will make the URL `/activate/{uid}/{token}`
		return { uid: model.uid, token: model.token };
	},
	setupController: function(controller, model) {
		// This function is called when the route loads
		// The ajax call sends the uid and token in the URL to the server to
			// complete the account activation process
		var self = this;
        var data = {
        	uid: model.uid,
        	token: model.token
        };

		Ember.$.ajax({
		    // beforeSend: function(xhr) {
		    //     var csrftoken = getCookie('mycsrftoken');
		    //     xhr.setRequestHeader("X-CSRFToken", csrftoken);
		    // },
		    type: "POST",
		    url: config.APP.API_HOST + "/" + config.APP.API_NAMESPACE + "/accounts/update/confirm",
		    crossDomain: true,
		    data: data,
		    success: function (data) {
	            // ********* ALERT ******** //              
	            swal({
						title: "Success!",
						text: "Your Account Information has been updated!",
						type: "success",
						confirmButtonText: "OK"
		            },
					function(){
				  		self.transitionTo('account-settings');		        
					}
				);	            
		    }                
		}).fail(function( jqXHR, textStatus ) {
		    // Error that rises when there is a server error
		    // Or if there is simply an HTTP error that is raised with the request
            // ********* ALERT ******** //              
            swal({
	              title: "Error(s)!",
	              text: textStatus,
	              type: "error",
	              confirmButtonText: "OK"
	            }
            );
		});
        controller.set("model",data);
    }
});