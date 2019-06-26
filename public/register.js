var form = document.getElementsByTagName("form")[0];
var username = document.getElementById("username");
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirmPassword");
var error = document.querySelector(".error");

  if (password.value != confirmPassword.value) {
    error.innerText = "Passwords do not match";
    event.preventDefault();
  }

  if (username.value.length < 6) {
    error.innerText = "Username must be longer than 6 charaters";
    event.preventDefault();
  }

  if (username.validity.valueMissing) {
    error.innerText = "Please enter a username";
    event.preventDefault();
  }

});
