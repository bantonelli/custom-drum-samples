import Ember from 'ember';

export default Ember.Route.extend({
	renderTemplate: function() {
        // default behavior, renders the home template
        this.render();
        this.render('appnav', { // render the `appnav` template
            into: 'application', // into the `application` template
            outlet: 'appnav', // using the outlet named `appnav`
            controller: 'template-browser' // the controller to use for this template, referenced by name
        });
    },
    model: function (){
        return this.store.findAll('kitbuilder-template');
    }
});