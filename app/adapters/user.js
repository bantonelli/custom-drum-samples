import DRFAdapter from './drf';

export default DRFAdapter.extend({
    // buildURL: function(root, suffix, record) {
    // }
    buildURL: function() {
	    var url = this._super();
	    return url + 'accounts/me';
	}
});
