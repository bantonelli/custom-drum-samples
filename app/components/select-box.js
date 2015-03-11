import Ember from 'ember';

export default Ember.Component.extend({
    _initializeSampleToggler: function (){
        //Ember.run.sync();
        // init logic
    }.on('didInsertElement'),
    sampleTypes: Ember.computed.mapBy('currentKit.samples', 'type'),
    actions: {
        selectType: function (type){
            this.set('selectedSampleType', type);
        }
    }
});
