import Ember from 'ember';

export default Ember.Component.extend({
    isChosen: function () {
        var chosenSamples = this.get('chosenSamples');
        if (chosenSamples.indexOf(this.get('sample')) === -1){
            return false;
        } else {
            return true;
        }
    }.property('chosenSamples@each'),
    actions: {
        checkSample: function () {
            if (this.get('isChosen')) {
                this.get('chosenSamples').removeObject(this.get('sample'));
                this.set('isChosen', false);
            } else {
                this.set('isChosen', true);
                this.get('chosenSamples').pushObject(this.get('sample'));
            }
        },
        removeSample: function () {
            this.set('isChosen', false);
            this.get('chosenSamples').removeObject(this.get('sample'));
        }
    }
});
