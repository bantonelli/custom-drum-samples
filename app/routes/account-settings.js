import Ember from 'ember';
import config from '.././config/environment';


export default Ember.Route.extend({
	model: function() {
		var user_id = this.get('session.content.user_id');
		return this.store.fetchById('user-profile', user_id);
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
        if (_this.get('session.isAuthenticated') && (_this.get('router.url') === '/account')) {
            _this.transitionTo('account-settings');
        } else if (_this.get('session.isAuthenticated') && (_this.get('router.url') !== '/account')) {
            return;
        } else {
            transition.abort();            
            var loginController = _this.controllerFor('application');
            //var currentRoute = loginController.get('currentRoute');
            // cRoute is the actual url string of the current route.
            // var cRoute = _this.get('router.url');
            loginController.set('previousTransition', transition);
            loginController.transitionToRoute( '/' + '?login=true');            
        }
    }
});