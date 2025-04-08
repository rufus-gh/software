const inputs = document.querySelectorAll('.input-field');
const toggle_button = document.querySelectorAll('.toggle');
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");
const nameStyle = document.querySelector('.username-popup');
const pswdStyle = document.querySelector('.password-popup');

// Function to handle the display logic
function toggleDisplay(input) {
  if (input.getAttribute('data-type') === 'name') {
    nameStyle.style.display = 'block';
    nameStyle.style.opacity = '1';
    pswdStyle.style.display = 'none'; // Hide password if shown
  } else if (input.getAttribute('data-type') === 'pswd') {
    pswdStyle.style.display = 'block';
    pswdStyle.style.opacity = '1';
    nameStyle.style.display = 'none'; // Hide name if shown
  }
}

inputs.forEach((inp) => {
  inp.addEventListener('focus', () => {
    inp.classList.add('active');
    toggleDisplay(inp);
    checkEmail();
    checkPassword();
  });
  inp.addEventListener('blur', () => {
    if (inp.value != '') return;
    inp.classList.remove('active');
    nameStyle.style.display = 'none';
    pswdStyle.style.display = 'none';
  });
});

toggle_button.forEach(btn => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

// Ensures phone is in portrait mode for mobile users
function isSafariMobile() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && /iPhone|iPad|iPod/.test(navigator.userAgent);
}

function checkOrientation() {
  const overlay = document.getElementById("rotate-overlay");
  if (isSafariMobile() && window.innerWidth > window.innerHeight) {
    overlay.style.display = "flex";
  } else {
    overlay.style.display = "none";
  }
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("load", checkOrientation);

const nameInp = document.querySelector('.name-signup');
const pswdInp = document.querySelector('.pswd-signup');

function checkEmail() {
  // Get the current value of the input
  let emailValue = nameInp.value;

  // Check if the value contains the specified domains
  if (emailValue.includes('@education.nsw.gov.au') || emailValue.includes('@det.nsw.edu.au')) {
    console.log('Valid email domain');
    nameStyle.style.opacity = '0';
  } else {
    console.log('Invalid email domain');
    nameStyle.style.opacity = '1';
  }
}

function checkPassword() {
  // Get the current value of the input
  let passwordValue = pswdInp.value;

  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{4,}$/;

  // Check if the password matches the regex
  if (passwordRegex.test(passwordValue)) {
    console.log('Valid password');
    pswdStyle.style.opacity = '0';
  } else {
    console.log('Invalid password');
    pswdStyle.style.opacity = '1';
  }
}

nameInp.addEventListener('input', function () {
  checkEmail();
});

pswdInp.addEventListener('input', function () {
  checkPassword();
});