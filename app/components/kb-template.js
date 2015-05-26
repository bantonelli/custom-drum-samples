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
		deleteTemplate: function (){
			if(confirm('Are you sure?')){
				var store = this.get('controllers.kitbuilder.store');
				var template = this.get('template');
				store.find('kitbuilder-template', template.id).then(function (record) {
					record.destroyRecord(); // => DELETE to /templates/id
				});
			}
		},
		loadTemplate: function (){
			var template = this.get('template');
			var kitbuilderController = this.get('controllers.kitbuilder');
			kitbuilderController.store.find('kitbuilder-template', template.id).then(function (template){
				kitbuilderController.set('currentTemplate', template);
				kitbuilderController.set('kitName', template.get('name'));
				kitbuilderController.set('chosenSamples', template.get('samples'));				
				kitbuilderController.transitionToRoute('your-kit');
			});			
		}
	}
});
