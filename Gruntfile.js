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

        //TODO Очень запутанное описание зборки (нужно дать подробные пояснения)
        browserify: {

            // Сборка для Google Script
            // Набор библиотек
            'vendor.gs': {
                src: [
                    //'vendor/jsonix/index.js'
                ],
                dest: 'build/gs/vendor.gs',
                options: {
                    pkg: pkg,
                    description: 'Сборка внешних библиотек: lodash, moment, stampit, xmldom, jsonix, moneytostr',

                    require: [
                        'xmldom',
                        'jsonix',
                        './vendor/moneytostr'
                    ],
                    alias: [
                        //'./node_modules/lodash/dist/lodash.min.js:lodash',
                        './node_modules/moment/min/moment.min.js:moment',
                        './node_modules/stampit/dist/stampit.min.js:stampit'
                    ],
                    exclude: [
                        'xmlhttprequest'
                    ],

                    postBundleCB: postBundleProcessor
                }
            },
            // Объектная модель
            'map.gs': {
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
            // Клиент
            'client.gs': {
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
                        //'./node_modules/lodash/dist/lodash.min.js:lodash',
                        './node_modules/moment/min/moment.min.js:moment',
                        './node_modules/stampit/dist/stampit.min.js:stampit'
                    ]),
                    external: [
                        'xmldom',
                        'jsonix',
                        './vendor/moneytostr',
                        './res/mapping',
                        './res/mapping-xsd-fix'
                    ],
                    exclude: [
                        'fs',
                        //'./node_modules/lodash/dist/lodash.min.js',
                        'lodash',
                        './node_modules/moment/min/moment.min.js',
                        './node_modules/stampit/dist/stampit.min.js'
                    ],
                    //fullPaths: true
                    postBundleCB: postBundleProcessor
                }
            },


            // Сборка для браузера одним файлом
            'moysklad-client.js': {
                src: ['src/moysklad-client/index.js'],
                dest: 'build/browser/moysklad-client.js',
                options: {
                    pkg: pkg,
                    description: 'Сборка библиотеки moysklad-client для браузера',

                    //standalone: 'Bundle',
                    alias: getContextSpecificAliases('browser', [
                        'fetch',
                        'default-auth',
                        'logger'
                    ]).concat([
                        './src/moysklad-client/index.js:moysklad-client',
                        //'./node_modules/lodash/dist/lodash.min.js:lodash',
                        './node_modules/moment/min/moment.min.js:moment',
                        './node_modules/stampit/dist/stampit.min.js:stampit',
                        './src/node_modules/project/xmldom/browser:xmldom'
                    ]),
                    exclude: ['fs', 'xmlhttprequest'],

                    //fullPaths: true
                    postBundleCB: postBundleProcessor
                }
            }
        },

        concat: {

            // Сборка обертки для аддона Taist
            taist: {
                src: [
                    'res/taist/start_wrapper.txt',
                    'build/browser/moysklad-client.js',
                    'res/taist/end_wrapper.txt'
                ],
                dest: 'build/taist/moysklad-client.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');




    // Генерация объектной модели на основе XSD
    grunt.registerTask('object-map', ['copy:map']);

    // Сборка для Google Script
    grunt.registerTask('gs-vendor', ['browserify:vendor.gs']);
    grunt.registerTask('gs-map',    ['browserify:map.gs']);
    grunt.registerTask('gs-client', ['browserify:client.gs']);

    grunt.registerTask('gs-all', [
        'browserify:vendor.gs',
        'browserify:map.gs',
        'browserify:client.gs'
    ]);

    // Сборка для браузера
    grunt.registerTask('browser', ['browserify:moysklad-client.js']);

    // Сборка для taist
    grunt.registerTask('taist', ['browserify:moysklad-client.js', 'concat:taist']);

    // Генерация модели и сборок
    grunt.registerTask('default', ['object-map', 'browserify', 'concat:taist']);

};