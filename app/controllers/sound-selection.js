import Ember from 'ember';
import config from '.././config/environment';

var soundSelectionController = Ember.Controller.extend({
    needs: ['kitbuilder'],
    currentKit: function (){
        return this.get('kits.content')[0];
    }.property('kits'),
    currentKitImage: function () {
        return config.APP.API_HOST + this.get('currentKit.image');
    }.property('currentKit'),
    selectedSampleType: null,
    tagsHidden: true,
    newKitsHidden: true,
    alphabetical: false,
    onSale: false,
    testProp1: false,
    testProp2: false,
    kits: Ember.computed.alias('model'),
    loadSoundCloud: false,
    tags: function () {
        var kits = this.get('kits.content');
        var totalTags = [];
        for (var kit = 0; kit < kits.length; kit++){
            var currentTags = kits[kit].get('tags');
            for (var tagIndex = 0; tagIndex < currentTags.length; tagIndex++) {
                if (totalTags.indexOf(currentTags[tagIndex].name) === -1) {
                //if (Ember.$.inArray(tags[tagIndex], totalTags) === -1) {
                    totalTags.push(currentTags[tagIndex].name);
                }
            }
        }
        return totalTags;
    }.property('kits'),
    descriptionHidden: true,
    // UPDATE TO BE DYNAMIC ALONG WITH SampleTypes
    filteredSamples: Ember.computed.filter('currentKit.samples', function (sample){
        if (this.get('selectedSampleType')){
            var selected = this.get('selectedSampleType');
            return selected === sample._data.type;
        }
        else{
            return false;
        }
    }).property('selectedSampleType', 'currentKit.samples'),
    actions: {
        showDescription: function (){
            this.set('descriptionHidden', !(this.get('descriptionHidden')));
        },
        // setCurrent: function (kit){
        //     this.set('selectedSampleType', null);
        //     this.set('currentKit', kit);
        //     //this.set('currentKitImage', 'http://127.0.0.1:8000' + kit._data.image);
        // },
        showNewKits: function () {
            this.set('newKitsHidden', !(this.get('newKitsHidden')));
        },
        showAlphabetical: function (){
            this.set('alphabetical', !(this.get('alphabetical')));
        },
        showOnSale: function () {
            this.set('onSale', !(this.get('onSale')));
        },
        showTags: function () {
            this.set('tagsHidden', !(this.get('tagsHidden')));
        },
        closeTags: function (){
            this.set('tagsHidden', true);
        },
        closeDescription: function () {
            this.set('descriptionHidden', true);
        }
    }
});

export default soundSelectionController;