const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');

// SASS task
gulp.task('sass', () => {
  // Look in this directory, in all its sub-directories for sass files
  gulp.src('./public/**/*.sass')
    // Convert Sass to CSS with gulp-sass, logging an error if there is one
    .pipe(sass().on('error', sass.logError))
    // Put the converted sass files here
    .pipe(gulp.dest('./public'))
    // After the files have been compiled reload the browser
    .pipe(browserSync.reload({
      stream: true,
    }));
});

// browserSync task
gulp.task('serve', () => {
  browserSync.init({
    // set up a proxy by telling browser sync where the project is
    proxy: 'http://localhost:3000',
    // Tell browser sync what browsers to open on
    browser: 'google chrome',
  });
});

// watching tasks
gulp.task('watch', ['serve', 'sass'], () => {
  // watch for changes to any file in public that ends with .sass, if it changes run the sass task
  gulp.watch('./public/**/*.sass', ['sass']);

  // watch for changes to any handlebars files, if they change reload the browser
  gulp.watch('./src/views/**/*.hbs', browserSync.reload);
});

// Set up a default task - typing gulp in the command line runs the tasks in the array
gulp.task('default', ['watch']);
