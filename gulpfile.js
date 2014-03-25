var _ = require('lodash');

var gulp = require('gulp')
    , browserify = require('gulp-browserify')
    , concat = require('gulp-concat')
    , uglify = require('gulp-uglify')
    , beautify = require('gulp-beautify')
    , size = require('gulp-size')
    , todo = require('gulp-todo')
    ;

var getContextSpecificAliases = function (context, modules) {
    console.log('getContextSpecificAliases');
    return _.map(modules, function (moduleItem) {
        return 'src/node_modules/' + moduleItem + '/' + context + '.js:' + moduleItem;
    })
};

gulp.task('scripts', function () {
    gulp.src(['./src/moysklad/moysklad-client.js'])
        .pipe(browserify({
            standalone: 'Bundle',
            alias: getContextSpecificAliases('gs', [
                'jsonix',
                'logger',
                'tools',
                'xmldom',
                'xmlhttprequest'
            ])

        }))
        .pipe(gulp.dest('./dist/bundles/gs/moysklad-client.js'));
});

gulp.task('default', function () {
    // place code for your default task here
    gulp.run('scripts');
});