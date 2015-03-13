import Ember from 'ember';
import config from '.././config/environment';


export default Ember.Controller.extend({
    needs: ['kitbuilder', 'your-kit'],
    actions: {
        processCard: function() {
            var userID = this.get('session.content.user_id');

            // KIT INFORMATION
            var samplesChosen = this.get('controllers.kitbuilder.samplesChosen');
            var samples = [];
            for (var i = 0; i < samplesChosen.length; i++){
                samples.push(samplesChosen[i]._data.id);
            }

            var kitName = this.get('controllers.your-kit.customKitName');
            // obtain access to the injected service
            var stripeService = this.get('stripeService');
// Example Card object to pass into createToken.
//            {
//            number: 4242424242424242,
//            cvc: 123,
//            exp_month: 12,
//            exp_year: 2016
//            }
            var number = this.get('cardNumber');
            var cvc = this.get('cvc');
            var exp_month = this.get('expirationMonth');
            var exp_year = this.get('expirationYear');
            var name = this.get('firstName') + " " + this.get('lastName');
            var address_line1 = this.get('addressLine1');
            var address_line2 = this.get('addressLine2');
            var address_city = this.get('addressCity');
            var address_state = this.get('addressState');
            var address_zip = this.get('addressZip');
            var address_country = this.get('addressCountry');
            
            var billingInfo = {
                number: number,
                cvc: cvc,
                exp_month: exp_month,
                exp_year: exp_year,
                name: name,
                address_line1: address_line1,
                address_line2: address_line2,
                address_city: address_city,
                address_state: address_state,
                address_zip: address_zip,
                address_country: address_country
            };

            function getCookie(name) {
                var cookieValue = null;
                if (document.cookie && document.cookie !== '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = Ember.$.trim(cookies[i]);
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) === (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }

            return stripeService.createToken(billingInfo).then(function(response) {
                // you get access to your newly created token here
//                user.set('stripe_id', response.id);
//                return user.save();
                var data = {
                    stripeToken: response.id,
                    last4: response.card.last4,
                    samples: JSON.stringify(samples),
                    kitName: kitName,
                    userID: userID
                };
                Ember.$.ajax({
                    beforeSend: function(xhr) {
                        var csrftoken = getCookie('mycsrftoken');
                        xhr.setRequestHeader("X-CSRFToken", csrftoken);
                    },
                    type: "POST",
                    url: config.APP.API_HOST + "/api/custom-kits/purchase/",
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
