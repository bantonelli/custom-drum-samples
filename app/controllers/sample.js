import Ember from 'ember';

export default Ember.ObjectController.extend({
    needs: ['kitbuilder'],
    isChosen: function () {
        var chosenSamples = this.get('controllers.kitbuilder.samplesChosen');
        if (chosenSamples.indexOf(this.model) === -1){
            return false;
        } else {
            return true;
        }
    }.property('controllers.kitbuilder.samplesChosen'),
    actions: {
        checkSample: function (){
            var selector = "#"+this.model._data.name;
            var $input = Ember.$(selector);
            if (this.get('isChosen')){
                this.get('controllers.kitbuilder.samplesChosen').removeObject(this.model);
                this.set('isChosen', false);
                //sample.save();
                //$input.prop('checked', false);
            } else {
                this.set('isChosen', true);
                //sample.save();
                //$input.prop('checked', true);
                //chosenSamples.pushObject(this.model);
                this.get('controllers.kitbuilder.samplesChosen').pushObject(this.model);
            }
        },
        removeSample: function () {
//            var selector = "#"+sample._data.name+"-chosen";
//            Ember.$(selector).remove();
            this.set('isChosen', false);
            var chosenSamples = this.get('controllers.kitbuilder.samplesChosen');
            chosenSamples.removeObject(this.model);
        }
    }
});
