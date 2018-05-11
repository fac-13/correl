/* eslint-disable */
var scales = document.querySelectorAll('input[type=range]')

// we need to use an array of comments from the database - this one is for testing only
const test = ['Comment for 1', '', 'Comment for 3', 'Comment for 4', 'Comment for 5'];

scales.forEach( (scale) => {
    scale.addEventListener('click', function(){
        var currentScale = `${this.id}`;
        var commentBoxId = `result${currentScale.slice(currentScale.indexOf('-'))}`;
        
        console.log(`the current scale is: ${currentScale}`);
        console.log(`the comment box associated with the current scale has an id of ${commentBoxId}`);

        var commentBox = document.getElementById('commentBoxId'); //Not working 
       

        
        //commentBox.innerHTML = test[`${this.value}`];
        
        // result.innerHTML = `the scale is on ${this.value} and the comment is ${arr[this.value-1]}`;
    })
})