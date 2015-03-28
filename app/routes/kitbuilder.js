import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function() {
        // default behavior, renders the home template
        this.render();
        this.render('appnav', { // render the `appnav` template
            into: 'application', // into the `application` template
            outlet: 'appnav', // using the outlet named `appnav`
            controller: 'kitbuilder' // the controller to use for this template, referenced by name
        });
    },
    model: function (){
        return this.store.find('kit');
    },
    beforeModel: function(transition) {
        if (this.get('session.isAuthenticated')) {
            this.transitionTo('kitbuilder');
        } else {
            var loginController = this.controllerFor('application');
            //var currentRoute = loginController.get('currentRoute');
            // cRoute is the actual url string of the current route.
            var cRoute = this.get('router.url');
            loginController.set('previousTransition', transition);
            this.transitionTo( cRoute + '?login=true');            
        }
    }
});
