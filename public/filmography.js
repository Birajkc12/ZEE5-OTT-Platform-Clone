document.addEventListener("DOMContentLoaded", () => {
  // Get actorId from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const actorId = urlParams.get("actorId");

  // Fetch actor details using the actorId
  const apiKey = "992541f9dcf095b8622ec4e19fb32fae";
  const actorURL = `https://api.themoviedb.org/3/person/${actorId}?api_key=${apiKey}&language=hi-IN`;

  fetch(actorURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((actorDetails) => {
      console.log("Actor Details:", actorDetails);

      // Update the actor details container
      const actorDetailsContainer = document.getElementById(
        "actorDetailsContainer"
      );
      actorDetailsContainer.innerHTML = `
  <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
    <h2 class="text-2xl font-bold mb-4 text-white">${actorDetails.name}</h2>
    <img src="https://image.tmdb.org/t/p/w500${actorDetails.profile_path}" alt="${actorDetails.name}" class="rounded-md mb-2">
    <p class="text-sm text-black font-semibold">${actorDetails.biography}</p>
    <!-- Add more details about the actor as needed -->
  </div>
`;

      // Fetch actor's filmography
      const filmographyURL = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${apiKey}&language=hi-IN`;

      fetch(filmographyURL)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((filmography) => {
          console.log("Filmography:", filmography);

          // Display filmography as cards
          const filmographyContainer = document.createElement("div");
          filmographyContainer.className = "filmography";

          filmographyContainer.innerHTML = `
                  <h3 class="text-white"> Filmography </h3>
                  <div class="slick-carousel">
                    ${filmography.cast
                      .map(
                        (movie) => `
                          <div class="slick-slide mr-4">
                            <a href="detail.html?id=${movie.id}">
                              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full rounded-md mb-2 ">
                              <p class="text-sm text-white font-semibold">${movie.title}</p>
                            </a>
                          </div>
                        `
                      )
                      .join("")}
                  </div>
                `;

          // Append filmography to the actor details container
          actorDetailsContainer.appendChild(filmographyContainer);

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
        .catch((error) =>
          console.error("Error fetching actor's filmography:", error)
        );
    })
    .catch((error) => console.error("Error fetching actor details:", error));
});
