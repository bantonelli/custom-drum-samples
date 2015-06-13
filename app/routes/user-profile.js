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
    beforeModel: function(transition) {
        var _this = this;
        _this._super(transition);
        if (_this.get('session.isAuthenticated')) {
            _this.transitionTo('kitbuilder');
        } else {
            transition.abort();            
            var loginController = _this.controllerFor('application');
            //var currentRoute = loginController.get('currentRoute');
            // cRoute is the actual url string of the current route.
            var cRoute = _this.get('router.url');
            loginController.set('previousTransition', transition);
            loginController.transitionToRoute( cRoute + '?login=true');            
        }
    },    
	actions: {
		deleteTemplate: function(template) {
			var self = this;			
			var user_id = this.get('session.content.user_id');
			self.get('currentModel.kitbuilder_templates').removeObject(template);
			self.store.find('kitbuilder-template', template.id).then(function (template) {
				template.destroyRecord();				
			});
		}
	}
});

// When using store.find we have to run setupController hook.
