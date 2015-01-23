/**
 * Created by brandonantonelli on 1/22/15.
 */

import OAuthCustomAuthenticator from './../authenticators/cds-authenticator';

export default {
  name: 'cds-authenticator',

  initialize: function(container) {
    container.register(
      'cds-authenticator:oauth2-password-grant',
      OAuthCustomAuthenticator);
  }
};