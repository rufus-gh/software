/*gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const mainSmoother = ScrollSmoother.create({
    wrapper: ".scroll-wrapper",
    content: ".scroll-content",
    smooth: 1.2,  // Adjust smoothness
    smoothTouch: 0.1,
});


document.querySelector(".wrapper").style.overflowY = "auto";
document.querySelector(".wrapper").style.maxHeight = "100vh";
*/


// add #links for the different pages on the site and interpret them on load

const dropdowns = document.querySelectorAll('.dropdown');
var angle = 0;
var isRotated = false;

function addClassToSiblings(currentElement, className) {
  const parent = currentElement.parentNode; // Get parent of clicked dropdown
  const children = parent.children; // Get all child elements of the parent

  // Loop through all children of the parent and add the class to siblings
  Array.from(children).forEach(child => {
    if (child !== currentElement) { // Exclude the clicked element
      child.classList.toggle(className); // Add class to other elements
    }
  });
}

dropdowns: dropdowns.forEach(dropdown => {
  dropdown.addEventListener('click', () => {
    addClassToSiblings(dropdown, 'folded'); // Apply 'folded' class to all siblings except the clicked one
    let tick = dropdown.children[1].children[0].children[0];
    
    if (tick.style.transform === 'rotate(180deg)') {
      gsap.to(tick, {
        rotation: 0,
        duration: 0.05,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(tick, {
        rotation: 180,
        duration: 0.05,
        ease: "power2.inOut",
      });
    }

    
  });
});

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');
const mainStuff = document.querySelector('.left-content');

hamburger.addEventListener('click', () => {
  overlay.style.display = 'block';
  nav.style.animation = 'swing-in 0.2s ease-out forwards'
  nav.classList.add('active-sidebar');
});

overlay.addEventListener('click', () => {
  overlay.style.display = 'none';
  nav.style.animation = 'swing-out 0.2s ease-in forwards'
  setTimeout(() => {
    nav.classList.remove('active-sidebar');
  }, 200);
});

const searchBar = document.getElementById("search");
const clearButton = document.querySelector(".clear i");
const searchResults = document.querySelector(".results");

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key.toLowerCase() === "k") {
    event.preventDefault(); // Prevents the default browser search behavior
    searchBar.focus();
  }

});

searchBar.addEventListener("focus", () => {
  document.querySelector(".keys").style.opacity = "0";
});

searchBar.addEventListener("blur", () => {
  if (searchBar.value === '') {
    document.querySelector(".keys").style.opacity = "1";
  }
});

function updateClearBtn() {
  if (searchBar.value != '') {
    clearButton.style.color = 'var(--white)';
    searchResults.style.display = 'flex';
    document.querySelector(".keys").style.opacity = "0";
  } else {
    clearButton.style.color = 'var(--black)';
    searchResults.style.display = 'none';
    document.querySelector(".keys").style.opacity = "1";
  }
}

function clearSearch() {
  searchBar.value = '';
  updateClearBtn();
}

function themeToggle(thingy) {
  document.body.classList.toggle('light');
  setHighlightTheme();
  thingy.children[0].animate(
    [
      // keyframes
      { transform: "rotate(0)" },
      { transform: "rotate(360deg)" },
    ],
    {
      // timing options
      fill: "forwards",
      easing: "ease-in",
      duration: 50,
      iterations: 1,
    },
  );
  setTimeout(() => {
    thingy.children[0].classList.toggle('bx-sun');
    thingy.children[0].classList.toggle('bx-moon');
  }, 50);

  // Store preference in localStorage
  if (document.body.classList.contains('light')) {
    localStorage.setItem('theme', 'light');
  } else {
    localStorage.setItem('theme', 'dark');
  }
}

// Load preference on page load
window.addEventListener('load', () => {
  const theme = localStorage.getItem('theme');
  if (theme === 'light') {
    document.body.classList.add('light');
  } else {
    document.body.classList.remove('light');
  }
  setHighlightTheme();
});

window.addEventListener("scroll", function () {
  const topbar = document.querySelector(".topbar");
  if (window.scrollY > 10) {
    topbar.classList.add("scrolled");
  } else {
    topbar.classList.remove("scrolled");
  }
});

window.addEventListener("scroll", function () {
  const overlay = document.querySelector(".overlay");
  overlay.style.top = `${window.scrollY}px`;
});

window.addEventListener("scroll", () => {
  const progress = document.querySelector(".progress");
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercentage = (scrollTop / docHeight) * (innerWidth - 250);

  progress.style.width = `${scrollPercentage}px`;
});

const toTopButton = document.querySelector('.to-top');

// Show or hide the .to-top button based on scroll position
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    toTopButton.style.opacity = '1';
  } else {
    toTopButton.style.opacity = '0';
  }
});

// Smooth scroll to the top when .to-top is clicked
toTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

function setHighlightTheme() {
  const themeLink = document.getElementById('highlight-theme');
  const isLightTheme = document.body.classList.contains('light');

  // Set the appropriate theme
  if (isLightTheme) {
      themeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-one-light.min.css';
  } else {
      themeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-one-dark.min.css';
  }
}

setHighlightTheme();

searchBar.addEventListener('input', () => {
  const results = document.querySelectorAll('.result');

  results.forEach(result => {
    result.addEventListener('click', () => {
      const content = result.getAttribute('data-content');
      
      if (content) {
        let val = searchBar.value;
        window.location.hash = `${content}`;
        loadContent(content);
        searchBar.value = '';
        updateClearBtn();
        searchBar.blur();

        const mainContent = document.querySelector('.main-content');
        const regex = new RegExp(val, 'gi');

        setTimeout(() => {
            mainContent.innerHTML = mainContent.innerHTML.replace(regex, (match) => {
            return `<span class="highlighted-content">${match}</span>`;
            });

            const firstHighlight = mainContent.querySelector('.highlighted-content');
            if (firstHighlight) {
            firstHighlight.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
            }
        }, 100); // Adjust the timeout duration as needed
      }
    });
  });
});

document.addEventListener('click', () => {
  const highlightedElements = document.querySelectorAll('.highlighted-content');
  highlightedElements.forEach(element => {
    element.classList.remove('highlighted-content');
  });
});

function logoutBtn() {
  window.location.href = "logout.php";
}