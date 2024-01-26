document.addEventListener("DOMContentLoaded", function () {
  // Simulated data (replace with actual data fetching)
  const trendingContentData = [
    { id: 1, title: "Show 1", image: "show1.jpg" },
    { id: 2, title: "Show 2", image: "show2.jpg" },
    // Add more content items
  ];

  const topPicksData = [
    { id: 101, title: "Movie 1", image: "movie1.jpg" },
    { id: 102, title: "Movie 2", image: "movie2.jpg" },
    // Add more content items
  ];

  // Function to add content items to the specified container
  function addContentToContainer(containerId, data) {
    const container = document.getElementById(containerId);
    data.forEach((item) => {
      const contentItem = document.createElement("div");
      contentItem.classList.add("content-item");

      const image = document.createElement("img");
      image.src = item.image;
      image.alt = item.title;

      const details = document.createElement("div");
      details.classList.add("details");
      details.textContent = item.title;

      contentItem.appendChild(image);
      contentItem.appendChild(details);
      container.appendChild(contentItem);
    });
  }

  // Add trending content to the featured section
  addContentToContainer("trending-content", trendingContentData);

  // Add top picks content to the categories section
  addContentToContainer("top-picks-content", topPicksData);
});
// Add these functions to your existing script.js

function toggleSearchBar() {
  const searchBar = document.querySelector(".search-bar");
  searchBar.style.display =
    searchBar.style.display === "block" ? "none" : "block";
}

function toggleMenu() {
  const mobileMenu = document.querySelector(".mobile-menu");
  mobileMenu.style.display =
    mobileMenu.style.display === "block" ? "none" : "block";
}
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carousel-track");
  const items = document.querySelectorAll(".carousel-item");
  const totalItems = items.length;
  let currentIndex = 0;

  function setInitialClasses() {
    items[0].classList.add("active");
  }

  function updateCarousel() {
    items.forEach((item) => item.classList.remove("active"));
    items[currentIndex].classList.add("active");
    const translateValue = -currentIndex * 100 + "%";
    track.style.transform = "translateX(" + translateValue + ")";
  }

  function nextSlide() {
    if (currentIndex < totalItems - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = totalItems - 1;
    }
    updateCarousel();
  }

  setInitialClasses();

  // Event listeners for next and previous buttons
  document.querySelector(".next-btn").addEventListener("click", nextSlide);
  document.querySelector(".prev-btn").addEventListener("click", prevSlide);
});
