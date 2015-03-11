import Ember from 'ember';

export default Ember.View.extend({
    classNames: ['slide-view'],
    // Put jquery/DOM manipulation here
    parentViewDidChange: function (){
        this._super();
            // var state = Ember.$('#kitmix').mixItUp('getState');
            // console.log(state.$show);


// SELECT BOX CODE
//            Ember.$("#e2").select2({
//                formatNoMatches: function (term) {
//                    return "Whoops!! <br> Instrument Not Found!";
//                }
//            });
    }
});
