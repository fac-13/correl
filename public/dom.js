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


// Modal control buttons
var next = document.getElementById('next');
var back = document.getElementById('back');

var pageTwo = document.getElementById('pageTwo');
var pageThree = document.getElementById('pageThree');
var pageOne = document.getElementById('pageOne');

next.addEventListener('click', function(){
  if(pageTwo.style.zIndex == 0) {
    pageTwo.style.zIndex = "1";
    pageOne.style.zIndex = "0";
  } else if(pageTwo.style.zIndex == 1) {
    pageThree.style.zIndex = "1";
    pageTwo.style.zIndex = "0";
  }
});

back.addEventListener('click', function(){
  if(pageThree.style.zIndex == 1) {
    pageTwo.style.zIndex = "1";
    pageThree.style.zIndex = "0";
  } else if(pageTwo.style.zIndex == 1) {
    pageTwo.style.zIndex = "0";
    pageOne.style.zIndex = "1";
  }
});

// CODE FOR MODAL
var modal = document.querySelector('#modal');
var showModal = document.querySelector('#help');
var hideModal = document.querySelector('#close-modal');
var focusedElementBeforeModal; 

showModal.addEventListener('click', openModal);
hideModal.addEventListener('click', closeModal);

function openModal() {
    // Show the modal and overlay
    modal.style.display = 'block';
    // modalOverlay.style.display = 'block';

    // Save the current focus 
    focusedElementBeforeModal = document.activeElement;

    //Listen for keydown in order to trap focus 
    modal.addEventListener('keydown', trapTab);

    // Find all the focusable children
    var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    var focusableElements = modal.querySelectorAll(focusableElementsString);
    var focusableElements = Array.prototype.slice.call(focusableElements);  //convert node list to array

    console.log(focusableElements);

    // Find the first and last focusable elements
    firstFocusableEl = focusableElements[0];
    lastFocusableEl = focusableElements[focusableElements.length-1];

    // Move focus to the first focusbale element in the modal
    firstFocusableEl.focus();


    // Trap focus inside the modal 
    function trapTab(e) {
        // Check if the tab key was pressed 
        if(e.keyCode == 9) {
            // shift-tab
            if(e.shiftKey) {
                if (document.activeElement === firstFocusableEl) {
                    e.preventDefault();
                    lastFocusableEl.focus();
                }
            // tab without shift pressed    
            } else {
                if (document.activeElement === lastFocusableEl) {
                    e.preventDefault();
                    firstFocusableEl.focus();
                  }
            }
        }
        // close modal if esc pressed
        if (e.keyCode === 27) {
            closeModal();
        }
    }
}

function closeModal() {
    // Hide the modal and overlay
    modal.style.display = 'none';
    // modalOverlay.style.display = 'none';

    // Set focus back to element that had it before the modal was opened
    focusedElementBeforeModal.focus();
}
