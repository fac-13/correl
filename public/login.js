// login querySelector
var login = document.getElementById('login');
var logPassword = document.getElementById('logPassword');
var form = document.getElementsByTagName("form")[0];
var error = document.querySelector(".error");

form.addEventListener("submit", function(event) {

  if (logPassword.validity.valueMissing) {
    error.innerText = "Please enter your password";
    event.preventDefault();
  }

  if (login.validity.valueMissing) {
    error.innerText = "Please enter your username";
    event.preventDefault();
  }

});
