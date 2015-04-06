/**
 * Created by brandonantonelli on 1/31/15.
 */
import Ember from 'ember';

export default Ember.View.extend({
    classNames: ['slide-view'],
    // Put jquery/DOM manipulation here
    didInsertElement: function (){
        this._super();

        Ember.run.scheduleOnce('afterRender', this, function(){
            // perform your jQuery logic here

            // PAGE POCKET SCROLL EFFECT
            var tb = Ember.$('.cds-navbar');
            var apptb = Ember.$('.appnav');
            var tbs = "top-bar-scrolled";

            Ember.$('.slide').on("scroll", function() {
                if(Ember.$(this).scrollTop() > 0) {
                    tb.addClass(tbs);
                    apptb.addClass(tbs);
                } else {
                    tb.removeClass(tbs);
                    apptb.removeClass(tbs);
                }
            });
        });
    }
});
