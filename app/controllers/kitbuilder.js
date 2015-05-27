/**
 * Created by brandonantonelli on 2/2/15.
 */
import Ember from 'ember';
import config from '.././config/environment';

export default Ember.ArrayController.extend({
    appId: 'Kit Builder',
    appRoutes: [
        {route: 'sound-selection', displayLink: 'Sound Selection'},
        {route: 'your-kit', displayLink: 'Your Custom Kit'},
        {route: 'kb-checkout', displayLink: 'Checkout'}
    ],
    chosenSamples: [],
    samplesChosen: Ember.computed('chosenSamples', 'currentTemplate', function (){
      if (this.get('currentTemplate')){
        return this.get('currentTemplate.samples');
      } else {
        return this.get('chosenSamples');
      }
    }),
    samplesChosenIds: Ember.computed.mapBy('chosenSamples', 'id'),
    activeFilters: [],
    filterString: "all",
    isDirty: false,
    startSave: false,
    kitName: null,
    currentTemplate: null,
    currentTemplateOwner: Ember.computed('currentTemplate', function (){
      return this.get('currentTemplate.user.id');
    }),
    nameChange: Ember.computed('currentTemplate', 'kitName', function (){
      if ((this.get('currentTemplate') == null) || (!this.get('kitName'))) {
        // When there is no template loaded - show the save As function
        // Also, when there is no name input - show the save As function
        return true;

      }
      // Otherwise if the kitName is different from the loaded template's name - show the save As function
      return this.get('currentTemplate.name') !== this.get('kitName');
    }),
    isTemplateOwner: Ember.computed('kitName', 'currentTemplate', 'session.content.user_id', function (){
      var isOwner = true;
      var self = this;
      var currentTemplateOwner = this.get('currentTemplateOwner');
      var currentUser = self.get('session.content.user_id');        
      var currentName = this.get('kitName');
      if (currentTemplateOwner && currentName) {
        // At this point currentTemplateOwner is a string that is an integer.
        // use parseInt to convert it to a number.
        if (parseInt(currentTemplateOwner) === currentUser) {
          isOwner = true;
        } else {
          isOwner = false;
        }        
      }
      return isOwner;
    }),
    actions: {
      toggleSaveDialog: function () {
        this.set('startSave', !(this.get('startSave')));
      },
      saveTemplate: function () {
        var self = this;
        var templateSaved = false; 
        var onSuccess = function() {
          console.log('Template saved successfully');
          templateSaved = true;
          if (templateSaved) {
            // At this point if the template is saved successfully 
              // set dirty to false and close save dialog 
            self.set('isDirty', false);
            self.set('startSave', false);
          }          
        };
        var onFail = function(template) {
          console.log('Template not saved!');
        };
        if (this.get('isTemplateOwner')){
          var templateToSave = this.get('currentTemplate');
          // templateToSave.set('samples', this.get('samplesChosen'));
          templateToSave.save().then(onSuccess, onFail);
        } else {
          swal({
            title: "Error!",
            text: "You do not own this template. However, you can change the name and then save it as your own.",
            type: "error",
            confirmButtonText: "OK"
          });    
        }       
      },
      saveTemplateAs: function (){
        var self = this;
        var templateSaved = false;
        var userID = self.get('session.content.user_id');
        var currentTemplate = self.get('currentTemplate');
        
        /* PROMISE FUNCTIONS (to be used later) */
        var onFail = function(template) {
          console.log('Template not saved!');
        };
        var setCurrentTemplate = function (template) {
            // This function is run after the ajax call returns a successful transaction
            // It takes the returned object uses the store to find that object
              // and then takes the store's model object and sets it as the current template.
            self.store.find('kitbuilder-template', template.id).then(function (template){
              self.set('currentTemplate', template);
              console.log('Template saved successfully');
              templateSaved = true;
              if (templateSaved) {
                // At this point if the template is saved successfully 
                  // set dirty to false and close save dialog 
                self.set('isDirty', false);
                self.set('startSave', false);
              }
            });                
        };

        /* END PROMISE FUNCTIONS */  
        if (self.get('kitName')) {
          var samplesIDArray = self.get('samplesChosenIds');
          var kitName = self.get('kitName');
          var baseUrl = config.APP.API_HOST + '/' + config.APP.API_NAMESPACE + '/';
          var url = baseUrl + 'kitbuilder/templates/';         
          var templateToSave = {
            name: kitName,
            user: userID,
            samples: samplesIDArray            
          };              
          Ember.$.ajax({
            type: "POST",
            url: url,
            crossDomain: true,
            data: JSON.stringify(templateToSave),
            contentType: "application/json",
            dataType: "json"
          }).then(setCurrentTemplate, onFail);              
          if (templateSaved) {
            // At this point if the template is saved successfully 
              // set dirty to false and close save dialog 
            self.set('isDirty', false);
            self.set('startSave', false);
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