
module.exports = function (grunt) {

    var _ = require('lodash');

    // Gets inserted at the top of the generated files in dist/.
    var BANNER = [
        '/*! <%= pkg.name %> - v<%= pkg.version %> - ',
        '<%= grunt.template.today("yyyy-mm-dd") %> - <%= pkg.author %> */\n'
    ].join('');

    var googleScriptBundleWrapper = function (err, src, next) {
        var modifiedSrc;
        if(!err) {
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
        console.log('getContextSpecificAliases');
        return _.map(modules, function (moduleItem) {
            return 'src/node_modules/' + moduleItem + '/' + context + '.js:' + moduleItem;
        })
    };

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        browserify: {

            'some.all': {
                src: ['some/build-test/app.js'],
                dest: 'dist/bundles/some/main-test.js',
                options: {
                    //debug: true,
                    standalone: 'Bundle',
                    //postBundleCB: googleScriptBundleWrapper,
                    alias: [
                        'some/build-test/node_modules/logger/gs.js:logger'
                    ],
                    /*aliasMappings: [
                        {
                            cwd: 'some/build-test/adapter/node',
                            src: ['logger.js'],
                            dest: 'some/build-test/adapter/gs'
                        },
                        {
                            cwd: 'some/build-test/adapter/gs',
                            src: ['logger.js'],
                            dest: './adapter/node',
                            flatten: false
                        }
                    ]*/
                }
            },

            'gs.all': {
                src: ['src/moysklad/moysklad-client.js'],
                dest: 'dist/bundles/gs/moysklad-client.js',
                options: {
                    standalone: 'Bundle',
                    alias: getContextSpecificAliases('gs', [
                        'jsonix',
                        'logger',
                        'tools',
                        'xmldom',
                        'xmlhttprequest'
                    ]),
                    postBundleCB: googleScriptBundleWrapper
                }
            }

            /*'browser.all': {
                src: ['src/moysklad/moysklad-client.js'],
                dest: 'dist/bundles/browser/moysklad-client.js',
                options: {
                    alias: [
                        'src/adapters/browser/xmldom.js:xmldom',
                        'src/adapters/browser/xmlhttprequest.js:xmlhttprequest'
                    ]
                }
            }*/

        }

    });

    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['browserify']);

    grunt.registerTask('some', ['browserify:some.all']);

    grunt.registerTask('gs', ['browserify:gs.all']);

};