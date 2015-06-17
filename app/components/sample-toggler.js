import Ember from 'ember';
import config from '.././config/environment';


export default Ember.Component.extend({
    _initializeSampleToggler: function (){
        var self = this;
        var sample = this.get('sample');
        var computedIndex = this.get('computedIndex');
        var indexElement = Ember.$("[tabindex=" + computedIndex + "]");

        //var clickElement = Ember.$("#"+sample._data.name + "-play");
        var clickElement = document.getElementById(sample._data.name + "-play");
        var mediaElement = document.getElementById(sample._data.name + "-audio");
        if (mediaElement) {
            self.set('mediaElement', mediaElement);
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
            // console.log(indexElement);
            if (indexElement){
                indexElement.focusin(function (){                    
                    clickElement.classList.remove("no-click-sample");
                    clickElement.classList.add("click-sample");
                });
                indexElement.focusout(function (){
                    clickElement.classList.add("no-click-sample");
                    clickElement.classList.remove("click-sample");
                });
            }            
        }
        var clickElement2 = document.getElementById(sample._data.name + "-play-2");
        var mediaElement2 = document.getElementById(sample._data.name + "-audio-2");
        if (mediaElement2) {
            self.set('mediaElement', mediaElement2);
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
            // console.log(indexElement);
            if (indexElement){
                indexElement.focusin(function (){                    
                    clickElement2.classList.remove("no-click-sample");
                    clickElement2.classList.add("click-sample");
                });
                indexElement.focusout(function (){
                    clickElement2.classList.add("no-click-sample");
                    clickElement2.classList.remove("click-sample");
                });
            }
        }
    }.on('didInsertElement'),
    _destroySampleToggler: function (){
        // var mediaElement = this.get('mediaElement');
        // mediaElement.removeEventListener('pause', function () {
        // });
        // mediaElement.removeEventListener('playing', function () {
        // });
    }.on('willDestroyElement'),
    computedIndex: Ember.computed('index', function () {
        return this.get('index') + 1;
    }),
    alreadyPurchased: Ember.computed('kitbuilderController.samplesPurchased.@each', function () {
        var sample_id = parseInt(this.get('sample.id'));
        var samplesPurchased = this.get('kitbuilderController.samplesPurchased');
        return samplesPurchased.contains(sample_id);
    }),
    isChosen: function () {
        var chosenSamples = this.get('chosenSamples');
        if (chosenSamples.indexOf(this.get('sample')) === -1){
            return false;
        } else {
            return true;
        }
    }.property('chosenSamples@each'),
    typeMatches: Ember.computed('sampleType', function (){
        if (this.get('sampleType') === this.get('sample.type')) {
            return true;
        } else {
            return false;
        }
    }),
    audio: function () {
        return this.get('sample.preview');
    }.property('sample'),
    actions: {
        checkSample: function () {
            var sample = this.get('sample');
            if (this.get('isChosen')) {
                this.get('chosenSamples').removeObject(sample);
                this.set('isChosen', false);
            } else {
                this.set('isChosen', true);
                this.get('chosenSamples').pushObject(sample);
            }            
            this.set('kitbuilderController.isDirty', true);                 
        },
        removeSample: function () {
            var sample = this.get('sample');            
            // this.set('isChosen', false);            
            this.set('kitbuilderController.isDirty', true);    
            this.get('chosenSamples').removeObject(sample);            
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
        },
        playSampleImmediate: function (){
            var sample = this.get('sample');
//            var mediaElement = Ember.$("#"+sample._data.name+"-audio");
//            mediaElement.trigger("play");

            var mediaElement = document.getElementById(sample._data.name + "-audio");
            if (!mediaElement) {
                mediaElement = document.getElementById(sample._data.name + "-audio-2");
            }
            mediaElement.currentTime = 0;
            mediaElement.play();
            // set pointer events default.
            var clickElement = document.getElementById(sample._data.name + "-play");
            if (!clickElement) {
                clickElement = document.getElementById(sample._data.name + "-play-2");
            }
            clickElement.classList.add('click-sample');
            clickElement.classList.remove('no-click-sample');
            // set pointer events to none;
        }
    }
});
