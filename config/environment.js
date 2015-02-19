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
            crossOriginWhitelist: ['http://127.0.0.1:8000'],
            session: 'session:withCurrentUser'
        };
        ENV['simple-auth-oauth2'] = {
            serverTokenEndpoint: 'http://127.0.0.1:8000/oauth2/access_token/',
            authorizer: 'simple-auth-authorizer:oauth2-bearer'
        };
        ENV.APP.API_HOST = 'http://127.0.0.1:8000';
        ENV.stripe = {
            publishableKey: 'pk_test_hyDepohZLg2M8UX2pYG6nhRI'
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

    }

    return ENV;
};
