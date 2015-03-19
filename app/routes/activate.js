import Ember from 'ember';
import config from '.././config/environment';

export default Ember.Route.extend({
	model: function(params) {
	// the server returns `{ id: 12 }`
	// {uid}/{token}
		return {uid: params.uid, token: params.token};
	},
	serialize: function(model) {
	// this will make the URL `/posts/12`
		return { uid: model.uid, token: model.token };
	},
	setupController: function(controller, model) {
        alert('called setupController method');
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
		    url: config.APP.API_HOST + "/api/accounts/activate",
		    crossDomain: true,
		    data: data,
		    success: function (data) {
		        console.log(data);
		    }                
		}).fail(function( jqXHR, textStatus ) {
		    // Error that rises when there is a server error
		    // Or if there is simply an HTTP error that is raised with the request
		    alert( "Request failed: " + textStatus );
		});
        controller.set("model",data);
    }
});
