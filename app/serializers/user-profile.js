import DRFSerializer from './drf';
import DS from 'ember-data';

export default DRFSerializer.extend(DS.EmbeddedRecordsMixin, {
	attrs: {
    	kitbuilder_templates: { embedded: 'always' },
    	kitbuilder_purchases: { embedded: 'always' }
  	}
});