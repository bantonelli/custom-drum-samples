import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['kitbuilder'],
    customKitName: null,
    chosenSampleTypes: function () {
        return this.get('controllers.kitbuilder.samplesChosen').mapBy('_data.type');
    }.property('controllers.kitbuilder.samplesChosen.@each'),
    uniqueSampleTypes: Ember.computed.uniq('chosenSampleTypes')
});
