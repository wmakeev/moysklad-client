var _ = require('lodash');

//TODO Добавить в бандл заголовок со временем генерации

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

        copy: {
            map: {
                src: 'res/MOYsklad.xsd',
                dest: 'res/mapping.json',
                options: {
                    process: function (content) {
                        var mappingObj = require('./src/mapping').generate(content);
                        return JSON.stringify(mappingObj);
                    }
                }
            }
        },

        browserify: {

            'vendor': {
                src: [
                    //'vendor/jsonix/index.js'
                ],
                dest: 'build/gs/vendor.gs',
                options: {
                    require: [
                        'xmldom',
                        './vendor/jsonix'
                    ],
                    alias: [
                        './node_modules/lodash/dist/lodash.min.js:lodash',
                        './node_modules/moment/min/moment.min.js:moment',
                        './node_modules/stampit/dist/stampit.min.js:stampit'
                    ],
                    exclude: [
                        'xmlhttprequest'
                    ]
                }
            },

            'map': {
                src: [],
                dest: 'build/gs/map.gs',
                options: {
                    require: [
                        './res/mapping',
                        './res/mapping-xsd-fix'
                    ]
                }
            },

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
                        'xmldom',
                        './vendor/jsonix',
                        './res/mapping',
                        './res/mapping-xsd-fix'
                    ],
                    exclude: [
                        'fs',
                        './node_modules/lodash/dist/lodash.min.js',
                        './node_modules/moment/min/moment.min.js',
                        './node_modules/stampit/dist/stampit.min.js'
                    ],
                    //fullPaths: true
                    //postBundleCB: googleScriptBundleWrapper
                }
            }
        }

        /*concat: {
            'build/gs/bundle.gs': [
                'build/gs/vendor.gs',
                'build/gs/client.gs',
                'build/gs/map.gs'
            ]
        }*/

    });

    grunt.loadNpmTasks('grunt-browserify');
    //grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['browserify']);

    grunt.registerTask('vendor', ['browserify:vendor']);
    grunt.registerTask('map', ['copy:map']);
    grunt.registerTask('client', ['browserify:client']);

    grunt.registerTask('all', ['map', 'browserify']);

};