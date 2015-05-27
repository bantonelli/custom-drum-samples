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
			url = baseUrl + 'kitbuilder/templates/'; 
		} else if (id) {
			url = baseUrl + 'kitbuilder/templates/' +  id + '/';
		}
		return url;
	},
    updateRecord: function(store, type, snapshot) {
    	// Had to override updateRecord to remove 'image' from PUT request
    		// API will reject a PUT with image: null or anything other than a file upload.
    		// Have to handle the file upload separately.
        var data = {};
        var serializer = store.serializerFor(type.typeKey);

        serializer.serializeIntoHash(data, type, snapshot);

        var id = snapshot.id;
        var prop = "image";
		delete data[prop];        
        return this.ajax(this.buildURL(type.typeKey, id, snapshot), "PUT", { data: data });
    },
	coalesceFindRequests: true
});
