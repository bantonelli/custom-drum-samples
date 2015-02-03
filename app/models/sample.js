import DS from 'ember-data';


var Sample = DS.Model.extend({
    name: DS.attr( 'string' ),
    demo: DS.attr( 'string' ),
    wav: DS.attr( 'string' ),
    kit: DS.belongsTo('kit'),
    type: DS.attr( 'string' )
});


Sample.reopenClass({
    FIXTURES: [
        {id: 1, "name":"SP1200-BD-01","demo":"kits/Chillstrumentals/samples/demo/GameFX_8.wav","wav":"kits/Chillstrumentals/samples/wav/GameFX_8.wav","kit":1,"type":"KD"},
        {id: 2, "name":"SP1200-BD-02","demo":"kits/Chillstrumentals/samples/demo/GameFX_8.wav","wav":"kits/Chillstrumentals/samples/wav/GameFX_8.wav","kit":2,"type":"KD"},
        {id: 3, "name":"SP1200-BD-03","demo":"kits/Chillstrumentals/samples/demo/GameFX_8.wav","wav":"kits/Chillstrumentals/samples/wav/GameFX_8.wav","kit":3,"type":"KD"},
        {id: 4, "name":"SP1200-BD-04","demo":"kits/Chillstrumentals/samples/demo/GameFX_8.wav","wav":"kits/Chillstrumentals/samples/wav/GameFX_8.wav","kit":4,"type":"KD"},
        {id: 5, "name":"SP1200-BD-05","demo":"kits/Chillstrumentals/samples/demo/GameFX_8.wav","wav":"kits/Chillstrumentals/samples/wav/GameFX_8.wav","kit":5,"type":"KD"},
        {id: 6, "name":"SP1200-BD-06","demo":"kits/Chillstrumentals/samples/demo/GameFX_8.wav","wav":"kits/Chillstrumentals/samples/wav/GameFX_8.wav","kit":6,"type":"KD"},
    ]
});


export default Sample;
