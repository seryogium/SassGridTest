//var gulp = require('gulp'),
//    sass = require('gulp-sass'),
//    browserSync = require('browser-sync');
//
//gulp.task('sass', function() {
//    return gulp.src('app/sass/**/*.sass')
//    .pipe(sass())
//    .pipe(gulp.dest('app/css'))
//    .pipe(browserSync.reload({stream : true})) // Обнова CSS на странице
//});
//
//gulp.task('browser-sync', function() {
//    browserSync ({ // Выполняем browserSync
//    server: { // Определяем параметры сервера
//    baseDir: 'app' // Директория для сервера -app 
//    },
//    notify: false // Отключаем уведомления
//    });
//});
//
//gulp.task('watch', ['sass', 'browser-sync'],function() {
//    gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
//});
//
//gulp.task('default', gulp.parallel('sass','browser-sync','watch'));
var gulp      = require('gulp'), // Подключаем Gulp
    sass        = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    concat      = require('gulp-concat'), // Конкатенация
    uglify      = require('gulp-uglifyjs'), // Сжатие
    cssnano     = require('gulp-cssnano'), // Minification Css
    rename      = require('gulp-rename'); // rename

gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('app/sass/**/*.sass') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
    });

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
            },
        notify: false // Отключаем уведомления
        });
    });

gulp.task('scripts', function() {
    return gulp.src([ // Taking all needed libraries
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js'
    ])
    .pipe(concat('libs.min.js')) // Собираем в одно целое в новом файле
    .pipe(uglify()) // Compress
    .pipe(gulp.dest('app/js')); // Unload into app/js
});

gulp.task('css-libs', function() {
    return gulp.src('app/sass/libs.sass') //
    .pipe(sass()) // transform
    .pipe(cssnano()) // Compressing
    .pipe(rename({suffix: '.min'})) // Adding suffix
    .pipe(gulp.dest('app/css')); // Unload into app/css
});

gulp.task('watch', function() {
    gulp.watch('app/sass/**/*.sass', gulp.parallel('sass')); // Наблюдение за sass файлами
    gulp.watch('app/*.html', gulp.parallel('code')); // Watchin for HTML
    gulp.watch(['app/js/common.js', 'app/libs/**/*.js'], gulp.parallel('scripts'));
});

gulp.task('default', gulp.parallel('css-libs','sass', 'scripts', 'browser-sync', 'watch'));