/* jshint node: true */

module.exports = function(environment) {
    var ENV = {
        modulePrefix: 'custom-drum-samples',
        environment: environment,
        baseURL: '/',
        locationType: 'auto',
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
            }
        },

        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
        }
    };

    if (environment === 'development') {
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
        ENV['simple-auth'] = {
            authorizer: 'simple-auth-authorizer:oauth2-bearer',
            store: 'simple-auth-session-store:local-storage',
            crossOriginWhitelist: ['http://127.0.0.1:5000'],
            session: 'session:withCurrentUser'
        };
        ENV['simple-auth-oauth2'] = {
            serverTokenEndpoint: 'http://127.0.0.1:5000/oauth2/access_token/',
            authorizer: 'simple-auth-authorizer:oauth2-bearer'
        };
        ENV.APP.API_HOST = 'http://127.0.0.1:5000';        
        ENV.APP.API_NAMESPACE = 'api/v1';
        ENV.stripe = {
            publishableKey: 'pk_test_hyDepohZLg2M8UX2pYG6nhRI'
        };
        ENV.contentSecurityPolicy = {
          'default-src': "'self' https://js.stripe.com",
          'script-src': "'self' 'unsafe-eval' https://js.stripe.com http://127.0.0.1:35729", // Allow scripts from https://cdn.mxpnl.com
          'font-src': "'self' http://fonts.gstatic.com", // Allow fonts to be loaded from http://fonts.gstatic.com
          'connect-src': "'self' ws://127.0.0.1:35729/livereload https://*.soundcloud.com https://*.stripe.com http://127.0.0.1:5000", // Allow data (ajax/websocket) from api.mixpanel.com and custom-api.local
          'img-src': "'self' http://127.0.0.1:5000",
          'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com", // Allow inline styles and loaded CSS from http://fonts.googleapis.com 
          'media-src': "'self' http://127.0.0.1:5000 https://beat-paradigm.s3.amazonaws.com",
          'child-src': "'self' https://w.soundcloud.com https://js.stripe.com"
        };
    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.baseURL = '/';
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'production') {
        ENV['simple-auth'] = {
            authorizer: 'simple-auth-authorizer:oauth2-bearer',
            store: 'simple-auth-session-store:local-storage',
            crossOriginWhitelist: ['https://cryptic-harbor-4037.herokuapp.com'],
            session: 'session:withCurrentUser'
        };
        ENV['simple-auth-oauth2'] = {
            serverTokenEndpoint: 'https://cryptic-harbor-4037.herokuapp.com/oauth2/access_token/',
            authorizer: 'simple-auth-authorizer:oauth2-bearer'
        };
        ENV.APP.API_HOST = 'https://cryptic-harbor-4037.herokuapp.com';
        ENV.APP.API_NAMESPACE = 'api/v1';
        ENV.stripe = {
            publishableKey: 'pk_test_hyDepohZLg2M8UX2pYG6nhRI'
        };
        ENV.contentSecurityPolicy = {
          'default-src': "'self' https://js.stripe.com",
          'script-src': "'self' 'unsafe-eval' https://js.stripe.com http://127.0.0.1:35729 https://*.soundcloud.com", // Allow scripts from https://cdn.mxpnl.com
          'font-src': "'self' http://fonts.googleapis.com http://fonts.gstatic.com", // Allow fonts to be loaded from http://fonts.gstatic.com
          'connect-src': "'self' ws://127.0.0.1:35729/livereload https://*.soundcloud.com https://*.stripe.com https://cryptic-harbor-4037.herokuapp.com", // Allow data (ajax/websocket) from api.mixpanel.com and custom-api.local
          'img-src': "'self' https://beat-paradigm.s3.amazonaws.com",
          'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com http://fonts.gstatic.com", // Allow inline styles and loaded CSS from http://fonts.googleapis.com 
          'media-src': "'self' https://beat-paradigm.s3.amazonaws.com",
          'child-src': "'self' https://w.soundcloud.com https://js.stripe.com"
        };
    }

    return ENV;
};
