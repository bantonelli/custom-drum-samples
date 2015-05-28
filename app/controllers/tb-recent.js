import Ember from 'ember';
import config from '.././config/environment';

export default Ember.Controller.extend({
	needs: ['browse-templates'],
	btController: Ember.computed.alias('controllers.browse-templates')
});
