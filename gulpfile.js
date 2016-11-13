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
var pug = require('gulp-pug');

// File paths
var CSS_PATH = 'css';
var SASS_PATH = 'sass/main.scss';
var HTML_PATH = 'html';

// Styles For SCSS
gulp.task('sass', function () {
	console.log('starting styles task');
	return gulp.src(SASS_PATH)
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(postcss([ autoprefixer({ browsers: ['last 100 versions'] }) ]))
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

gulp.task('default', ['views', 'sass'], function() {
    browserSync.init({
        files: '*',
        server: {
                baseDir: '.'
            }
    });
    gulp.watch('sass/**/*.scss', ['sass']);
		gulp.watch('views/**/*.pug', ['views']);
});

gulp.task('views', function buildHTML() {
  return gulp.src('views/*.pug')
  .pipe(pug({
    pretty: true,
		locals: {
			gradP: {
				title: '毕业季节宣传页面',
				backEndUrl: 'https://st-portfolio-on.herokuapp.com/message'
			}
		}
  }))
	.pipe(gulp.dest(HTML_PATH))
});


// Gulp build return minified version of CSS with no source mapping info
gulp.task('build', function() {
	console.log('building styles...');
	return gulp.src(SASS_PATH)
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(postcss([ autoprefixer({ browsers: ['last 100 versions'] }) ]))
		.pipe(gulp.dest(CSS_PATH))
});
