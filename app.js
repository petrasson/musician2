document.addEventListener("DOMContentLoaded", function () {
  const hamburgBtn = document.querySelector(".hamburger-btn");
  const closeBtn = document.querySelector(".close-btn");
  const hamburgerMenu = document.querySelector(".hamburger-menu-wrapper");
  const magnifyingGlass = document.querySelector(".fa-magnifying-glass");
  const shoppingBag = document.querySelector(".fa-bag-shopping");
  const nav = document.querySelector("nav");
  const reviewWrapper = document.querySelector(".review-wrapper");
  const reviewGroups = document.querySelectorAll(".review-group");
  const circles = document.querySelectorAll(".circle");

  let currentIndex = 0;
  let timer;

  const header = document.querySelector("header");
  const target = document.querySelector(".observer-target");

  /**** Sticky header *****/

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        header.classList.remove("sticky");
      } else {
        header.classList.add("sticky");
      }
    });
  });

  observer.observe(target);

  /**** Update reviews *****/

  // Function to show a review
  function showReview(index) {
    const reviewWidth = reviewGroups[0].clientWidth;
    reviewWrapper.scrollTo({
      left: index * reviewWidth,
      behavior: "smooth",
    });
    currentIndex = index;
    circles.forEach((circle, i) => {
      circle.classList.toggle("active-circle", i === index);
    });
  }
  // Function to show the next review
  function nextReview() {
    currentIndex = (currentIndex + 1) % reviewGroups.length;
    showReview(currentIndex);
  }

  // Start the review carousel
  function startCarousel() {
    timer = setInterval(nextReview, 4000);
  }

  // Stop the review carousel
  function stopCarousel() {
    clearInterval(timer);
  }

  // Unified event handler for navigation clicks
  function handleNavigationClick(event) {
    const index = Array.from(
      event.currentTarget.parentElement.children
    ).indexOf(event.currentTarget);
    stopCarousel();
    showReview(index);
    startCarousel();
  }

  // Function to add event listeners to elements
  function addEventListeners(elements) {
    elements.forEach((element) => {
      element.addEventListener("click", handleNavigationClick);
    });
  }

  // Initialize carousel
  showReview(0);
  startCarousel();

  addEventListeners([...circles, ...reviewGroups]);

  /*** Showing/hiding the Hamburger menu on click ***/

  hamburgBtn.addEventListener("click", () => {
    [hamburgBtn, closeBtn, hamburgerMenu].forEach((e) => {
      e.classList.add("active");
    });
  });

  closeBtn.addEventListener("click", () => {
    [hamburgBtn, closeBtn, hamburgerMenu].forEach((e) => {
      e.classList.remove("active");
    });
  });

  /*** Highlight menu item on click. Show submenu on click ***/

  hamburgerMenu.addEventListener("click", function (event) {
    const clickedElement = event.target;

    if (clickedElement.tagName === "A") {
      document.querySelectorAll(".hamburger-menu a").forEach((item) => {
        item.classList.remove("highlight-text");
      });
      clickedElement.classList.add("highlight-text");

      const parentMenuItem = clickedElement.parentElement;
      const submenu = parentMenuItem.querySelector(".hamburger-menu-sub");

      if (submenu) {
        if (!clickedElement.classList.contains("menu-item-sub")) {
          parentMenuItem.classList.toggle("show-submenu");
        }
        event.stopPropagation();
        event.preventDefault();
      }
    }
  });
});
