var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		browserSync  = require('browser-sync').create(),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglify-es').default,
		cleancss     = require('gulp-clean-css'),
		autoprefixer = require('gulp-autoprefixer'),
		rsync        = require('gulp-rsync'),
		newer        = require('gulp-newer'),
		rename       = require('gulp-rename'),
		responsive   = require('gulp-responsive'),
		del          = require('del');

// Local Server
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// online: false, // Work offline without internet connection
		// tunnel: true, tunnel: 'projectname', // Demonstration page: http://projectname.localtunnel.me
	})
});
function bsReload(done) { browserSync.reload(); done(); };

// Custom Styles
gulp.task('styles', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({
		outputStyle: 'expanded',
		includePaths: [__dirname + '/node_modules']
	}))
	.pipe(concat('styles.min.css'))
	.pipe(autoprefixer({
		grid: true,
		overrideBrowserslist: ['last 10 versions']
	}))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Optional. Comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

// Scripts & JS Libraries
gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/jquery.min.js',
		'app/libs/owlcarousel/owl.carousel.min.js',
		'app/js/_custom.js', // Custom scripts. Always at the end
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) // Minify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

// Code & Reload
gulp.task('code', function() {
	return gulp.src('app/**/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('styles'));
	gulp.watch(['app/js/_custom.js', 'app/js/_libs.js'], gulp.parallel('scripts'));
	gulp.watch('app/*.html', gulp.parallel('code'));
});

gulp.task('default', gulp.parallel('styles', 'scripts', 'browser-sync', 'watch'));
