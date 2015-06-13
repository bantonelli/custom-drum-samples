import Ember from 'ember';
import config from '.././config/environment';

export default Ember.Controller.extend({
    appId: 'Template Browser',
    appRoutes: [
    	{route: 'tb-featured', displayLink: 'Featured'},
        {route: 'tb-most-followed', displayLink: 'Most Followed'}, // link
        {route: 'tb-recent', displayLink: 'Recent'}
    ]
});

/*
1: route supplies controller
2: you can inject 1 contorller into another using dependency injection (needs) (controllers can communicate)
	-> all controllers are singletons meaning there is one instantiation that can be shared between controllers this makes injection more efficient
3: refer to the data on the controller by using template tags (alias.model)
*/