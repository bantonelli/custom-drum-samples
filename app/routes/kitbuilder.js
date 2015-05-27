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
        return this.store.findAll('vendor-kit');
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
    }
});
