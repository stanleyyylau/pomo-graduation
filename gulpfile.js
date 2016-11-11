var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
// var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

// File paths
var CSS_PATH = 'css';
var SASS_PATH = 'sass/main.scss';

// Styles For SCSS
gulp.task('sass', function () {
	console.log('starting styles task');
	return gulp.src(SASS_PATH)
		.pipe(plumber(function (err) {
			console.log('Styles Task Error');
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(postcss([ autoprefixer({ browsers: ['last 100 versions'] }) ]))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(CSS_PATH))
		.pipe(browserSync.stream())
});

// Images
gulp.task('images', function () {
	console.log('starting images task');
});

// gulp.task('default', function () {
// 	console.log('Starting default task');
// });

gulp.task('default', ['sass'], function() {
    browserSync.init({
        files: '*',
        server: {
                baseDir: '.'
            }
    });
    gulp.watch('sass/**/*.scss', ['sass']);
});

// Gulp build return minified version of CSS with no source mapping info
gulp.task('build', function() {
	console.log('building styles...');
	return gulp.src(SASS_PATH)
		.pipe(autoprefixer())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(gulp.dest(CSS_PATH))
});
