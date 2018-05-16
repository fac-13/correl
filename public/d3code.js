/*eslint-disable */
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

// global variables
let chart_width = 700;
let chart_height = 500;
let padding = 100;

let formatTime = d3.timeParse('%Y-%m-%dT%H:%M:%S.%L%Z');


let testData = {
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

let groupData = function (data, container, typePlural, type) {
  let arr = data[typePlural];
  let uniqueNames = [];

  let j = 0;

  // creating an array of the names of the unique symptoms
  arr.forEach((obj) => {
      if(!uniqueNames.includes(obj[type])) {
        uniqueNames.push(obj[type]);
      }
    });

  // looping through the names of the types and creating a new array for each one
  for (let i = 0; i < uniqueNames.length; i++) {
    container.push(new Array());
  }

  // adding all objects with the same type name to an array
  uniqueNames.forEach((x) => {
      container[j] = arr.filter(function(obj) {
        return obj[type] === x;
      });
      j++;
    });
};

let sympContainer = [];
let factContainer = [];

groupData(testData, sympContainer, 'symptoms', 'symptom');
groupData(testData, factContainer, 'factors', 'factor');


let renderGraph = function (err, response) {
  if (err) {
    console.log(err);
  } else {
    let dateTime = formatTime(testData.factors[0].date_entered);

    // Change date_entered into d3's required time format
    testData.symptoms.forEach((obj) => {
        obj.date_entered = formatTime(obj.date_entered);
    });

    testData.factors.forEach((obj) => {
        obj.date_entered = formatTime(obj.date_entered);
    });

    // Scales
    // find minimum and maximum values
    let minSympDate =d3.min(testData.symptoms, (obj) => {
        return obj.date_entered;
    });

    let minFactDate = d3.min(testData.factors, (obj) => {
        return obj.date_entered;
      });

    var dates = [minSympDate, minFactDate];
    let minDate = d3.min(dates);

    let maxSympDate = d3.max(testData.symptoms, (obj) => {
        return obj.date_entered;
    });

    let maxFactDate = d3.max(testData.factors, (obj) => {
        return obj.date_entered;
    });

    var dates = [maxSympDate, maxFactDate];
    let maxDate = d3.max(dates);

    // use these min/max values to set up scales
    let x_scale = d3
      .scaleTime()
      .domain([minDate, maxDate])
      .range([padding, chart_width - padding]);

    let y_scale = d3
      .scaleLinear()
      .domain([0, 10])
      .range([chart_height - padding, padding]);

      // create svg
    let svg = d3
      .select('#graph')
      .append('svg')
      .attr('width', chart_width)
      .attr('height', chart_height);

      // create axes
    let x_axis = d3
      .axisBottom(x_scale)
      .tickFormat(d3.timeFormat('%d-%m-%Y')).ticks(d3.timeDay);

    let y_axis = d3
      .axisLeft(y_scale)
      .ticks(11);

    svg
      .append('g')
      .attr('transform', `translate(0,${  chart_height - padding  })`)
      .call(x_axis);

    svg
      .append('g')
      .attr('transform', `translate(${  padding  }, 0)`)
      .call(y_axis);



      // Create line - used to create all other lines
    let line = d3
      .line()
      .x((d) => {
          return x_scale(d.date_entered);
        })
      .y((d) => {
          return y_scale(d.rating)
        });

    // Create color palettes - used for line colours and legend
    let colorsSymPalette = d3.scaleOrdinal(d3.schemeCategory10);
    let colorsFactPalette = d3.scaleOrdinal(d3.schemeSet3);

    // Calculate path length of lines 
    // From https://stackoverflow.com/questions/30355241/get-the-length-of-a-svg-line-rect-polygon-and-circle-tags/30376660
    var getPathLength = function(el) {
      var pathCoords = el.get(0);
      var pathLength = pathCoords.getTotalLength();
        return pathLength;
    }

    var totalLength = chart_width*3

    // Add lines for each of the symptoms to the graph
    let symptoms = svg
      .selectAll('.symptoms')
      .data(sympContainer)
      .enter()
      .append('g')
      .attr('class', 'symptoms')
      .attr('class', (d) => {
            return d[0].symptom;
      })
      .attr('id', (d) => {
            return d[0].symptom + '-line';
          });

    symptoms
      .append('path')
      .attr('fill', 'none')
      .attr('data-legend', (d) => {
            return d.symptom;
          })
      .style('stroke', (d, i) => {
            return colorsSymPalette(i); 
          })
      .attr('stroke-width', 3)
      .attr('d', (d) => {
            return line(d);
          })
      .attr('class', (d) => {
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
    let factors = svg
      .selectAll('.factors')
      .data(factContainer)
      .enter()
      .append('g')
      .attr('class', 'factors')
      .attr('class', (d) => {
            return d[0].factor;
          })
      .attr('id', (d) => {
            return d[0].factor + '-line';
          });

    factors
      .append('path')
      .attr('fill', 'none')
      .attr('data-legend', (d) => {
            return d.factor;
          })
      .style('stroke', (d, i) => {
            return colorsFactPalette(i);
          })
      .attr('stroke-width', 3)
      .attr('d', (d) => {
            return line(d);
          })
      .attr('class', (d) => {
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
    let sympLegend = svg
      .selectAll('.legend')
      .data(sympContainer)
      .enter()
      .append('g')
      .attr('transform', (d, i) => {
            return "translate(" + (chart_width - 200) + "," + (i * 15 + 20) + ")";
          })
      .attr('class', '.legend')
      .attr('class', (d) => {
            return d[0].symptom;
          });

    sympLegend
      .append('rect')
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', (d, i) => {
            return colorsSymPalette(i); 
          })
      .attr('class', (d) => {
            return d[0].symptom;
          })
      .style('opacity', 1)
      .on('click', function (d) {
        let legendKey = this;
        toggleLines(d, legendKey, 'symptom');
      });

    sympLegend
      .append('text')
      .text((d) => {
            return d[0].symptom;
          })
      .attr('transform', (d, i) => {
            return "translate(20,10)";
          })
      .attr('class', (d) => {
            return d[0].symptom;
          });

    // create legend for factors
    let factLegend = svg
      .selectAll('.legend')
      .data(factContainer)
      .enter()
      .append('g')
      .attr('transform', (d, i) => {
            return "translate(" + (chart_width - 200) + "," + (i * 15 + 60) + ")";
          })
      .attr('class', '.legend')
      .attr('class', (d) => {
            return d[0].factor;
          });

    factLegend
      .append('rect')
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', (d, i) => {
            return colorsFactPalette(i); 
          })
      .attr('class', (d) => {
            return d[0].factor;
          })
      .style('opacity', 1)
      .on('click', function (d) {
        // Create variable for the legend key that was clicked
        let legendKey = this;
        toggleLines(d, legendKey, 'factor');
      });

    factLegend
      .append('text')
      .text((d) => {
            return d[0].factor;
          })
      .attr('transform', (d, i) => {
            return "translate(20,10)";
          })
      .attr('class', (d) => {
            return d[0].factor;
          });
  }
};

makeRequest('/getGraphData', renderGraph);

function toggleLines(d, legendKey, type) {
  // Find the corresponding line
  let lineForKey = document.querySelector(`#${  d[0][type]  }-line`);

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
