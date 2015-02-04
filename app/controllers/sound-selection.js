import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['kitbuilder'],
    selectedSampleType: null,
    sampleTypes: ['Kick Drums', 'Snare Drums', 'Claps', 'Hi Hats', 'Percussion', 'Sound FX'],
    tagsHidden: true,
    newKits: false,
    alphabetical: false,
    onSale: false,
    kits: Ember.computed.alias('model'),
    tags: function () {
        var kits = this.get('kits.content');
        var totalTags = [];
        for (var kit = 0; kit < kits.length; kit++){
            var tags = kits[kit].get('tags');
            for (var tagIndex = 0; tagIndex < tags.length; tagIndex++) {
                if (Ember.$.inArray(tags[tagIndex], totalTags) === -1) {
                    totalTags.push(tags[tagIndex]);
                }
            }
        }
        return totalTags;
    }.property('kits'),
    descriptionHidden: true,
    currentKit: function () {
        return this.get('kits')[0];
    },
    actions: {
        showDescription: function (){
            this.set('descriptionHidden', !(this.get('descriptionHidden')));
        },
        setCurrent: function (kit){
            this.set('currentKit', kit);
        },
        showNewKits: function () {
            this.set('newKits', !(this.get('newKits')));
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
