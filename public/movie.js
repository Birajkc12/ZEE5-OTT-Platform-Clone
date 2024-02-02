document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "992541f9dcf095b8622ec4e19fb32fae";
  const trendingMoviesURL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=hi-IN`;

  fetch(trendingMoviesURL)
    .then((response) => response.json())
    .then((data) => {
      const trendingMoviesContainer = document.getElementById(
        "trendingMoviesContainer"
      );

      data.results.slice(0, 10).forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("slick-slide", "mr-4");
        movieCard.innerHTML = `
              <a href="detail.html?id=${movie.id}"> <!-- Add the movie/series ID as a query parameter -->
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full rounded-md mb-2 ">
              <p class="text-sm text-white font-semibold">${movie.title}</p>
            `;
        trendingMoviesContainer.appendChild(movieCard);
      });

      // Initialize Slick
      $(".slick-carousel").slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
    })
    .catch((error) => console.error("Error fetching trending movies:", error));
});
