import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['login-modal'],
    actions: {
      login: function () {
          this.sendAction('authenticate');
          this.sendAction('dismiss');
      }
    }
});
