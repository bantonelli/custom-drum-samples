import Ember from 'ember';
import config from '.././config/environment';
var swal = window.sweetAlert;


export default Ember.Controller.extend({
    needs: ['kitbuilder', 'your-kit'],  
    purchasedKitID: null,   
    actions: {        
    }
});
