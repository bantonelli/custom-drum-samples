import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		var user_id = this.get('session.content.user_id');
		return this.store.find('user-profile', 1);
	},
	setupController: function(controller, model) {
		// This function is called when the route loads
		// The ajax call sends the uid and token in the URL to the server to
			// complete the account activation process
        controller.set("model", model);
    }
});

// When using store.find we have to run setupController hook.
