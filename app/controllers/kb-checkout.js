import Ember from 'ember';

export default Ember.Controller.extend({

    actions: {
        processCard: function() {


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
            var number = this.get('cardNumber');
            var cvc = this.get('cvc');
            var exp_month = this.get('expirationMonth');
            var exp_year = this.get('expirationYear')

            var card = {
                number: number,
                cvc: cvc,
                exp_month: exp_month,
                exp_year: exp_year
            }

            return stripeService.createToken(card).then(function(response) {
                // you get access to your newly created token here
//                user.set('stripe_id', response.id);
//                return user.save();
                var data = {stripeToken: response.id, last4: response.card.last4};
                Ember.$.ajax({
                    type: "POST",
                    url: "http://www.yoururl.com/",
                    crossDomain: true,
                    data: data,
                    //'parm1=value1&param2=value2',
                    success: function (data) {
                        console.log(data);
                        // do something with server response data
                    },
                    error: function (err) {
                        // handle your error logic here
                    }
                });
                // Do another ajax call here to post to the payment view.
            }).catch(function (response){
                // if there was an error retrieving the token you could get it here
                if (response.error.type === 'card_error') {
                    console.log(response.error.message);
                }
            });




        }
    }
});
