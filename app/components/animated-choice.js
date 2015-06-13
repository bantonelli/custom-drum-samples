import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['lp-animated-choice', 'lp-choice-genre', 'cds-background-image'],
	domElement: null,
	makeVisible: function() {
		var element = this.get('elementId');
		var self = this;
		console.log(element);	    
		setTimeout(function (){
			var domElement = document.getElementById(element);
			self.set('domElement', domElement);
			domElement.classList.add('lp-animated-choice-visible');
			// var selector = "#" + element + ".lp-animated-choice";
			// Ember.$(selector).fadeIn( "slow" );
		}, 100);		
        // clickElement.classList.remove('icon-pause');
  	}.on('didInsertElement')
  // 	makeInvisible: function() {	
		// this.get('domElement').classList.remove('lp-animated-choice-visible');
		// 	// var selector = "#" + element + ".lp-animated-choice";
		// 	// Ember.$(selector).fadeIn( "slow" );		
  //       // clickElement.classList.remove('icon-pause');
  // 	}.on('willDestroyElement')
});
