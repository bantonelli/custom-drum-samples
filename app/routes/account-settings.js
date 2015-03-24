import Ember from 'ember';
import config from '.././config/environment';


export default Ember.Route.extend({
	model: function() {
		var user_id = this.get('session.content.user_id');
		return this.store.find('user-profile', user_id);
	},
	setupController: function(controller, model) {
		// This function is called when the route loads
		// The ajax call sends the uid and token in the URL to the server to
			// complete the account activation process
        controller.set("model", model);
    }
});