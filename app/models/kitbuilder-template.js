import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	last_updated: DS.attr('date', {defaultValue: false}),
	users_following: DS.hasMany('user-profile', {async: true}),
	description: DS.attr('string'),
	featured: DS.attr('boolean'),
	public: DS.attr('boolean'),
	image: DS.attr('string'),
	user: DS.belongsTo('user-profile', {async: true, inverse: 'public_kitbuilder_templates'}),
	samples: DS.hasMany('sample', {async: true}),
	tags: DS.hasMany('tags', {async: true}),
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
    //     var str = this.get('last_updated');
    //     var find = '-';
    //     var re = new RegExp(find, 'g');
    //     var result = str.replace(re, '');
    //     return result;
    // }.property('last_updated')  