import Ember from 'ember';
import config from '.././config/environment';
import accounting from "accounting";
var swal = window.sweetAlert;


export default Ember.Controller.extend({
    needs: ['kitbuilder'],  
    purchasedKitID: null,   
    chosenSampleKits: function () {
        return this.get('controllers.kitbuilder.samplesChosen').mapBy('kit');
    }.property('controllers.kitbuilder.samplesChosen.@each'),    
    kitsChosen: Ember.computed('chosenSampleKits', 'controllers.kitbuilder.samplesChosen.@each', function (key, value){
    	var result = [];
    	var uniqueSampleKits = this.get('chosenSampleKits').uniq();
    	var samplesChosen = this.get('controllers.kitbuilder.samplesChosen');
    	for (var kitIndex = 0; kitIndex < uniqueSampleKits.length; kitIndex++){
    		var kitName = uniqueSampleKits[kitIndex]._data.name;
    		var kitObject = {name: kitName, numberOfSamples: 0};
    		var filtered = samplesChosen.filterBy('kit.name', kitName);
    		kitObject.numberOfSamples += filtered.length;
    		kitObject.subTotal = kitObject.numberOfSamples * 0.50;
    		kitObject.subTotalFormatted = accounting.formatMoney(kitObject.numberOfSamples * 0.50);
    		result.pushObject(kitObject);
    	}
    	return result;
    }),
    subTotalPrice: Ember.computed('kitsChosen', function (key, value){
    	var result = 0;
    	var kitsChosen = this.get('kitsChosen');
    	for (var i = 0; i < kitsChosen.length; i++){
    		result += kitsChosen[i].subTotal;
    	}
    	return accounting.formatMoney(result);
    }),
    totalPrice: Ember.computed('kitsChosen', 'discountPercent', function (key, value){
        var result = 0;
        var kitsChosen = this.get('kitsChosen');
        for (var i = 0; i < kitsChosen.length; i++){
            result += kitsChosen[i].subTotal;
        }
        result -= result * (this.get('discountPercent')/100);
        return accounting.formatMoney(result);
    }),
    discountPercent: Ember.computed('controllers.kitbuilder.samplesChosen.@each', function (){
        var samplesChosen = this.get('controllers.kitbuilder.samplesChosen');
        if (samplesChosen.content) {
            samplesChosen = samplesChosen.content;
        }
        if (samplesChosen.length >= 120) {
            return 50;
        } 
        if (samplesChosen.length >= 80) {
            return 40;
        }
        if (samplesChosen.length >= 40) {
            return 15;
        }
        return 0;
    }),
    actions: {        
    }
});
