/**
 * Created by brandonantonelli on 1/22/15.
 */
import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
});

// curl -H "Authorization: Bearer c47425efe0e492324167f1844e6e7d3f5b6b62f1" http://127.0.0.1:8000/api/users/1