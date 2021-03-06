import DS from 'ember-data';

var Kit = DS.Model.extend({
    name: DS.attr( 'string' ),
    active: DS.attr( 'boolean' ),
    on_sale: DS.attr( 'string' ),
    soundcloud: DS.attr( 'string' ),
    image: DS.attr( 'string' ),
    tags: DS.attr(),
    description: DS.attr(),
    price: DS.attr( 'number' ),
    sale: DS.attr( 'number' ),
    user_rating: DS.attr( 'string' ),
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
    }.property('tags'),
    sortableDate: function (){
        var str = this.get('description.date_created');
        var find = '-';
        var re = new RegExp(find, 'g');
        var result = str.replace(re, '');
        return result;
    }.property('description')
});

//Kit.reopenClass({
//    FIXTURES: [
//        {
//            id: 1,
//            "name":"Chillstrumentals",
//            "is_new":true,
//            "on_sale":false,
//            "soundcloud":"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/160710007&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true",
//            "image":"kits/Chillstrumentals/Chillstrumental-Drum-Kit250.jpg",
//            "tags":["Hip-Hop", "808", "Acoustic"],
//            "description":"A really Good Kit",
//            "price":1,
//            "sale":1,
//            "user_rating":"0.0000",
//            "samples":[1]
//        },
//        {
//            id: 2,
//            "name":"808 Essentials",
//            "is_new":true,
//            "on_sale":false,
//            "soundcloud":"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/160710007&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true",
//            "image":"kits/808_Essentials/808-Essentials-Art250.jpg",
//            "tags":["808", "Trap", "Distorted", "Sound-FX", "Layered"],
//            "description":"A really Good Kit",
//            "price":1,
//            "sale":1,
//            "user_rating":"0.0000",
//            "samples":[2]
//        },
//        {
//            id: 3,
//            "name":"Attack of the 808's",
//            "is_new":true,
//            "on_sale":false,
//            "soundcloud":"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/179409583&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true",
//            "image":"kits/Attack_Of_The_808s/ATTACK-OF-THE-808S-3250.jpg",
//            "tags":["808", "Trap", "Layered", "Urban"],
//            "description":"A really Good Kit",
//            "price":1,
//            "sale":1,
//            "user_rating":"0.0000",
//            "samples":[3]
//        },
//        {
//            id: 4,
//            "name":"Deep Percussion",
//            "is_new":true,
//            "on_sale":false,
//            "soundcloud":"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/160710007&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true",
//            "image":"kits/Deep_Percussion/Deep-Percussion-Art250.jpg",
//            "tags":["World", "Percussion", "Sound-FX", "Urban"],
//            "description":"A really BAD Kit",
//            "price":1,
//            "sale":1,
//            "user_rating":"0.0000",
//            "samples":[4]
//        },
//        {
//            id: 5,
//            "name":"High Impact Bundle",
//            "is_new":true,
//            "on_sale":false,
//            "soundcloud":"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/160710007&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true",
//            "image":"kits/High_Impact_Bundle/High-Impact-1-2-3-Bundle250.jpg",
//            "tags":["Ambient", "Big", "Layered", "Hip-Hop"],
//            "description":"A really Good Kit",
//            "price":1,
//            "sale":1,
//            "user_rating":"0.0000",
//            "samples":[5]
//        },
//        {
//            id: 6,
//            "name":"Patient Zero",
//            "is_new":true,
//            "on_sale":false,
//            "soundcloud":"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/160710007&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true",
//            "image":"kits/Patient_Zero/SHD-Patient-Zero-Cover.jpg",
//            "tags":["Hip-Hop", "808", "Boom-Bap"],
//            "description":"A really Good Kit",
//            "price":1,
//            "sale":1,
//            "user_rating":"0.0000",
//            "samples":[6]
//        }
//    ]
//});


export default Kit;
