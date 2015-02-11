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
    audio: function () {
        return 'http://127.0.0.1:8000' + this.get('sample.demo');
    }.property('sample'),
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
        },
        playSample: function (){
            var sample = this.get('sample');
//            var mediaElement = Ember.$("#"+sample._data.name+"-audio");
//            mediaElement.trigger("play");
            var mediaElement = document.getElementById(sample._data.name+"-audio");
            mediaElement.play();
        }
    }
});
