import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	date_purchased: DS.attr('date'),
	zip_file: DS.attr('string'),
	user: DS.attr('string')
});
