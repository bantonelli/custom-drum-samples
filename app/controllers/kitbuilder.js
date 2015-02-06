/**
 * Created by brandonantonelli on 2/2/15.
 */
import Ember from 'ember';

export default Ember.ArrayController.extend({
    appId: 'Kit Builder',
    appRoutes: [
        {route: 'sound-selection', displayLink: 'Sound Selection'},
        {route: 'your-kit', displayLink: 'Your Custom Kit'},
        {route: 'kb-checkout', displayLink: 'Checkout'}
    ],
    chosenSamples: [],
    samplesChosen: Ember.computed.alias("chosenSamples")
});