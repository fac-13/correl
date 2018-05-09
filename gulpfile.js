const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', () =>
  gulp.src('./public/**/*.sass') // Look in this directory, in all its sub-directories for sass files
    .pipe(sass()) // Convert Sass to CSS with gulp-sass
    .pipe(gulp.dest('./public'))); // Put the converted sass files here

// watching tasks
gulp.task('watch', () => {
  // watch for changes to any file in public that ends with .sass, if it changes run the sass task
  gulp.watch('./public/**/*.sass', ['sass']);
});

// Set up a default task - typing gulp in the command line runs the tasks in the array
gulp.task('default', ['sass', 'watch']);
