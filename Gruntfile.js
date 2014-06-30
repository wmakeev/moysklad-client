var _ = require('lodash');

//TODO Добавить в бандл заголовок со временем генерации

module.exports = function (grunt) {

    var BANER = _.template([
        '// <%= pkg.name %> <%= pkg.version %> (bundle length <%= _src_length %>)',
        '// <%= description %>',
        '//',
        '// <%= pkg.author.name %> (<%= pkg.author.email %>)',
        '// <%= pkg.author.url %>',
        '// \n'
    ].join('\n'));

    var postBundleProcessor = function (err, src, next) {
        if (!err) {
            this._src_length = src.length;
            src = BANER(this) + src;
        }
        next(err, src);
    };

    var getContextSpecificAliases = function (context, modules) {
        //console.log('getContextSpecificAliases');
        return _.map(modules, function (moduleItem) {
            return './src/node_modules/project/' + moduleItem + '/' + context + '.js:project/' + moduleItem;
        })
    };

    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        pkg: pkg,

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
                    pkg: pkg,
                    description: 'Сборка внешних библиотек: lodash, moment, stampit, xmldom, jsonix, moneytostr',

                    require: [
                        'xmldom',
                        './vendor/jsonix',
                        './vendor/moneytostr'
                    ],
                    alias: [
                        './node_modules/lodash/dist/lodash.min.js:lodash',
                        './node_modules/moment/min/moment.min.js:moment',
                        './node_modules/stampit/dist/stampit.min.js:stampit'
                    ],
                    exclude: [
                        'xmlhttprequest'
                    ],

                    postBundleCB: postBundleProcessor
                }
            },

            'map': {
                src: [],
                dest: 'build/gs/map.gs',
                options: {
                    pkg: pkg,
                    description: 'Сборка данных описывающих объектную модель сервиса МойСклад',

                    require: [
                        './res/mapping',
                        './res/mapping-xsd-fix'
                    ],

                    postBundleCB: postBundleProcessor
                }
            },

            'client': {
                src: ['src/moysklad-client/index.js'],
                dest: 'build/gs/client.gs',
                options: {
                    pkg: pkg,
                    description: 'Сборка с кодом основной библиотеки moysklad-client',

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
                        './vendor/moneytostr',
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
                    postBundleCB: postBundleProcessor
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