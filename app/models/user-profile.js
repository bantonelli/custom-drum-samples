import DS from 'ember-data';

export default DS.Model.extend({
    username: DS.attr('string'),
    image: DS.attr('string'),
    last_4_digits: DS.attr( 'string' ),
    created_at: DS.attr('date'),
    updated_at: DS.attr('date'),
    public_kitbuilder_templates: DS.hasMany('kitbuilder-template', {async: true}),
    kitbuilder_purchases: DS.hasMany('kitbuilder-purchase', {async: true}),
    kitbuilder_templates: DS.attr(),
    samples_purchased: DS.attr(),
    template_follows: DS.hasMany('template-follow', {async: true}),
    templates_followed: DS.hasMany('kitbuilder-template', {async: true})   	
});

// when accessing the variables template_followed/followers you need to do:
	// profile.followers.content. 
	// profile.followers will return a promise object.

// Samples purchased: just a list object of ID's
	// instead of being a related field.
