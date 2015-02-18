import DS from 'ember-data';

export default DS.Model.extend({
    user: DS.belongsTo('user'),
    last_4_digits: DS.attr( 'string' ),
    created_at: DS.attr('date'),
    updated_at: DS.attr('date'),
    custom_kits: DS.hasMany('custom-kit', {async: true})
});
