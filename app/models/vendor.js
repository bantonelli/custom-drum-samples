import DS from 'ember-data';

export default DS.Model.extend({    
    name: DS.attr('string'),
    website: DS.attr('string'),
    logo: DS.attr('string'),
    facebook: DS.attr('string'),
    twitter: DS.attr('string'),
    google_plus: DS.attr('string'),
    soundcloud: DS.attr('string')
});
