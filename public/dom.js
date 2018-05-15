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
var chart_width = 500;
var chart_height =500;
var padding = 50;

var formatTime = d3.timeParse('%Y-%m-%dT%H:%M:%S.%L%Z')


var testData = {
  symptoms: [
    {symptom: 'fatigue', rating: 3, date_entered: '2018-03-11T11:30:00.000Z' },
    {symptom: 'fatigue', rating: 8, date_entered: '2018-03-12T11:30:00.000Z' }, 
    {symptom: 'mood', rating: 6, date_entered: '2018-03-12T11:30:00.000Z'}, 
    {symptom: 'fatigue', rating: 7, date_entered: '2018-03-12T11:30:00.000Z'}, 
    {symptom: 'mood', rating: 7, date_entered: '2018-03-12T11:30:00.000Z'},
    {symptom: 'fatigue', rating: 9, date_entered:'2018-03-14T09:15:00.000Z'}, 
    {symptom: 'mood', rating: 6, date_entered: '2018-03-14T09:15:00.000Z'}, 
    {symptom: 'fatigue', rating: 7, date_entered: '2018-03-15T08:18:00.000Z'}, 
    {symptom: 'mood', rating: 7, date_entered: '2018-03-15T08:18:00.000Z'},
    {symptom: 'fatigue', rating: 9, date_entered: '2018-03-16T12:09:00.000Z'}, 
    {symptom: 'mood', rating: 6, date_entered: '2018-03-16T12:09:00.000Z'}],
factors: [
  {factor: 'sleep', rating: 3, date_entered: '2018-03-12T11:30:00.000Z'}, 
  {factor: 'water', rating: 5, date_entered: '2018-03-12T11:30:00.000Z'}, 
  {factor: 'sleep', rating: 4, date_entered: '2018-03-13T07:18:00.000Z'}, 
  {factor: 'water', rating: 4, date_entered: '2018-03-13T07:18:00.000Z'}, 
  {factor: 'sleep', rating: 5, date_entered:'2018-03-14T09:15:00.000Z'}, 
  {factor: 'water', rating: 4, date_entered:'2018-03-14T09:15:00.000Z'}, 
  {factor: 'sleep', rating: 2, date_entered: '2018-03-15T08:18:00.000Z'}, 
  {factor: 'water', rating: 4, date_entered: '2018-03-15T08:18:00.000Z'}, 
  {factor: 'sleep', rating: 3, date_entered: '2018-03-16T12:09:00.000Z'}, 
  {factor: 'water', rating: 6, date_entered: '2018-03-16T12:09:00.000Z'}]
}




const frontRender = function (err, response) {
  if (err) {
    console.log(err);
  } else {
    var dateTime = formatTime(testData.factors[0].date_entered);

    // Change date_entered into d3's required time format
    testData.symptoms.forEach(function(obj) {
      obj.date_entered = formatTime(obj.date_entered);
    });

    testData.factors.forEach(function(obj) {
      obj.date_entered = formatTime(obj.date_entered);
    });

    // Scales
    // find minimum and maximum values
    var minSympDate = 
      d3.min(testData.symptoms, function(obj){
      return obj.date_entered
    })
    var minFactDate =  d3.min(testData.factors, function(obj){
      return obj.date_entered
    })
    var dates = [minSympDate, minFactDate]
    var minDate = d3.min(dates)
    console.log(minDate)

    var maxSympDate = 
      d3.max(testData.symptoms, function(obj){
      return obj.date_entered
    })
    var maxFactDate =  d3.max(testData.factors, function(obj){
      return obj.date_entered
    })
    var dates = [maxSympDate, maxFactDate]
    var maxDate = d3.max(dates)

    // use these min/max values to set up scales
    var x_scale = d3
      .scaleTime()
      .domain([minDate, maxDate])
      .range([padding, chart_width - padding])

    var y_scale = d3
      .scaleLinear()
      .domain([0,10])
      .range([chart_height - padding, padding])

    // create svg
    var svg = d3
      .select('#graph')
      .append('svg')
      .attr('width', chart_width)
      .attr('height', chart_height);
    
    // create axes
    var x_axis = d3
      .axisBottom(x_scale)
      .tickFormat(d3.timeFormat('%d-%m-%Y')).ticks(d3.timeDay)
  
    var y_axis = d3
      .axisLeft(y_scale)
      .ticks(11);
    
    svg
      .append('g')
      .attr('transform', 'translate(0,' + (chart_height - padding) + ')')
      .call(x_axis);

    svg
      .append('g')
      .attr('transform', 'translate(' + padding + ', 0)')
      .call(y_axis)

    //create line
    var line = d3
      .line()
      .x(function(d){
        return x_scale(d.date_entered)
      })
      .y(function(d){
        return y_scale(d.rating)
      })
   
    var line_2 = d3
      .line()
      .x(function(d){
        return x_scale(d.date_entered)
      })
      .y(function(d){
        return y_scale(d.rating)
      })

   
      svg
      .append('path')
      .datum(testData.symptoms) //symContainer[0]
      .attr('fill', 'none')
      .attr('stroke', '#73FF36')
      .attr('stroke-width', 5)
      .attr('d', line);
      
  }
};

makeRequest('/getGraphData', frontRender);

