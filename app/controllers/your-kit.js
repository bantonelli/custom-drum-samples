import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['kitbuilder'],
    customKitName: null,
    actions: {
        removeSample: function (sample) {
//            var selector = "#"+sample._data.name+"-chosen";
//            Ember.$(selector).remove();
            sample.set('is_chosen', false);
            sample.save();
            var chosenSamples = this.get('controllers.kitbuilder.samplesChosen');
            chosenSamples.removeObject(sample);
        }
    }
});
