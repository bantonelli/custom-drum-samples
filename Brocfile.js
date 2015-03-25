/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');
var compileSass = require('broccoli-sass');
var HtmlbarsCompiler = require('ember-cli-htmlbars');

var app = new EmberApp({
    vendorFiles: {
        'handlebars.js': null
    }
});

var templateTree = new HtmlbarsCompiler('app/templates', {
  isHTMLBars: true,

  // provide the templateCompiler that is paired with your Ember version
  templateCompiler: require('./bower_components/ember/ember-template-compiler')
});

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


// used bower install --save stripe.js=https://js.stripe.com/v2/stripe.js for stripe
// JS FILES BOWER
app.import('bower_components/modernizr/modernizr.js');
app.import('bower_components/classie/classie.js');
app.import('bower_components/mixitup/build/jquery.mixitup.min.js');
app.import('bower_components/jquery.finger/dist/jquery.finger.js');
app.import('bower_components/select2/select2.min.js');
app.import('bower_components/jquery-cookie/jquery.cookie.js');
app.import('bower_components/sweetalert/lib/sweet-alert.js');
app.import('bower_components/sweetalert/lib/sweet-alert.css');


// JS FILES VENDOR
var vendorJS = pickFiles('vendor/js', {
    srcDir: '/',
    files: ['*.js'],
    destDir: '/js'
});

// Enigmatic Bold
var enigmaticBoldFont = pickFiles('vendor/fonts/enigmatic_bold_macroman', {
    srcDir: '/',
    files: ['*.eot', '*.svg', '*.ttf', '*.woff'],
    destDir: '/fonts/enigmatic_bold_macroman'
});


// Enigmatic Italic
var enigmaticItalicFont = pickFiles('vendor/fonts/enigmatic_italic_macroman', {
    srcDir: '/',
    files: ['*.eot', '*.svg', '*.ttf', '*.woff'],
    destDir: '/fonts/enigmatic_italic_macroman'
});


// Enigmatic Regular
var enigmaticRegularFont = pickFiles('vendor/fonts/enigmatic_regular_macroman', {
    srcDir: '/',
    files: ['*.eot', '*.svg', '*.ttf', '*.woff'],
    destDir: '/fonts/enigmatic_regular_macroman'
});


// Icomoon
var icomoonFont = pickFiles('vendor/fonts/icomoon/fonts', {
    srcDir: '/',
    files: ['*.eot', '*.svg', '*.ttf', '*.woff'],
    destDir: '/fonts/icomoon/fonts'
});

// Quicksand
var quicksandFont = pickFiles('vendor/fonts/quicksand', {
    srcDir: '/',
    files: ['*.eot', '*.svg', '*.ttf', '*.woff', '*.woff2'],
    destDir: '/fonts/quicksand'
});


// Images
var images = pickFiles('vendor/images', {
    srcDir: '/',
    files: ['*.png', '**/*.png', '*.jpg'],
    destDir: '/images'
});


// Sass/CSS
var styles = compileSass(['app/styles'], 'app.scss', '/assets/custom-drum-samples.css');


module.exports = mergeTrees(
    [
        app.toTree(),
        enigmaticBoldFont,
        enigmaticItalicFont,
        enigmaticRegularFont,
        icomoonFont,
        quicksandFont,
        images,
        vendorJS,
        templateTree,
        styles
    ], {overwrite: true}
);

/*
                        'bower_components/modernizr/modernizr.js',
                        'bower_components/classie/classie.js',

                        'bower_components/mixitup/build/jquery.mixitup.min.js',
                        'bower_components/jquery.finger/dist/jquery.finger.js',
                        'bower_components/select2/select2.min.js',
 */