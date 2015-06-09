import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		// Get the checkout controller which has a variable that is the ID of the kit purchased
		var kbCheckout = this.controllerFor('kb-checkout');
		// Use that ID number to set the model for the Thank you route.
		var kitID = kbCheckout.get('purchasedKitID')
		// The model will be a custom-kit object.
		return this.store.find('kitbuilder-purchase', kitID);
	},
	setupController: function(controller, model) {
		// This function is called when the route loads
		// The ajax call sends the uid and token in the URL to the server to
			// complete the account activation process
        controller.set("model", model);
    }
});
