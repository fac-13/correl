const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', () => {
  // Look in this directory, in all its sub-directories for sass files
  gulp.src('./public/**/*.sass')
    // Convert Sass to CSS with gulp-sass, logging an error if there is one
    .pipe(sass().on('error', sass.logError))
    // Put the converted sass files here
    .pipe(gulp.dest('./public'));
});

// watching tasks
gulp.task('watch', () => {
  // watch for changes to any file in public that ends with .sass, if it changes run the sass task
  gulp.watch('./public/**/*.sass', ['sass']);
});

// Set up a default task - typing gulp in the command line runs the tasks in the array
gulp.task('default', ['sass', 'watch']);
