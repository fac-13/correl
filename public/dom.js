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
var chart_width = 700;
var chart_height =500;
var padding = 100;

var formatTime = d3.timeParse('%Y-%m-%dT%H:%M:%S.%L%Z');


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

var groupData = function(data, container, typePlural, type) {
  var arr = data[typePlural];
  var uniqueNames = [];

  var j = 0;

  // creating an array of the names of the unique symptoms
  arr.forEach(function(obj){
    if(!uniqueNames.includes(obj[type])) {
      uniqueNames.push(obj[type]);
    }
  });

  // looping through the names of the types and creating a new array for each one
  for(var i=0; i < uniqueNames.length; i++) {
    container.push(new Array());
  }

  // adding all objects with the same type name to an array
  uniqueNames.forEach(function(x) {
    container[j] = arr.filter(function(obj) {
      return obj[type] === x;
    });
    j++;
  });

  // uniqueNames.forEach(function(name){

  //   var line = d3
  //     .line()
  //     .x(function(d){
  //       return x_scale(d.date_entered)
  //     })
  //     .y(function(d){
  //       return y_scale(d.rating)
  //     });



}

var sympContainer = [];
var factContainer = [];

groupData(testData, sympContainer, 'symptoms', 'symptom');
groupData(testData, factContainer, 'factors', 'factor');


var renderGraph = function (err, response) {
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
      d3.min(testData.symptoms, function(obj) {
      return obj.date_entered;
    });

    var minFactDate =  d3.min(testData.factors, function(obj) {
      return obj.date_entered;
    });

    var dates = [minSympDate, minFactDate];
    var minDate = d3.min(dates);

    var maxSympDate = d3.max(testData.symptoms, function(obj) {
      return obj.date_entered;
    });

    var maxFactDate =  d3.max(testData.factors, function(obj) {
      return obj.date_entered;
    });

    var dates = [maxSympDate, maxFactDate];
    var maxDate = d3.max(dates);

    // use these min/max values to set up scales
    var x_scale = d3
      .scaleTime()
      .domain([minDate, maxDate])
      .range([padding, chart_width - padding]);

    var y_scale = d3
      .scaleLinear()
      .domain([0,10])
      .range([chart_height - padding, padding]);

    // create svg
    var svg = d3
      .select('#graph')
      .append('svg')
        .attr('width', chart_width)
        .attr('height', chart_height);

    // create axes
    var x_axis = d3
      .axisBottom(x_scale)
      .tickFormat(d3.timeFormat('%d-%m-%Y')).ticks(d3.timeDay);

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



    // Create line - used to create all other lines
    var line = d3
      .line() 
      .x(function(d) {
        return x_scale(d.date_entered);
      })
      .y(function(d) {
        return y_scale(d.rating)
      });
    
    // Create color palettes - used for line colours and legend  
    var colorsSymPalette = d3.scaleOrdinal(d3.schemeCategory10); 
    var colorsFactPalette = d3.scaleOrdinal(d3.schemeSet3);
      
    // Add lines for each of the symptoms to the graph  
    var symptoms = svg
      .selectAll('.symptoms')
      .data(sympContainer)
      .enter()
      .append('g')
        .attr('class', 'symptoms')
        .attr('class', function(d) {
          return d[0].symptom;
        })
        .attr('id', function(d) {
          return d[0].symptom + '-line';
        })

    symptoms
      .append('path')
        .attr('fill', 'none')
        .attr('data-legend', function(d) {
          return d.symptom;
        })
        .style('stroke', function(d, i) {
          return colorsSymPalette(i); 
        })
        .attr('stroke-width', 3)
        .attr('d', function(d) {
          return line(d);
        })
        .attr('class', function(d) {
          return d[0].symptom;
        });


      // CODE TO ADD LABELS TO THE END OF THE LINES
    // symptoms
    //   .append('text')
    //   .datum(function(d, i){
    //     return {symptom: d[i].symptom, date_entered: d[d.length-1].date_entered, rating: d[d.length-1].rating }
    //   })
    //   .attr('transform', function(d){
    //     return 'translate(' + x_scale(d.date_entered) + ',' + y_scale(d.rating) + ')';
    //   })
    //   .attr('x', 3)
    //   .attr('dy', '0.35em')
    //   .style('font', '10px sans-serif')
    //   .text(function(d){
    //     return d.symptom;
    //   })

    // Add lines for each of the factors to the graph
    var factors = svg
      .selectAll('.factors')
      .data(factContainer)
      .enter()
      .append('g')
        .attr('class', 'factors')
        .attr('class', function(d) {
          return d[0].factor;
        });

    factors
      .append('path')
        .attr('fill', 'none')
        .attr('data-legend', function(d) {
          return d.factor;
        })
        .style('stroke', function(d, i) {
          return colorsFactPalette(i);
        })
        .attr('stroke-width', 3)
        .attr('d', function(d) {
          return line(d);
        })
        .attr('class', function(d) {
          return d[0].factor;
        });
      
    // Create legend for symptoms 
    var sympLegend = svg
      .selectAll('.legend')
      .data(sympContainer)
      .enter()
      .append('g')
        .attr('transform', function(d, i) {
          return "translate(" + (chart_width - 200) + "," + (i * 15 + 20) + ")";
        })
        .attr('class', '.legend')
        .attr('class', function(d) {
          return d[0].symptom;
        });

    sympLegend
      .append('rect')
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', function(d, i) {
          return colorsSymPalette(i); 
        })
        .attr('class', function(d) {
          return d[0].symptom;
        })
        .style('opacity', 1)
        .on('click', function(d) {
          // Create variable for the legend key that was clicked
          var legendKey = this;

          // Find the corresponding line
          var lineForKey = document.querySelector('#' + d[0].symptom + '-line');

          if(legendKey.style.opacity == 1) {
            // Change legendKey opacity to indicate that it was clicked
            d3
            .select(legendKey)
              .style('opacity', 0.25);

            // Now hide the corresponding scale
            d3
            .select(lineForKey)
              .style('display', 'none');

          } else {
            // Show both the legend and the scale 
            d3
            .select(legendKey)
              .style('opacity', 1);

            d3
            .select(lineForKey)
              .style('display', 'block');
          }
        });

    sympLegend
      .append('text')
        .text(function(d) {
          return d[0].symptom;
        })
        .attr('transform', function(d, i) {
          return "translate(20,10)";
        })
        .attr('class', function(d) {
          return d[0].symptom;
        });
        
    // create legend for factors
    var factLegend = svg
      .selectAll('.legend')
      .data(factContainer)
      .enter()
      .append('g')
        .attr('transform', function(d, i) {
          return "translate(" + (chart_width - 200) + "," + (i * 15 + 60) + ")";
        })
        .attr('class', '.legend')
        .attr('class', function(d) {
          return d[0].factor;
        });

    factLegend
      .append('rect')
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', function(d, i) {
          return colorsFactPalette(i); 
        })
        .attr('class', function(d) {
          return d[0].factor;
        });

    factLegend
      .append('text')
        .text(function(d) {
          return d[0].factor;
        })
        .attr('transform', function(d, i) {
          return "translate(20,10)";
        })
        .attr('class', function(d) {
          return d[0].factor;
        });


      // svg
      // .append('path')
      // .datum(sympContainer[0])
      // .attr('fill', 'none')
      // .attr('stroke', '#73FF36')
      // .attr('stroke-width', 5)
      // .attr('d', line);


  }
};

makeRequest('/getGraphData', renderGraph);

