import Ember from 'ember';
import config from '.././config/environment';

export default Ember.Controller.extend({
	needs: ['template-browser'],
	tbController: Ember.computed.alias('controllers.template-browser')
});
