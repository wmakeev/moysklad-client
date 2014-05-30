var _ = require('lodash');

module.exports = function (grunt) {

    var googleScriptBundleWrapper = function (err, src, next) {
        var modifiedSrc;
        if (!err) {
            modifiedSrc = [
                'window = this;',
                'function getLib() {',
                src,
                '\n  return window.Bundle;',
                '}'
            ].join('\n');
        }
        next(err, modifiedSrc);
    };

    var getContextSpecificAliases = function (context, modules) {
        //console.log('getContextSpecificAliases');
        return _.map(modules, function (moduleItem) {
            return './src/node_modules/project/' + moduleItem + '/' + context + '.js:project/' + moduleItem;
        })
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {

            /*'vendor': {
                src: [],
                dest: 'build/gs/vendor.gs',
                options: {
                    alias: [
                        './node_modules/lodash/dist/lodash.min.js:lodash',
                        './node_modules/moment/min/moment.min.js:moment'
                    ]
                }
            },*/

            'client': {
                src: ['src/moysklad-client/index.js'],
                dest: 'build/gs/client.gs',
                options: {
                    //standalone: 'Bundle',
                    alias: getContextSpecificAliases('gs', [
                        'fetch',
                        'default-auth',
                        'logger'
                    ]).concat([
                        './src/moysklad-client/index.js:moysklad-client',
                        './node_modules/lodash/dist/lodash.min.js:lodash',
                        './node_modules/moment/min/moment.min.js:moment',
                        './node_modules/stampit/dist/stampit.min.js:stampit'
                    ]),
                    external: [
                        'xmlhttprequest',
                        /*'lodash',
                        'moment'*/
                    ],
                    exclude: [ 'fs' ]
                    //postBundleCB: googleScriptBundleWrapper
                }
            }

        }

    });

    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['browserify']);

};