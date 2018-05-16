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


d3.select('#graph').attr('class', 'test')
var scales = document.querySelectorAll('input[type=range]')

scales.forEach((scale) => {
    scale.addEventListener('change', function () {
        var currentScaleId = this.id; //e.g. gives scale-s1   
        var commentBoxId = `comment${currentScaleId.slice(currentScaleId.indexOf('-'))}`;
        var scaleNumberId = `${this.id}-number`;
        var symptomScaleNumber = document.querySelector(`#${scaleNumberId}`);
        var factorScaleNumber = document.querySelector(`#${scaleNumberId}`)
        var symptomCommentBox = document.querySelector(`#${commentBoxId}`);
        var factorCommentBox = document.querySelector(`#${commentBoxId}`)

        var symptomComment = document.querySelector(`#symptom${currentScaleId.slice(currentScaleId.indexOf('-'))}-comment-${this.value}`);
        var factorComment = document.querySelector(`#factor${currentScaleId.slice(currentScaleId.indexOf('-'))}-comment-${this.value}`);
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

scaleButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        var input = button.parentNode.querySelector('input');
        input.classList.remove('hidden');
    });
});
