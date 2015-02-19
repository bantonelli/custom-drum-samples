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

//            // Set csrftoken
//            Ember.$.ajax({
//                type: "GET",
//                url: "http://127.0.0.1:8000/api/custom-kits/purchase/",
//                crossDomain: true,
//                //'parm1=value1&param2=value2',
//            }).done(function (data, textStatus, xhr) {
//                console.log(data);
//                console.log(data[0].csrf_token);
//                var token = data[0].csrf_token
////                Ember.$.cookie('mycsrftoken', token);
//                // do something with server response data
//                var cookieToSet= xhr.getResponseHeader('Set-Cookie');
//                console.log(cookieToSet);
//            });
        });
    }
});
