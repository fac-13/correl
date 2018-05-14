/*eslint-disable */

// CODE FOR SCALES

var scales = document.querySelectorAll('input[type=range]')
// we need to use an array of comments from the database - this one is for testing only
var test = ['No pain', '', '', '', '4 means I take some pain medication', '', '', '', 'Can\'t focus on anything but my pain', '', ''];

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

var scaleButtons = document.querySelectorAll('.scale-buttons');

scaleButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    let input = button.parentNode.querySelector('input');
    input.classList.remove('hidden');
  });
});


// CODE FOR D3

const makeRequest = function (url, cb) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      cb(null, response);
    } else {
      cb(new TypeError(`XHR error${xhr.status}`));
    }
  });
  xhr.open('GET', url, true);
  xhr.send();
};

//global variables 
var chart_width = 1000;
var chart_height =8000;
var padding = 50;

var formatTime = d3.timeParse('%Y-%m-%dT%H:%M:%S.%L%Z')

const frontRender = function (err, response) {
  if (err) {
    console.log(err);
  } else {
    var dateTime = formatTime('2018-05-13T10:30:10.000Z'); 
    console.log('time formmatted by d3', dateTime);
    d3.select('#graph')

  }
};

makeRequest('/getGraphData', frontRender);

