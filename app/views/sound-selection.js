import Ember from 'ember';

export default Ember.View.extend({
    classNames: ['slide-view'],
    // Put jquery/DOM manipulation here
    // parentViewDidChange: function (){
    //     this._super();
        
    // }
    didInsertElement: function (){
    	var self = this;
    	setTimeout(function(){ 
    		self.set('controller.loadSoundCloud', true);
    	}, 1000);    	
    },
    willDestroyElement: function () {
    	this.set('controller.loadSoundCloud', false);
    }
});
