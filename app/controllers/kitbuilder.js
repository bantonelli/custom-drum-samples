/**
 * Created by brandonantonelli on 2/2/15.
 */
import Ember from 'ember';

export default Ember.ArrayController.extend({
    appId: 'Kit Builder',
    appRoutes: [
        {route: 'sound-selection', displayLink: 'Sound Selection'},
        {route: 'your-kit', displayLink: 'Your Custom Kit'},
        {route: 'kb-checkout', displayLink: 'Checkout'}
    ],
    chosenSamples: [],
    samplesChosen: Ember.computed('chosenSamples', function(key, value) {
        // if (this.get('purchased')){
        //     return [];
        // } else {
            return this.get('chosenSamples');
        // }        
    }),
    activeFilters: [],
    filterString: "all",
    kitName: null,
    currentTemplate: null,
    isTemplateOwner: Ember.computed('kitName', 'currentTemplate', function (){
      isOwner = true;
      var currentTemplate = this.get('currentTemplate');
      var currentUser = this.get('session.content.user_id');
      var currentName = this.get('kitName');
      if (currentTemplate){
        var currentTemplateOwner = currentTemplate.get('user.id');
        if ((currentTemplateOwner === currentUser) || (currentName !== currentTemplate.get('name'))){
          isOwner = true;
        } else {
          isOwner = false;
        }
      }
      return isOwner;
    }),
    actions: {
      saveAsTemplate: function (){
        var self = this;
        if (self.get('kitName')){
          if (self.get('isTemplateOwner')){
            var templateSaved = false;
            var userID = self.get('session.content.user_id');
            var currentTemplate = self.get('currentTemplate');
            var onSuccess = function(template) {
              console.log('Template saved successfully');
              templateSaved = true;
              self.set('currentTemplate', template);
            };
            var onFail = function(template) {
              console.log('Template not saved!');
            };
            if (currentTemplate == null) {
              var templateToSave = {
                name: self.get('kitName'),
                user: userID,
                samples: self.get('samplesChosen')
              };
              var newTemplate = self.store.createRecord('kitbuilder-template', templateToSave);
              newTemplate.save().then(onSuccess, onFail);
              
            } else {
              var templateToSave = self.get('currentTemplate');
              var currentName = self.get('kitName');
              var currentSamples = self.get('samplesChosen');
              if (currentName !== templateToSave.get('name')) {
                templateToSave = {
                  name: self.get('kitName'),
                  user: userID,
                  samples: self.get('samplesChosen')
                };
                var newTemplate = self.store.createRecord('kitbuilder-template', templateToSave);
                newTemplate.save().then(onSuccess, onFail);
              } else {
                templateToSave.set('name', currentName); 
                templateToSave.set('samples', currentSamples);
                templateToSave.save().then(onSuccess, onFail);
              }
              // templateToSave.save().then(transitionToPost).catch(failure);
            }
            if (templateSaved) {
              self.set('isDirty', false);
            }
          } else {
            swal({
              title: "Error!",
              text: "You have to change the name of a followed template to save it as your own!",
              type: "error",
              confirmButtonText: "OK"
            });     
          }
        } else {
             swal({
              title: "Error!",
              text: "You have to enter a name for your template!",
              type: "error",
              confirmButtonText: "OK"
            });    
        }
      }
    }
});