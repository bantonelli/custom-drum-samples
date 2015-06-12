import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    classNames: ['row', 'lp-three-choices'],
    hipHop: false,
    electronic: false,
    experimental: false,
    currentSingleChoice: Ember.computed('hipHop', 'electronic', 'experimental', function (){
        if (this.get('hipHop')) {
            return "lp-choice-genre-4";
        } else if (this.get('electronic')) {
            return "lp-choice-genre-5";
        } else if (this.get('experimental')) {
            return "lp-choice-genre-6";
        }       
    }),
    combination: Ember.computed('hipHop', 'electronic', 'experimental', function (){
        var hipHop = this.get('hipHop');
        var electronic = this.get('electronic');
        var experimental = this.get('experimental');
        return (hipHop && electronic || hipHop && experimental || electronic && experimental);
    }),
    experimentalHipHop: Ember.computed('experimental', 'hipHop', function (){
    	if (this.get('experimental') && this.get('hipHop')) {
            return true;
        } else {
            return false;
        }
    }),
    trap: Ember.computed('electronic', 'hipHop', function (){
        if (this.get('electronic') && this.get('hipHop')) {
            return true;
        } else {
            return false;
        }
    }),	
	experimentalEDM: Ember.computed('experimental', 'electronic', function (){
        if (this.get('experimental') && this.get('electronic')) {
            return true;
        } else {
            return false;
        }
    }),
    actions: {
        checkHipHop: function (){
            this.set('hipHop', !(this.get('hipHop')));
        },
        checkElectronic: function (){
            this.set('electronic', !(this.get('electronic')));    
        },
        checkExperimental: function (){
            this.set('experimental', !(this.get('experimental')));
        }
    }
});
