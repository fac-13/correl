/*eslint-disable */
var makeRequest = function (url, cb) {
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
};

// global variables
var chart_width = 700;
var chart_height = 500;
var padding = 100;

var formatTime = d3.timeParse('%Y-%m-%dT%H:%M:%S.%L%Z');


var testData = {
  symptoms: [
    { symptom: 'fatigue', rating: 3, date_entered: '2018-03-11T11:30:00.000Z' },
    { symptom: 'fatigue', rating: 8, date_entered: '2018-03-12T11:30:00.000Z' },
    { symptom: 'mood', rating: 6, date_entered: '2018-03-12T11:30:00.000Z' },
    { symptom: 'fatigue', rating: 7, date_entered: '2018-03-12T11:30:00.000Z' },
    { symptom: 'mood', rating: 7, date_entered: '2018-03-12T11:30:00.000Z' },
    { symptom: 'fatigue', rating: 9, date_entered: '2018-03-14T09:15:00.000Z' },
    { symptom: 'mood', rating: 6, date_entered: '2018-03-14T09:15:00.000Z' },
    { symptom: 'fatigue', rating: 7, date_entered: '2018-03-15T08:18:00.000Z' },
    { symptom: 'mood', rating: 7, date_entered: '2018-03-15T08:18:00.000Z' },
    { symptom: 'fatigue', rating: 9, date_entered: '2018-03-16T12:09:00.000Z' },
    { symptom: 'mood', rating: 6, date_entered: '2018-03-16T12:09:00.000Z' }],
  factors: [
    { factor: 'sleep', rating: 3, date_entered: '2018-03-12T11:30:00.000Z' },
    { factor: 'water', rating: 5, date_entered: '2018-03-12T11:30:00.000Z' },
    { factor: 'sleep', rating: 4, date_entered: '2018-03-13T07:18:00.000Z' },
    { factor: 'water', rating: 4, date_entered: '2018-03-13T07:18:00.000Z' },
    { factor: 'sleep', rating: 5, date_entered: '2018-03-14T09:15:00.000Z' },
    { factor: 'water', rating: 4, date_entered: '2018-03-14T09:15:00.000Z' },
    { factor: 'sleep', rating: 2, date_entered: '2018-03-15T08:18:00.000Z' },
    { factor: 'water', rating: 4, date_entered: '2018-03-15T08:18:00.000Z' },
    { factor: 'sleep', rating: 3, date_entered: '2018-03-16T12:09:00.000Z' },
    { factor: 'water', rating: 6, date_entered: '2018-03-16T12:09:00.000Z' }],
};

