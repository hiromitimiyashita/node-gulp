const { src, dest, parallel } = require('gulp');
const rename = require('gulp-rename');
const minifyJS = require('gulp-uglify');
const minifyCSS = require('gulp-uglifycss');
const cssimport = require('gulp-cssimport');
const image = require('gulp-image'); 
const sass = require('gulp-sass')(require('sass'));

sass.compiler = require('node-sass');

const javascript = () => {
   return src('src/assets/js/*.js')
          .pipe(minifyJS())
          .pipe(rename({extname: '.min.js'}))
          .pipe(dest('public/assets/js/'));
};
const css = () => {
   return src('src/assets/css/*.css')
          .pipe(cssimport())
          .pipe(minifyCSS({"maxLineLen": 80, "uglyComments": true}))
          .pipe(rename({extname: '.min.css'}))
          .pipe(dest('public/assets/css/'));
};
const optimizeImage = () => {   // { ! }
    return src('src/assets/images/*.jpg')
           .pipe(image())
           .pipe(dest('public/media/'));
}

const convertSass = () => {
    return src('src/assets/sass/*.scss')
           .pipe(sass({outputStyle: 'compressed'}))
           .pipe(rename({extname: '.min.css'}))
           .pipe(dest('dist/assets/css/'));
}

exports.default = parallel(javascript, css, optimizeImage, convertSass);