import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['kitbuilder'],
    sampleTypes: ['Kick Drums', 'Snare Drums', 'Claps', 'Loops', 'Percussion', 'Sound FX'],
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
                    totalTags.push(tags[tagIndex].name);
                }
            }
        }
        return totalTags;
    }.property('kits'),
    descriptionHidden: true,
    filteredSamples: Ember.computed.filter('currentKit.samples', function (sample){
        if (this.get('selectedSampleType')){
            var selected = this.get('selectedSampleType');
            if (selected === "Kick Drums"){
                selected = 'KD';
            } else if (selected === "Sound FX") {
                selected = 'FX'
            }
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
        setCurrent: function (kit){
            this.set('selectedSampleType', null);
            this.set('currentKit', kit);
            this.set('currentKitImage', 'http://127.0.0.1:8000' + kit._data.image);
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
        },
        resetMixitup: function (){
            Ember.$('#kitmix').mixItUp('destroy', true);
            var checkboxFilter = {

                // Declare any variables we will need as properties of the object

                $filters: null,
                $reset: null,
                groups: [],
                outputArray: [],
                outputString: '',

                // The "init" method will run on document ready and cache any jQuery objects we will need.

                init: function(filterElement, resetElement, container){
                    var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "checkboxFilter" object so that we can share methods and properties between all parts of the object.

                    self.$filters = Ember.$(filterElement);
                    self.$reset = Ember.$(resetElement);
                    self.$container = Ember.$(container);

                    self.$filters.find('fieldset').each(function(){
                        self.groups.push({
                            $inputs: Ember.$(this).find('input'),
                            active: [],
                            tracker: false
                        });
                    });

                    self.bindHandlers();
                },

                // The "bindHandlers" method will listen for whenever a form value changes.

                bindHandlers: function(){
                    var self = this;

                    self.$filters.on('change', function(){
                        self.parseFilters();
                    });

                    self.$reset.on('click', function(e){
                        e.preventDefault();
                        self.resetFilters();
                        self.parseFilters();
                    });
                },

                // Custom reset Function since we are not using a Form To Perform Filter operation.

                resetFilters: function (){
                    var self = this;

                    // loop through each filter group and add active filters to arrays

                    for(var i = 0, group; group = self.groups[i]; i++){
                        group.$inputs.each(function(){
                            Ember.$(this).prop('checked', false);
                        });
                    }
                },

                // The parseFilters method checks which filters are active in each group:

                parseFilters: function(){
                    var self = this;

                    // loop through each filter group and add active filters to arrays

                    for(var i = 0, group; group = self.groups[i]; i++){
                        group.active = []; // reset arrays
                        group.$inputs.each(function(){
                            Ember.$(this).is(':checked') && group.active.push(this.value);
                        });
                        group.active.length && (group.tracker = 0);
                    }

                    self.concatenate();
                },

                // The "concatenate" method will crawl through each group, concatenating filters as desired:

                concatenate: function(){
                    var self = this,
                        cache = '',
                        crawled = false,
                        checkTrackers = function(){
                            var done = 0;

                            for(var i = 0, group; group = self.groups[i]; i++){
                                (group.tracker === false) && done++;
                            }

                            return (done < self.groups.length);
                        },
                        crawl = function(){
                            for(var i = 0, group; group = self.groups[i]; i++){
                                group.active[group.tracker] && (cache += group.active[group.tracker]);

                                if(i === self.groups.length - 1){
                                    self.outputArray.push(cache);
                                    cache = '';
                                    updateTrackers();
                                }
                            }
                        },
                        updateTrackers = function(){
                            for(var i = self.groups.length - 1; i > -1; i--){
                                var group = self.groups[i];

                                if(group.active[group.tracker + 1]){
                                    group.tracker++;
                                    break;
                                } else if(i > 0){
                                    group.tracker && (group.tracker = 0);
                                } else {
                                    crawled = true;
                                }
                            }
                        };

                    self.outputArray = []; // reset output array

                    do{
                        crawl();
                    }
                    while(!crawled && checkTrackers());

                    self.outputString = self.outputArray.join();

                    // If the output string is empty, show all rather than none:

                    !self.outputString.length && (self.outputString = 'all');

                    console.log(self.outputString);

                    // ^ we can check the console here to take a look at the filter string that is produced

                    // Send the output string to MixItUp via the 'filter' method:

                    if(self.$container.mixItUp('isLoaded')){
                        self.$container.mixItUp('filter', self.outputString);
                    }
                }
            };
            // END CHECKBOX FILTER
            checkboxFilter.init("#KitFilter", '#Reset', '#kitmix');

            // Instantiate MixItUp

            var $container = Ember.$('#kitmix');

            if(!$container.mixItUp('isLoaded')){
                $container.mixItUp({
                    controls: {
                        enable: false // we won't be needing these
                    },
                    animation: {
                        easing: 'cubic-bezier(0.86, 0, 0.07, 1)',
                        duration: 600
                    }
                });
            }

        }
    }
});
