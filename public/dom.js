/* eslint-disable */
var xhr = function (url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
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

// CODE FOR SCALES

var scales = document.querySelectorAll('input[type=range]')

scales.forEach((scale) => {
    scale.addEventListener('change', function () {
        var currentScaleId = this.id; //e.g. gives scale-s1
        var commentBoxId = 'comment' + currentScaleId.slice(currentScaleId.indexOf('-'));
        var scaleNumberId = this.id + '-number';
        var symptomScaleNumber = document.querySelector('#' + scaleNumberId);
        var factorScaleNumber = document.querySelector('#' + scaleNumberId)
        var symptomCommentBox = document.querySelector('#' + commentBoxId);
        var factorCommentBox = document.querySelector('#' + commentBoxId)

        var symptomComment = document.querySelector('#symptom' + currentScaleId.slice(currentScaleId.indexOf('-')) + '-comment-' + this.value);
        var factorComment = document.querySelector('#factor' + currentScaleId.slice(currentScaleId.indexOf('-')) + '-comment-' + this.value);

        if (scale.parentNode.className.includes('symptom')) {
            //Symptoms
            symptomScaleNumber.textContent = this.value;
            symptomCommentBox.textContent = symptomComment.textContent === null || symptomComment.textContent === '' ? "Any comments you've saved will appear here as you move the scale" : symptomComment.textContent;
        } else {
            factorScaleNumber.textContent = this.value;
            factorCommentBox.textContent = factorComment.textContent === null || factorComment.textContent === '' ? "Any comments you've saved will appear here as you move the scale" : factorComment.textContent;
        }
    });
});

var scaleButtons = document.querySelectorAll('.scale-buttons');


var expandButtons = document.querySelectorAll('.expand');


expandButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
    if(button.parentNode.className.includes('symptom')){
      var symptom = 'container-' +  e.target.id.split('-')[1]
      var container = document.querySelector('#' + symptom)
      container.style.display = 'block'
    }else{
      var factor = 'container-' +  e.target.id.split('-')[1]
      container = document.querySelector('#' + factor)
      container.style.display = 'block'
    }
    })
})



scaleButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        var input = button.parentNode.querySelector('input');
        input.classList.remove('hidden');
    });
});

//delete buttons

var sympButtons = document.querySelectorAll('.sympDelete')
var factButtons = document.querySelectorAll('.factDelete')

sympButtons.forEach(function(button){
    button.addEventListener('click', function(e){
        var symptom = e.target.id.split('-')[1]
        e.preventDefault();
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', '/deleteSymptom/' + symptom);
        xhr.send();
        window.location.assign('/symptoms/home');
      });
    })

factButtons.forEach(function(button){
        button.addEventListener('click', function(e){
            var factor = e.target.id.split('-')[1]
            e.preventDefault();
            const xhr = new XMLHttpRequest();
            xhr.open('DELETE', '/deleteFactor/' + factor);
            xhr.send();
            window.location.assign('/factors/home');
          });
        })

// MODEL-------------------------------------------------------------------------------------------------------------------------------------------------------------

var help = document.getElementById('help')
var modal = document.getElementById('modal')
var overlay = document.getElementById('overlay')
var closeModal = document.getElementById('close-modal')

help.addEventListener('click', function(){
    modal.style.display = "block"
    overlay.style.display = "block"
})


function closeModalFunc() {
    modal.style.display = "none";
    overlay.style.display = "none";
    previouslyFocusedEl.focus();
  }
closeModal.addEventListener('click', closeModalFunc)
overlay.addEventListener('click', closeModalFunc)


// make modal accessible ------------------------------------------------------------------------------------------------------------------------------------------


function tabModal(){
var previouslyFocusedEl = document.activeElement;
var focusableElsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, tabindex:not([tabindex="-1"])';
var focusableEls = modal.querySelectorAll(focusableElsString);
var firstFocusable = focusableEls[0];
var lastFocusable = focusableEls[1];
firstFocusable.focus();
modal.addEventListener("keydown", trapFocus);
  // defining trap function to say that if you press a key nothing happens - focus doesnt leave the modal
  function trapFocus(e) {
    if (e.keyCode == 9) {
      // if tab pressed
      if (e.shiftKey) {
        // if tab is pressed with shift
        if (document.activeElement === firstFocusable) {
          // if currently on first element
          event.preventDefault(); // then go to the last element
          lastFocusable.focus();
        }
      } else {
        // if tab pressed without shift
        if (document.activeElement === lastFocusable) {
          // and active element is the last element
          event.preventDefault(); // then send to the first tabable element in the modal (i.e. stops from escaping)
          firstFocusable.focus();
        }
      }
    }
    if (e.keyCode == 27) closeModalFunc(); // if press esc then call close modal function
  }
}

