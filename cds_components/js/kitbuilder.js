/**
 * Created by brandonantonelli on 12/18/14.
 */

( function () {

    var app = angular.module("kitbuilder", []);

    app.controller("defaultCtrl",['$scope', '$http', function ($scope, $http) {

        var config = {
            headers: {
                Authorization: "Bearer rbY67hpqxtFEGGumpMFOQIPwsXu90p"
            }
        };

        $scope.loadData = function () {
            $http.get("/api/kits/?format.json", config).success(function (data) {
                $scope.products = data;
            });
        };
    }]);

    app.controller("TabController", ['$rootScope', function ($rootScope) {

        $rootScope.currentTab = 1;

        this.isSelected = function (tab) {
            return tab === $rootScope.currentTab;
        };

        this.tabSelect = function (tab){
            $rootScope.currentTab = tab;
        };

    }]);

    app.controller("SlideController", ['$rootScope', function ($rootScope){

        this.isSelected = function (tab) {
            return $rootScope.currentTab === tab;
        };

    }]);

    app.controller("FilterController", ['$rootScope', function ($rootScope) {

        // Kit Selection
        this.tagsVisible = false;
        this.newKits = false;
        this.alphabetical = false;
        this.onSale = false;
        this.kits = kitTestData;

        // Finish Coding this
        this.getTags = function () {
            var totalTags = [];
            for (var kit = 0; kit < this.kits.length; kit++){
                var tags = this.kits[kit].tags;
                for (var tagIndex = 0; tagIndex < tags.length; tagIndex++) {
                    if ($.inArray(tags[tagIndex], totalTags) === -1) {
                        totalTags.push(tags[tagIndex]);
                    }
                }
            }
            return totalTags;
        };

        this.tags = this.getTags();

        // Sample Selection
        this.description = false;
        this.currentKit = this.kits[0];

        this.showDescription = function () {
            this.description = !(this.description);
        };

        this.setCurrent = function (kit) {
            this.currentKit = kit;
        };

        this.showNewKits = function () {
            this.newKits = !(this.newKits);
        };

        this.showAlphabetical = function () {
            this.alphabetical = !(this.alphabetical);
        };

        this.showOnSale = function () {
            this.onSale = !(this.onSale);
        };

        this.showTags = function () {
            this.tagsVisible = !(this.tagsVisible);
        };

    }]);

// To keep our code clean and modular, all custom functionality will be contained inside a single object literal called "checkboxFilter".

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

            self.$filters = $(filterElement);
            self.$reset = $(resetElement);
            self.$container = $(container);

            self.$filters.find('fieldset').each(function(){
                self.groups.push({
                    $inputs: $(this).find('input'),
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
                    $(this).prop('checked', false);
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
                    $(this).is(':checked') && group.active.push(this.value);
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

            //console.log(self.outputString);

            // ^ we can check the console here to take a look at the filter string that is produced

            // Send the output string to MixItUp via the 'filter' method:

            if(self.$container.mixItUp('isLoaded')){
                self.$container.mixItUp('filter', self.outputString);
            }
        }
    };

// On document ready, initialise our code.

    $(function(){

        // Initialize checkboxFilter code

        checkboxFilter.init("#KitFilter", '#Reset', '#kitmix');

        // Instantiate MixItUp

        $('#kitmix').mixItUp({
            controls: {
                enable: false // we won't be needing these
            },
            animation: {
                easing: 'cubic-bezier(0.86, 0, 0.07, 1)',
                duration: 600
            }
        });
    });

})();