import DS from 'ember-data';

export default DS.Model.extend({
    username: DS.attr('string'),
    image: DS.attr('string'),
    last_4_digits: DS.attr( 'string' ),
    created_at: DS.attr('date'),
    updated_at: DS.attr('date'),
    kitbuilder_purchases: DS.hasMany('kitbuilder-purchase', {async: true}),
    kitbuilder_templates: DS.hasMany('kitbuilder-template', {async: true}),
    samples_purchased: DS.attr(),
    followers: DS.hasMany('follower', {async: true}),
    templates_followed: DS.hasMany('kitbuilder-template', {async: true})   	
});

// when accessing the variables template_followed/followers you need to do:
	// profile.followers.content. 
	// profile.followers will return a promise object.

// Samples purchased: just a list object of ID's
	// instead of being a related field.
