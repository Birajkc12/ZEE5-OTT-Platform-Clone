document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  const apiKey = "992541f9dcf095b8622ec4e19fb32fae";
  const detailURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=hi-IN`;
  const creditsURL = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=hi-IN`;

  // Fetch movie details
  const fetchMovieDetails = fetch(detailURL).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });

  // Fetch movie credits
  const fetchMovieCredits = fetch(creditsURL).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });

  // Promise.all to handle both requests concurrently
  Promise.all([fetchMovieDetails, fetchMovieCredits])
    .then(([movieDetails, credits]) => {
      console.log("Movie Details:", movieDetails);
      console.log("Movie Credits:", credits);

      const trailerKey = movieDetails.videos?.results?.[0]?.key || "";
      const castList = credits.cast || [];
      const overview = movieDetails.overview || "No overview available.";

      const detailContainer = document.getElementById("detailContainer");
      detailContainer.innerHTML = `
        <style>
          .video-container {
            position: relative;
            width: 100%;
            padding-bottom: 56.25%; /* 16:9 aspect ratio */
          }

          .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        </style>
        <h2 class="text-2xl font-bold mb-4 text-white">${
          movieDetails.title
        }</h2>
        <img src="https://image.tmdb.org/t/p/w500${
          movieDetails.poster_path
        }" alt="${
        movieDetails.title
      }" style="width: 500px;" class="rounded-md mb-2">
        <p class="text-sm text-white font-semibold">${overview}</p>

        <div class="movie-details">
          <h3 class="text-xl font-semibold text-white mb-2">Additional Details</h3>

          <p class="text-white"><strong>Trailer:</strong></p>
          ${
            trailerKey
              ? `<div class="video-container"><iframe width="560" height="315" src="https://www.youtube.com/embed/${trailerKey}" frameborder="0" allowfullscreen></iframe></div>`
              : "<p class='text-white'>Trailer not available</p>"
          }

          <p class="text-white"><strong>Rating:</strong> ${
            movieDetails.vote_average
          }</p>
          <p class="text-white"><strong>Duration:</strong> ${
            movieDetails.runtime
          } minutes</p>
          <p class="text-white"><strong>Release Year:</strong> ${movieDetails.release_date.slice(
            0,
            4
          )}</p>
          <p class="text-white"><strong>Genre:</strong> ${movieDetails.genres
            .map((genre) => genre.name)
            .join(", ")}</p>

          <div class="movie-description">
            <h3 class="text-xl font-semibold text-white mb-2">Movie Description</h3>
            <p class="text-white">${overview}</p>
          </div>

          <div class="movie-cast">
            <h3 class="text-xl font-semibold text-white mb-2">Cast</h3>
            <ul class="text-white">
              ${castList
                .slice(0, 5)
                .map(
                  (actor) =>
                    `<li><a href="#" class="cast-link" data-actor-id="${actor.id}">${actor.name}</a></li>`
                )
                .join("")}
            </ul>
          </div>
        </div>
      `;

      // Add click event listeners to the cast links
      const castLinks = document.querySelectorAll(".cast-link");
      castLinks.forEach((castLink) => {
        castLink.addEventListener("click", (event) => {
          event.preventDefault();
          const actorId = event.target.dataset.actorId;
          // Navigate to another page with actorId as a parameter
          window.location.href = `castRelated.html?actorId=${actorId}`;
        });
      });
    })
    .catch((error) =>
      console.error("Error fetching movie details or credits:", error)
    );
});
