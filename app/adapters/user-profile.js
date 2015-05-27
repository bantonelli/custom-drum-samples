// import DRFAdapter from './drf';
import BaseAdapter from './application';
import config from '.././config/environment';
import Ember from 'ember';

export default BaseAdapter.extend({
	buildURL: function(type, id, snapshot) {
		//We might get passed in an array of ids from findMany
		//in which case we don't want to modify the url, as the
		//ids will be passed in through a query param
		var baseUrl = config.APP.API_HOST + '/' + config.APP.API_NAMESPACE + '/';
		var url;
		if (!id || Ember.isArray(id)) { 
			url = baseUrl + 'profiles/'; 
		} else if (id) {
			url = baseUrl + 'profiles/' +  id + '/';
		}
		return url;
	},
	coalesceFindRequests: true
});
