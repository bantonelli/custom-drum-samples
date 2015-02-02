import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr( 'string' ),
    new: DS.attr( 'string' ),
    on_sale: DS.attr( 'string' ),
    soundcloud: DS.attr( 'string' ),
    image: DS.attr( 'string' ),
    tags: DS.attr( 'string' ),
    description: DS.attr( 'string' ),
    price: DS.attr( 'string' ),
    sale: DS.attr( 'string' ),
    user_rating: DS.attr( 'string' ),
    samples: DS.attr( 'string' )
});
