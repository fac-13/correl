/* eslint-disable */

var scaleButtons = document.querySelectorAll('.scale-buttons');

scaleButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    let input = button.parentNode.querySelector('input');
    input.classList.remove('hidden');
  });
});