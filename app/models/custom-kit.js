import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    user: DS.attr('string'),
    date: DS.attr('date'),
    samples: DS.hasMany('sample', { async: true }),
    tags: DS.attr(),
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
