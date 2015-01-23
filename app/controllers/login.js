/**
 * Created by brandonantonelli on 1/20/15.
 */
import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(LoginControllerMixin, {
  //authenticator: 'simple-auth-authenticator:oauth2-password-grant'
  authenticator: 'cds-authenticator:oauth2-password-grant'
});