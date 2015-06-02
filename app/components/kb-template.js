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
			var self = this;
			var template = this.get('template');
			swal(
				{
				  title: "Are you sure?",
				  text: "You will not be able to recover this imaginary file!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  closeOnConfirm: true
				}, function () {
					// swal("Deleted!", "Your template has been deleted.", "success");					
					self.sendAction('deleteTemplate', template);				  					  
				}
			);
		},
		loadTemplate: function (){
			var template = this.get('template');
			var kitbuilderController = this.get('controllers.kitbuilder');
			kitbuilderController.store.fetchById('kitbuilder-template', template.id).then(function (template){
				kitbuilderController.set('currentTemplate', template);
				kitbuilderController.set('kitName', template.get('name'));
				template.get('samples').then(function (samples) {
					kitbuilderController.set('isDirty', false);
					kitbuilderController.set('chosenSamples', samples);
					kitbuilderController.transitionToRoute('your-kit');
				});								
			});			
		}
	}
});
