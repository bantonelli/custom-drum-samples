import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['lp-animated-choice', 'lp-choice-genre', 'cds-background-image'],
	makeVisible: function() {
		var element = this.get('elementId');
		console.log(element);	    
		setTimeout(function (){
			var domElement = document.getElementById(element);
			domElement.classList.add('lp-animated-choice-visible');
			// var selector = "#" + element + ".lp-animated-choice";
			// Ember.$(selector).fadeIn( "slow" );
		}, 500);		
        // clickElement.classList.remove('icon-pause');
  	}.on('didInsertElement')
});
