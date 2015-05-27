import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr( 'string' ),
    active: DS.attr( 'boolean' ),
    on_sale: DS.attr( 'boolean' ),
    soundcloud: DS.attr( 'string' ),
    image: DS.attr( 'string' ),
    description: DS.attr('string'),
    date_created: DS.attr('date'),
    sample_count: DS.attr('number'),
    commission_rate: DS.attr('string'),
    vendor: DS.belongsTo('vendor', { async: true }),
    tags: DS.attr(),
    price: DS.attr(),
    sale: DS.attr(),
    samples: DS.hasMany('sample', { async: true }),
    displayedTags: function() {
        var tagString;
        var tagNames = [];
        var tags = this.get('tags');
        for (var i = 0; i < tags.length; i++){
            tagNames.push(tags[i].name);
        }
        tagString = tagNames.join(' ');
        return tagString;
    }.property('tags')
});


    // sortableDate: function (){
    //     var str = this.get('date_created');
    //     var find = '-';
    //     var re = new RegExp(find, 'g');
    //     var result = str.replace(re, '');
    //     return result;
    // }.property('date_created')  

// Use DS.attr() for embedded objects. 
