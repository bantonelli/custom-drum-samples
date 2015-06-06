import Ember from 'ember';
import config from '.././config/environment';
var swal = window.sweetAlert;


export default Ember.Controller.extend({
    needs: ['kitbuilder', 'kb-checkout'],
    errorMessage: null,
    paymentSuccess: null,
    mailSent: null,    
    actions: {
        processCard: function() {
            var controllerSelf = this;
            var userID = this.get('session.content.user_id');

            // KIT INFORMATION
            // var samplesChosen = this.get('controllers.kitbuilder.samplesChosen');
            // var samples = [];
            // for (var i = 0; i < samplesChosen.length; i++){
            //     samples.push(samplesChosen[i]._data.id);
            // }
            var samples = this.get('controllers.kitbuilder.samplesChosenIds');

            var kitName = this.get('controllers.kitbuilder.kitName');
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

             // get the csrftoken cookie stored by django
            var csrf_token = getCookie('csrftoken');

            // The createToken method sends an ajax request to stripe    
            return stripeService.createToken(billingInfo).then(function(response) {
                // you get access to your newly created token here
                // the response object is the object with data from stripe

                // Build new object with data from response object.
                var data = {
                    csrfmiddlewaretoken: csrf_token,
                    stripeToken: response.id,
                    last4: response.card.last4,
                    samples: JSON.stringify(samples),
                    kitName: kitName,
                    userID: userID
                };

                // Create new ajax request to our server that sends the data object.
                Ember.$.ajax({
                    type: "POST",
                    url: config.APP.API_HOST + "/" config.APP.API_NAMESPACE + "/kitbuilder/purchase/",
                    crossDomain: true,
                    data: data,
                    // xhrFields withCredentials will auto set cookies and session data on the request
                    // This is necessary for validating csrf token on server side.
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        console.log(data);

                        if (data[0].data_error){
                            // If there was invalid data posted to server set that as error message
                            // controllerSelf.set("errorMessage", data[0].data_error);
                            // ********* ALERT ******** //
                            swal({
                              title: "Error!",
                              text: data[0].data_error,
                              type: "error",
                              confirmButtonText: "OK"
                            });     
                        }
                        else {
                            // If data posted is valid check payment success
                            // controllerSelf.set("errorMessage", null);
                            if (data[0].payment_success){
                                // If payment success report that. 
                                controllerSelf.set("paymentSuccess", "Your payment has been processed");
                                // controllerSelf.set("errorMessage", null);
                                if (data[0].mail_sent) {
                                    var orderNumber = data[0].order_number;
                                    var purchasedKitID = data[0].purchased_kit_id;
                                    // If email success report that. 
                                    controllerSelf.set("mailSent", "Your custom kit download has been emailed to you");
                                    // ********* CLEAR KITBUILDER ******** // 
                                    controllerSelf.set('controllers.kitbuilder.currentTemplate', null);
                                    controllerSelf.set('controllers.kitbuilder.chosenSamples', []);
                                    controllerSelf.set('controllers.kitbuilder.kitName', null);
                                    controllerSelf.set('controllers.kitbuilder.isDirty', false);
                                    controllerSelf.set('controllers.kb-checkout.orderNumber', orderNumber);
                                    controllerSelf.set('controllers.kb-checkout.purchasedKitID', purchasedKitID);                                    
                                    // ********* REDIRECT TO PAYMENT RECIEVED/ THANK YOU PAGE ******** // 
                                    controllerSelf.transitionToRoute('kb-thank-you');   
                                }
                            } else {
                                // If payment failed report the payment error message. 
                                // ********* ALERT ******** //
                                swal({
                                  title: "Error!",
                                  text: data[0].payment_error,
                                  type: "error",
                                  confirmButtonText: "OK"
                                }); 
                                // controllerSelf.set("errorMessage", data[0].payment_error);
                            }
                        }
                        // do something with server response data
                    }                
                }).fail(function( jqXHR, textStatus ) {
                    // Error that rises when there is a server error
                    // Or if there is simply an HTTP error that is raised with the request
                    // ********* ALERT ******** //
                    swal({
                      title: "Request Failed!",
                      text: textStatus,
                      type: "error",
                      confirmButtonText: "OK"
                    });     
                });
                // Do another ajax call here to post to the payment view.
            }).catch(function (response){
                // if there was an error retrieving the token from stripe we could get it here
                if (response.error.type === 'card_error') {
                    // ********* ALERT ******** //
                    swal({
                      title: "Error!",
                      text: response.error.message,
                      type: "error",
                      confirmButtonText: "OK"
                    });  
                }
            });

        }
    }
});
