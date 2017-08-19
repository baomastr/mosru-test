var gulp = require ('gulp'),
    watch = require ('gulp-watch'),
    connect = require ('gulp-connect'),
    jade = require ('gulp-jade'),
    stylus = require ('gulp-stylus'),
    minify = require('gulp-minify'),
    nib = require('nib'),
    spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function() {
    var spriteData =
        gulp.src('assets/images/sprite/*.png')
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.styl',
                cssFormat: 'stylus',
                algorithm: 'binary-tree',
                padding: 10,
                cssTemplate: 'stylus.template.mustache',
                cssVarMap: function(sprite) {
                    sprite.name = 'sprite-' + sprite.name
                }
            }));
    spriteData.img.pipe(gulp.dest('dist/images/'));
    spriteData.css.pipe(gulp.dest('stylus'));
});

gulp.task('connect',function(){
    connect.server({
        root: './dist',
        livereload: true,
        port: 1337
    })
});

gulp.task('jade',function(){
    gulp.src('jade/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
});

gulp.task('css', function(){
    gulp.src('stylus/*.styl')
        .pipe(stylus({
            use: nib(),
            compress: true
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
});

gulp.task('js', function() {
    gulp.src('js/*.js')
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '.min.js']
        }))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('watch',function(){
    gulp.watch('stylus/*.styl',['css']);
    gulp.watch('js/*.js',['js']);
    gulp.watch('assets/images/sprite/*.*',['sprite']);
    /*watch('dist/!*.').pipe(connect.reload());*/
});

gulp.task('default',['css','js','watch']);