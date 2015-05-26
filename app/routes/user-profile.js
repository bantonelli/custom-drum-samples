import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		var user_id = this.get('session.content.user_id');
		var profile = this.store.fetchById('user-profile', user_id);
		return profile;
	},
	setupController: function(controller, model) {
		// This function is called when the route loads
		// The ajax call sends the uid and token in the URL to the server to
			// complete the account activation process
        controller.set("model", model);
    },
	actions: {
		deleteTemplate: function(template) {
			var self = this;			
			var user_id = this.get('session.content.user_id');						
			self.store.find('kitbuilder-template', template.id).then(function (record) {
				record.destroyRecord().then(function (){
					self.get('currentModel.kitbuilder_templates').removeObject(template);
				}); // => DELETE to /templates/id
			});
		}
	}
});

// When using store.find we have to run setupController hook.
