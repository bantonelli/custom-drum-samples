/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

// JS FILES BOWER
app.import('bower_components/modernizr/modernizr.js');
app.import('bower_components/classie/classie.js');
app.import('bower_components/mixitup/build/jquery.mixitup.min.js');
app.import('bower_components/jquery.finger/dist/jquery.finger.js');
app.import('bower_components/select2/select2.min.js');


// JS FILES VENDOR
app.import('vendor/js/detectmobilebrowser.js');
app.import('vendor/js/landing-page.js');
app.import('vendor/js/modal-login-nav.js');
app.import('vendor/js/sidebarEffects.js');
app.import('vendor/js/sitewide-effects.js');

// Enigmatic Bold
app.import('vendor/fonts/enigmatic_bold_macroman/EnigmaB_2-webfont.eot', {
    destDir: 'fonts/enigmatic_bold_macroman'
});
app.import('vendor/fonts/enigmatic_bold_macroman/EnigmaB_2-webfont.svg', {
    destDir: 'fonts/enigmatic_bold_macroman'
});
app.import('vendor/fonts/enigmatic_bold_macroman/EnigmaB_2-webfont.ttf', {
    destDir: 'fonts/enigmatic_bold_macroman'
});
app.import('vendor/fonts/enigmatic_bold_macroman/EnigmaB_2-webfont.woff', {
    destDir: 'fonts/enigmatic_bold_macroman'
});


// Enigmatic Italic
app.import('vendor/fonts/enigmatic_italic_macroman/Enigma_2i-webfont.eot', {
    destDir: 'fonts/enigmatic_italic_macroman'
});
app.import('vendor/fonts/enigmatic_italic_macroman/Enigma_2i-webfont.svg', {
    destDir: 'fonts/enigmatic_italic_macroman'
});
app.import('vendor/fonts/enigmatic_italic_macroman/Enigma_2i-webfont.ttf', {
    destDir: 'fonts/enigmatic_italic_macroman'
});
app.import('vendor/fonts/enigmatic_italic_macroman/Enigma_2i-webfont.woff', {
    destDir: 'fonts/enigmatic_italic_macroman'
});


// Enigmatic Regular
app.import('vendor/fonts/enigmatic_regular_macroman/Enigma__2-webfont.eot', {
    destDir: 'fonts/enigmatic_regular_macroman'
});
app.import('vendor/fonts/enigmatic_regular_macroman/Enigma__2-webfont.svg', {
    destDir: 'fonts/enigmatic_regular_macroman'
});
app.import('vendor/fonts/enigmatic_regular_macroman/Enigma__2-webfont.ttf', {
    destDir: 'fonts/enigmatic_regular_macroman'
});
app.import('vendor/fonts/enigmatic_regular_macroman/Enigma__2-webfont.woff', {
    destDir: 'fonts/enigmatic_regular_macroman'
});


// Icomoon
app.import('vendor/fonts/icomoon/fonts/icomoon.eot', {
    destDir: 'fonts/icomoon/fonts'
});
app.import('vendor/fonts/icomoon/fonts/icomoon.svg', {
    destDir: 'fonts/icomoon/fonts'
});
app.import('vendor/fonts/icomoon/fonts/icomoon.ttf', {
    destDir: 'fonts/icomoon/fonts'
});
app.import('vendor/fonts/icomoon/fonts/icomoon.woff', {
    destDir: 'fonts/icomoon/fonts'
});


// Quicksand Regular
app.import('vendor/fonts/quicksand/quicksand-regular.eot', {
    destDir: 'fonts/quicksand'
});
app.import('vendor/fonts/quicksand/quicksand-regular.svg', {
    destDir: 'fonts/quicksand'
});
app.import('vendor/fonts/quicksand/quicksand-regular.ttf', {
    destDir: 'fonts/quicksand'
});
app.import('vendor/fonts/quicksand/quicksand-regular.woff', {
    destDir: 'fonts/quicksand'
});
app.import('vendor/fonts/quicksand/quicksand-regular.woff2', {
    destDir: 'fonts/quicksand'
});


// Quicksand Bold
app.import('vendor/fonts/quicksand/quicksand-bold.eot', {
    destDir: 'fonts/quicksand'
});
app.import('vendor/fonts/quicksand/quicksand-bold.svg', {
    destDir: 'fonts/quicksand'
});
app.import('vendor/fonts/quicksand/quicksand-bold.ttf', {
    destDir: 'fonts/quicksand'
});
app.import('vendor/fonts/quicksand/quicksand-bold.woff', {
    destDir: 'fonts/quicksand'
});
app.import('vendor/fonts/quicksand/quicksand-bold.woff2', {
    destDir: 'fonts/quicksand'
});





module.exports = app.toTree();

/*
                        'bower_components/modernizr/modernizr.js',
                        'bower_components/classie/classie.js',

                        'bower_components/mixitup/build/jquery.mixitup.min.js',
                        'bower_components/jquery.finger/dist/jquery.finger.js',
                        'bower_components/select2/select2.min.js',
 */