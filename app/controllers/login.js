/**
 * Created by brandonantonelli on 1/20/15.
 */
import Ember from 'ember';

// LoginController is only triggered for the login route
// It is not used when logging in through the modal.
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(LoginControllerMixin, {
//   //authenticator: 'simple-auth-authenticator:oauth2-password-grant'
//   authenticator: 'cds-authenticator:oauth2-password-grant'
// });
});