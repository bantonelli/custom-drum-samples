/**
 * Created by brandonantonelli on 1/28/15.
 */
import Session from 'simple-auth/session';
import Ember from 'ember';

var SessionWithCurrentUser = Session.extend({
  currentUser: function() {
    var userId = this.get('user_id');
    if (!Ember.isEmpty(userId)) {
      return this.container.lookup('store:main').find('user', userId);
    }
  }.property('user_id')
});


export default {
  name: 'customize-session',
  initialize: function(container) {
    container.register('session:withCurrentUser', SessionWithCurrentUser);
  }
};