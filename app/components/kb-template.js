import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['col-xs-12'],
	isEditing: false,
	actions: {
		editTemplate: function (){
			this.set('isEditing', true);
		},
		saveTemplate: function (){
	  		this.set('isEditing', false);
		},
		delete: function (){
			var template = this.get('template');
			if(confirm('Are you sure?')){
				this.sendAction('deleteTemplate', template);
			}
		},
		loadTemplate: function (){
			var template = this.get('template');
			var kitbuilderController = this.get('controllers.kitbuilder');
			kitbuilderController.store.find('kitbuilder-template', template.id).then(function (template){
				kitbuilderController.set('currentTemplate', template);
				kitbuilderController.set('kitName', template.get('name'));
				template.get('samples').then(function (samples) {
					kitbuilderController.set('chosenSamples', samples);
					kitbuilderController.transitionToRoute('your-kit');
				});								
			});			
		}
	}
});
