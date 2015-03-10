import Ember from 'ember';
import config from '.././config/environment';


export default Ember.Component.extend({
    _initializeSampleToggler: function (){
        var sample = this.get('sample');
        //var clickElement = Ember.$("#"+sample._data.name + "-play");
        var clickElement = document.getElementById(sample._data.name + "-play");
        var mediaElement = document.getElementById(sample._data.name + "-audio");
        if (mediaElement) {
            mediaElement.addEventListener('pause', function () {
                //console.log(clickElement);
                clickElement.classList.add('icon-play');
                clickElement.classList.remove('icon-pause');
                //console.log('playing');
            });
            mediaElement.addEventListener('playing', function () {
                //console.log(clickElement);
                clickElement.classList.add('icon-pause');
                clickElement.classList.remove('icon-play');
                //console.log('playing');
            });
        }
        var clickElement2 = document.getElementById(sample._data.name + "-play-2");
        var mediaElement2 = document.getElementById(sample._data.name + "-audio-2");
        if (mediaElement2) {
            mediaElement2.addEventListener('pause', function () {
                //console.log(clickElement);
                clickElement2.classList.add('icon-play');
                clickElement2.classList.remove('icon-pause');
                //console.log('playing');
            });
            mediaElement2.addEventListener('playing', function () {
                //console.log(clickElement);
                clickElement2.classList.add('icon-pause');
                clickElement2.classList.remove('icon-play');
                //console.log('playing');
            });
        }
    }.on('didInsertElement'),
    isChosen: function () {
        var chosenSamples = this.get('chosenSamples');
        if (chosenSamples.indexOf(this.get('sample')) === -1){
            return false;
        } else {
            return true;
        }
    }.property('chosenSamples@each'),
    typeMatches: function (){
        if (this.get('sampleType') == this.get('sample.type')) {
            return true;
        } else {
            return false;
        }
    }.property('sampleType'),
    audio: function () {
        return config.APP.API_HOST + this.get('sample.demo');
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
        playSample: function () {
            var sample = this.get('sample');
//            var mediaElement = Ember.$("#"+sample._data.name+"-audio");
//            mediaElement.trigger("play");

            var mediaElement = document.getElementById(sample._data.name + "-audio");
            if (!mediaElement) {
                mediaElement = document.getElementById(sample._data.name + "-audio-2");
            }

            if (mediaElement.paused && mediaElement.currentTime > 0 && !mediaElement.ended) {
                mediaElement.play();
            }
            else if (mediaElement.currentTime > 0 && !mediaElement.paused) {
                mediaElement.pause();
            }
            else {
                mediaElement.play();
            }
        }
    }
});
