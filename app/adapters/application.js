import DRFAdapter from './drf';
import Ember from 'ember';

export default DRFAdapter.extend({    
    findMany: function(store, type, ids, snapshots) {
		var data = {
			request_items: ids
		};
		// data = JSON.stringify(data);
		return this.ajax(this.buildURL(
			type.typeKey, ids, snapshots), 
		'PATCH', 
		{ 
			data: data,
			processData: false 
		}
		);
		// var data = {
		// 	request_items: ids
		// };
		// data = JSON.stringify(data);
		// var url = this.buildURL(type, ids, snapshots);
		// return Ember.$.ajax({
		// 	url: url,
		//    	data: data,
  //   		type: 'PATCH',
  //   		contentType: 'application/json',
		//     processData: false,
		// });

	}
});
