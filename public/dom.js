/* eslint-disable */
var xhr = function(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      cb(null, response);
    } else {
      cb(new TypeError('XHR error' + xhr.status));
    }
  });
  xhr.open('GET', url, true);
  xhr.send();
}






d3.select('#graph').attr('class', 'test')
var scales = document.querySelectorAll('input[type=range]')
// we need to use an array of comments from the database - this one is for testing only
const test = ['No pain', '', '', '', '4 means I take some pain medication', '', '', '', 'Can\'t focus on anything but my pain', '', ''];

scales.forEach((scale) => {
    scale.addEventListener('change', function () {
        var currentScaleId = `${this.id}`; //e.g. gives scale-fatigue
        var commentBoxId = `comment${currentScaleId.slice(currentScaleId.indexOf('-'))}`;
        var scaleNumberId = `${this.id}-number`;
        var scaleNumber = document.querySelector(`#${scaleNumberId}`);
        var commentBox = document.querySelector(`#${commentBoxId}`);


        scaleNumber.textContent = `${this.value}`;
        commentBox.textContent = test[this.value] === '' ? "Any comments you've saved will appear here as you move the scale" : `Hint: ${test[this.value]}`
    })
})


