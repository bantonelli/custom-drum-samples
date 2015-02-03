import DS from 'ember-data';

var Kit = DS.Model.extend({
    name: DS.attr( 'string' ),
    new: DS.attr( 'string' ),
    on_sale: DS.attr( 'string' ),
    soundcloud: DS.attr( 'string' ),
    image: DS.attr( 'string' ),
    tags: DS.attr( 'string' ),
    description: DS.attr( 'string' ),
    price: DS.attr( 'number' ),
    sale: DS.attr( 'number' ),
    user_rating: DS.attr( 'string' ),
    samples: DS.hasMany('sample', { async: true })
});

Kit.reopenClass({
    FIXTURES: [
        {
            id: 1,
            "name":"Chillstrumentals",
            "new":true,
            "on_sale":false,
            "soundcloud":"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/160710007&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true",
            "image":"kits/Chillstrumentals/Chillstrumental-Drum-Kit250.jpg",
            "tags":["Hip-Hop", "808", "Acoustic"],
            "description":"A really Good Kit",
            "price":1,
            "sale":1,
            "user_rating":"0.0000",
            "samples":[1]
        },
        {
            id: 2,
            "name":"808 Essentials",
            "new":true,
            "on_sale":false,
            "soundcloud":"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/160710007&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true",
            "image":"kits/808_Essentials/808-Essentials-Art250.jpg",
            "tags":["808", "Trap", "Distorted", "Sound-FX", "Layered"],
            "description":"A really Good Kit",
            "price":1,
            "sale":1,
            "user_rating":"0.0000",
            "samples":[2]
        },
        {
            id: 3,
            "name":"Attack of the 808's",
            "new":true,
            "on_sale":false,
            "soundcloud":"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/160710007&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true",
            "image":"kits/Attack_Of_The_808s/ATTACK-OF-THE-808S-3250.jpg",
            "tags":["808", "Trap", "Layered", "Urban"],
            "description":"A really Good Kit",
            "price":1,
            "sale":1,
            "user_rating":"0.0000",
            "samples":[3]
        },
        {
            id: 4,
            "name":"Deep Percussion",
            "new":true,
            "on_sale":false,
            "soundcloud":"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/160710007&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true",
            "image":"kits/Deep_Percussion/Deep-Percussion-Art250.jpg",
            "tags":["World", "Percussion", "Sound-FX", "Urban"],
            "description":"A really Good Kit",
            "price":1,
            "sale":1,
            "user_rating":"0.0000",
            "samples":[4]
        },
        {
            id: 5,
            "name":"High Impact Bundle",
            "new":true,
            "on_sale":false,
            "soundcloud":"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/160710007&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true",
            "image":"kits/High_Impact_Bundle/High-Impact-1-2-3-Bundle250.jpg",
            "tags":["Ambient", "Big", "Layered", "Hip-Hop"],
            "description":"A really Good Kit",
            "price":1,
            "sale":1,
            "user_rating":"0.0000",
            "samples":[5]
        },
        {
            id: 6,
            "name":"Patient Zero",
            "new":true,
            "on_sale":false,
            "soundcloud":"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/160710007&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true",
            "image":"kits/Patient_Zero/SHD-Patient-Zero-Cover.jpg",
            "tags":["Hip-Hop", "808", "Boom-Bap"],
            "description":"A really Good Kit",
            "price":1,
            "sale":1,
            "user_rating":"0.0000",
            "samples":[6]
        }
    ]
});


export default Kit;
