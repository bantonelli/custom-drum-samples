import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['kitbuilder'],
    chosenSampleTypes: function () {
        return this.get('controllers.kitbuilder.samplesChosen').mapBy('_data.type');
    }.property('controllers.kitbuilder.samplesChosen.@each'),
    uniqueSampleTypes: Ember.computed.uniq('chosenSampleTypes'),
    hasKicks: Ember.computed('uniqueSampleTypes', function (){
    	if (this.get('uniqueSampleTypes').indexOf('Kick') === -1){
    		return false;
    	}
    	return true;
    }),
    hasSnares: Ember.computed('uniqueSampleTypes', function (){
    	if (this.get('uniqueSampleTypes').indexOf('Snare') === -1){
    		return false;
    	}
    	return true;
    }),
    hasClaps: Ember.computed('uniqueSampleTypes', function (){
    	if (this.get('uniqueSampleTypes').indexOf('Clap') === -1){
    		return false;
    	}
    	return true;
    }),
    hasOverheads: Ember.computed('uniqueSampleTypes', function (){
    	if (this.get('uniqueSampleTypes').indexOf('Overhead') === -1){
    		return false;
    	}
    	return true;
    }),
    hasPercussion: Ember.computed('uniqueSampleTypes', function (){
    	if (this.get('uniqueSampleTypes').indexOf('Percussion') === -1){
    		return false;
    	}
    	return true;
    }),
    hasEffects: Ember.computed('uniqueSampleTypes', function (){
    	if (this.get('uniqueSampleTypes').indexOf('Effect') === -1){
    		return false;
    	}
    	return true;
    }),    
    hasLoops: Ember.computed('uniqueSampleTypes', function (){
    	if (this.get('uniqueSampleTypes').indexOf('Loop') === -1){
    		return false;
    	}
    	return true;
    })
});

/*
        (KICK, 'Kick'),
        (SNARE, 'Snare'),
        (CLAP, 'Clap'),
        (OVERHEAD, 'Overhead'),
        (PERCUSSION, 'Percussion'),
        (SOUNDFX, 'Effect'),
        (LOOP, 'Loop'), 
*/