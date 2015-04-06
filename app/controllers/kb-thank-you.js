import Ember from 'ember';
import config from '.././config/environment';
var swal = window.sweetAlert;


export default Ember.Controller.extend({
    needs: ['kitbuilder', 'your-kit', 'kb-checkout'],
    purchasedKit: Ember.computed.alias("model"),  
    apiURL: config.APP.API_HOST,
    actions: {        
    }
});
