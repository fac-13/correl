/* eslint-disable */
var makeRequest = function(url, cb) {
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

var frontRender = function(err, response){
  console.log('in front end render')
  if(err){console.log(err)
  }else{
  console.log(response)
  }
}

makeRequest('/getGraphData', frontRender)




d3.select('#graph').attr('class', 'test')