var groupData = function (data, container, typePlural, type) {
  var arr = data[typePlural];
  var uniqueNames = [];

  var j = 0;

  // creating an array of the names of the unique symptoms
  arr.forEach(function(obj) {
      if(!uniqueNames.includes(obj[type])) {
        uniqueNames.push(obj[type]);
      }
    });

  // looping through the names of the types and creating a new array for each one
  for (var i = 0; i < uniqueNames.length; i++) {
    container.push(new Array());
  }

  // adding all objects with the same type name to an array
  uniqueNames.forEach(function(x){
      container[j] = arr.filter(function(obj) {
        return obj[type] === x;
      });
      j++;
    });
};

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
    testData.symptoms.forEach(function(obj){
        obj.date_entered = formatTime(obj.date_entered);
    });

    testData.factors.forEach(function(obj){
        obj.date_entered = formatTime(obj.date_entered);
    });

    // Scales
    // find minimum and maximum values
    var minSympDate =d3.min(testData.symptoms, function(obj){
        return obj.date_entered;
    });

    var minFactDate = d3.min(testData.factors, function(obj){
        return obj.date_entered;
      });

    var dates = [minSympDate, minFactDate];
    var minDate = d3.min(dates);

    var maxSympDate = d3.max(testData.symptoms, function (obj) {
        return obj.date_entered;
    });

    var maxFactDate = d3.max(testData.factors, function(obj){
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
      .domain([0, 10])
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
      .attr('transform', 'translate(0,' + (chart_height - padding)  +')')
      .call(x_axis);

    svg
      .append('g')
      .attr('transform', 'translate(' +  padding + ', 0)')
      .call(y_axis);



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

    // Calculate path length of lines
    // From https://stackoverflow.com/questions/30355241/get-the-length-of-a-svg-line-rect-polygon-and-circle-tags/30376660
    var getPathLength = function(el) {
      var pathCoords = el.get(0);
      var pathLength = pathCoords.getTotalLength();
        return pathLength;
    }

    var totalLength = chart_width*3

    // Add lines for each of the symptoms to the graph
    var symptoms = svg
      .selectAll('.symptoms')
      .data(sympContainer)
      .enter()
      .append('g')
      .attr('class', 'symptoms')
      .attr('class', function (d){
            return d[0].symptom;
      })
      .attr('id', function(d) {
            return d[0].symptom + '-line';
          });

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

    // Animate line drawing for symptom
    symptoms
        .attr('stroke-dasharray', totalLength + ' ' + totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition()
          .duration(9000)
          .ease(d3.easeLinear)
          .attr('stroke-dashoffset', 0)


    // Add lines for each of the factors to the graph
    var factors = svg
      .selectAll('.factors')
      .data(factContainer)
      .enter()
      .append('g')
      .attr('class', 'factors')
      .attr('class', function(d) {
            return d[0].factor;
          })
      .attr('id', function(d) {
            return d[0].factor + '-line';
          });

    factors
      .append('path')
      .attr('fill', 'none')
      .attr('data-legend', function(d) {
            return d.factor;
          })
      .style('stroke', function (d, i) {
            return colorsFactPalette(i);
          })
      .attr('stroke-width', 3)
      .attr('d', function(d) {
            return line(d);
          })
      .attr('class', function(d) {
            return d[0].factor;
          });

    // Animate line drawing for factor
      factors
        .attr('stroke-dasharray', totalLength + ' ' + totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition()
          .duration(9000)
          .ease(d3.easeLinear)
          .attr('stroke-dashoffset', 0)

    // Create legend for symptoms
    var sympLegend = svg
      .selectAll('.legend')
      .data(sympContainer)
      .enter()
      .append('g')
      .attr('transform', function (d, i) {
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
      .attr('fill', function (d, i){
            return colorsSymPalette(i);
          })
      .attr('class', function(d) {
            return d[0].symptom;
          })
      .style('opacity', 1)
      .on('click', function (d) {
        var legendKey = this;
        toggleLines(d, legendKey, 'symptom');
      });

    sympLegend
      .append('text')
      .text(function(d) {
            return d[0].symptom;
          })
      .attr('transform', function (d, i) {
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
      .attr('transform', function (d, i){
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
      .attr('fill', function (d, i) {
            return colorsFactPalette(i);
          })
      .attr('class', function(d) {
            return d[0].factor;
          })
      .style('opacity', 1)
      .on('click', function (d) {
        // Create variable for the legend key that was clicked
        var legendKey = this;
        toggleLines(d, legendKey, 'factor');
      });

    factLegend
      .append('text')
      .text(function(d) {
            return d[0].factor;
          })
      .attr('transform', function (d, i){
            return "translate(20,10)";
          })
      .attr('class', function(d) {
            return d[0].factor;
          });
  }
};

makeRequest('/getGraphData', renderGraph);

function toggleLines(d, legendKey, type) {
  // Find the corresponding line
  var lineForKey = document.querySelector('#' +  d[0][type]  + '-line');

  if (legendKey.style.opacity == 1) {
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
}


// make it responsive

function responsivefy(svg) {
  // get container + svg aspect ratio
  var container = d3.select(svg.node().parentNode),
      width = parseInt(svg.style("width")),
      height = parseInt(svg.style("height")),
      aspect = width / height;

  // add viewBox and preserveAspectRatio properties,
  // and call resize so that svg resizes on inital page load
  svg.attr("viewBox", "0 0 " + width + " " + height)
      .attr("perserveAspectRatio", "xMinYMid")
      .call(resize);

  // to register multiple listeners for same event type,
  // you need to add namespace, i.e., 'click.foo'
  // necessary if you call invoke this function for multiple svgs
  // api docs: https://github.com/mbostock/d3/wiki/Selections#on
  d3.select(window).on("resize." + container.attr("id"), resize);

  // get width of container and resize svg to fit it
  function resize() {
      var targetWidth = parseInt(container.style("width"));
      svg.attr("width", targetWidth);
      svg.attr("height", Math.round(targetWidth / aspect));
  }
}