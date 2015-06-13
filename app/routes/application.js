/**
 * Created by brandonantonelli on 1/22/15.
 */
import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

// Use application Route mixin to support session injection
export default Ember.Route.extend(ApplicationRouteMixin, {
    setupScrollToOutlet: function() {
        Ember.run.scheduleOnce('afterRender', this, function(){
            var position = this.$().offset().top;
            Ember.$('.slide').scrollTo(0, position);
        });
    }.on('didInsertElement'),
    actions: {
	    sessionAuthenticationSucceeded: function (){
    	// Override this method so that it doesn't try to route back to index automatically after
    	// login
	  		// var _this = this;
			// var applicationController = _this.controllerFor('application');
			// setTimeout(function(){
			// 	var previousTransition = applicationController.get('previousTransition');
			// 	if (previousTransition) {
			// 	  applicationController.set('previousTransition', null);
			// 	  previousTransition.retry();
			// 	} else {
			// 	  // Default back to homepage
			// 	  _this.transitionToRoute('application.index');
			// 	}
			// }, 600);
		}    	
    }   
});
