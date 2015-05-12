'use strict';

module.exports = function(karma) {
  karma.set({
    frameworks: ['mocha', 'chai', 'browserify' ],

    files: [
      'test/**/*Spec.js',
      {pattern: 'test/fixtures/**/*.*', watched: true, served: true, included: false}

    ],

    reporters: ['progress'],

    preprocessors: {
      'test/**/*Spec.js': ['browserify']
    },

    client: {
      mocha: {
        reporter: 'html' // change Karma's debug.html to the mocha web reporter
        ,ui: 'bdd'
      }
    },

    browsers: [ 'Chrome' ],

    logLevel: 'LOG_DEBUG',

    singleRun: false,
    autoWatch: true,

    // browserify configuration
    browserify: {
      debug: true,
      transform: [ 'babelify', 'hintify' ]
    }
  });
};
