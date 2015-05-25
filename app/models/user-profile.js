import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
    username: DS.attr('string'),
    image: DS.attr('string'),
    last_4_digits: DS.attr( 'string' ),
    created_at: DS.attr('date'),
    updated_at: DS.attr('date'),
    public_kitbuilder_templates: DS.hasMany('kitbuilder-template', { async: true, inverse: 'user'}),
    kitbuilder_purchases: DS.attr(),
    kitbuilder_templates: DS.attr(),
    samples_purchased: DS.attr(),
    templates_followed: DS.hasMany('kitbuilder-template', { async: true })	
});

// when accessing the variables template_followed/followers you need to do:
	// profile.followers.content. 
	// profile.followers will return a promise object.
    // Also you have to not have async: true on both sides of the relationship.

// Samples purchased: just a list object of ID's
	// instead of being a related field.

// When you get factory is undefined error - there is something wrong with the JSON format/serializer
