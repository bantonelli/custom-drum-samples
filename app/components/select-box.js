import Ember from 'ember';

export default Ember.Component.extend({
    _initializeSelectBox: function (){
        //Ember.run.sync();
        // init logic
    }.on('didInsertElement'),
    sampleTypes: Ember.computed.mapBy('currentKit.samples', 'type'),
    uniqueSampleTypes: Ember.computed.uniq('sampleTypes'),
    renderedSampleTypes: Ember.computed.map('uniqueSampleTypes', function(type, index) {
    	return type + 's';
  	})
});
