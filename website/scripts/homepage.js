document.addEventListener("DOMContentLoaded", function () {
  const text = "dev.dictionary";
  const container = document.getElementById("text-container");
  let index = 0;

  function typeEffect() {
      if (index < text.length) {
          container.innerHTML += text[index];
          index++;
          setTimeout(typeEffect, Math.round(Math.random(50,150)*100+50)); // random speed between 25 and
      } else {
          container.style.borderRight = "none"; // Remove cursor after typing
      }
  }

  typeEffect();
});

//const scrollButton = document.querySelector("div.scroll-btn");
const logo = document.querySelector("span.logo");
var hasScrolledDown = false;
const scrollSign = document.querySelector("div.scroll-sign");

//scrollButton.addEventListener("click", () =>
//  window.scrollTo({
//    top: innerHeight,
//    behavior: "smooth",
//  })
//);

window.addEventListener("scroll", () => {
  /*
    var scrollPercent = scrollY/innerHeight;
    if (scrollPercent >= 1) {
        logo.style.top = '110vh';
    } else {
        logo.style.top = `calc(${30 - 30 * scrollPercent}% + ${scrollY}px)`;
    }
    */
  if (scrollY > 0 && scrollY < innerHeight && !hasScrolledDown) {
    hasScrolledDown = true;
    scrollSign.style.opacity = 0;
    window.scrollTo({
      top: innerHeight,
      behavior: "smooth",
    });
  } else {
    
  }

  if (scrollY === 0) {
    hasScrolledDown = false;
    scrollSign.style.opacity = 0.3;
  }
});
