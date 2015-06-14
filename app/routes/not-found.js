import Ember from 'ember';

export default Ember.Route.extend({
  redirect: function () {
    var url = this.router.location.formatURL('/not-found');
    if (window.location.pathname !== url) {
      this.transitionTo('/not-found');
    }
  }
});


// Also any route having a hook (e.g. model, beforeModel, afterModel) that results in a rejected promise, 
	// can use the error action to transition to the 404.
// actions: {
//   error: function (error) {
//     Ember.Logger.error(error);
//     this.transitionTo('/not-found');
//   }
// }