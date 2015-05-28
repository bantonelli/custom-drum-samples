import Ember from 'ember';
import config from '.././config/environment';

export default Ember.ArrayController.extend({
    appId: 'Template Browser',
    appRoutes: [
    	{route: 'tb-featured', displayLink: 'Featured'},
        {route: 'tb-most-followed', displayLink: 'Most Followed'}, // link
        {route: 'tb-recent', displayLink: 'Recent'}
    ]
});

/*
ideas: most followed, featured, most recent.
*/