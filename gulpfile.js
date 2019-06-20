var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('sass', async function() {
    return gulp.src('app/sass/main.sass')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
});