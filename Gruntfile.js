module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        webmake: {
            options: {
                // see https://github.com/medikoo/modules-webmake#options
            },
            app: {
                files: {
                    'dist/moysklad-client.gs': ['src/app/index.js']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['webmake']);

};