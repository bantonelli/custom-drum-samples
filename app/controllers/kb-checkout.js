import Ember from 'ember';

export default Ember.Controller.extend({

    actions: {
        myCreditCardProcessingMethod: function() {


            // var user = this.get('user.profile');

            // obtain access to the injected service
            var stripeService = this.get('stripeService');

// Example Card object to pass into createToken.
//            {
//            number: $('.card-number').val(),
//            cvc: $('.card-cvc').val(),
//            exp_month: $('.card-expiry-month').val(),
//            exp_year: $('.card-expiry-year').val()
//            }

            // if for example you had the cc set in your controller
            var card = this.get('creditCard');

            return stripeService.createToken(card).then(function(response) {
                // you get access to your newly created token here
                user.set('stripe_id', response.id);
                return user.save();

                // Do another ajax call here to post to the payment view.
            })
                .then(function() {
                    // do more stuff here
                })
                .catch(function (response){
                    // if there was an error retrieving the token you could get it here
                    if (response.error.type === 'card_error') {
                        // show the error in the form or something
                    }
                });




        }
    }
});
