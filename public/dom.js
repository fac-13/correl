/* eslint-disable */


d3.select('#graph').attr('class', 'test')
var scales = document.querySelectorAll('input[type=range]')
// we need to use an array of comments from the database - this one is for testing only
const test = ['No pain', '', '', '', '4 means I take some pain medication', '', '', '', 'Can\'t focus on anything but my pain', '', ''];
const factorsTest = ['', '', 'I drank very little water - less that 500ml', '', '', '', '', '', 'Drank lots of water - Nearly 2L', ''];

scales.forEach((scale) => {
    scale.addEventListener('change', function () {
        if (scale.parentNode.id.includes('symptom')) {
            //Symptoms
            var currentScaleId = `${this.id}`; //e.g. gives scale-fatigue
            var commentBoxId = `comment${currentScaleId.slice(currentScaleId.indexOf('-'))}`;
            var scaleNumberId = `${this.id}-number`;
            var scaleNumber = document.querySelector(`#${scaleNumberId}`);
            var commentBox = document.querySelector(`#${commentBoxId}`);

            scaleNumber.textContent = `${this.value}`;
            commentBox.textContent = test[this.value] === '' ? "Any comments you've saved will appear here as you move the scale" : `Hint: ${test[this.value]}`
        } else {
            currentScaleId = `${this.id}`; //e.g. gives scale-fatigue
            commentBoxId = `comment${currentScaleId.slice(currentScaleId.indexOf('-'))}`;
            scaleNumberId = `${this.id}-number`;
            scaleNumber = document.querySelector(`#${scaleNumberId}`);
            commentBox = document.querySelector(`#${commentBoxId}`);

            scaleNumber.textContent = `${this.value}`;
            commentBox.textContent = factorsTest[this.value] === '' ? "Any comments you've saved will appear here as you move the scale" : `Hint: ${factorsTest[this.value]}`
        }


    })
})


