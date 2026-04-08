function displayGames(games, containerId = "newGamesCards") {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Container ${containerId} not found`);
    return;
  }

  const fragment = document.createDocumentFragment();
  games.forEach((game) => {
    const card = document.createElement("div");
    card.className = "newCards";

    card.innerHTML = `
      <img src="${game.thumbnail}" alt="${game.title}" class="newImage" />
      <p class="newName" style="cursor: pointer; text-decoration: underline;">${game.title}</p>
      <p class="newGenre">Genre: ${game.genre}</p>
    `;

    // Make the entire card clickable, not just the name
    card.addEventListener("click", (e) => {
      // Don't trigger if clicking on the name element (to avoid double trigger)
      if (e.target.classList.contains('newName')) return;
      window.location.href = `gamePage.html?game=${encodeURIComponent(game.title)}`;
    });
    
    // Name element click
    const nameElement = card.querySelector(".newName");
    nameElement.addEventListener("click", (e) => {
      e.stopPropagation();
      window.location.href = `gamePage.html?game=${encodeURIComponent(game.title)}`;
    });

    fragment.appendChild(card);
  });

  container.innerHTML = "";
  container.appendChild(fragment);
}

async function fetchNewReleases() {
  const proxyUrl = "https://corsproxy.io/?";
  const apiUrl = "https://www.freetogame.com/api/games?sort-by=release-date";

  try {
    const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
    const games = await response.json();
    displayGames(games.slice(0, 15), "newGamesCards");
  } catch (error) {
    console.error("Error fetching new releases:", error);
    const container = document.getElementById("newGamesCards");
    if (container) {
      container.innerHTML = '<p style="color: red;">Failed to load games. Please refresh.</p>';
    }
  }
}

async function fetchPopularGames() {
  const proxyUrl = "https://corsproxy.io/?";
  const apiUrl = "https://www.freetogame.com/api/games?sort-by=popularity";
  
  try {
    const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
    const games = await response.json();
    displayGames(games.slice(0, 15), "popularGamesCards");
  } catch (error) {
    console.error("Error fetching popular games:", error);
  }
}

async function fetchShooterGames() {
  const proxyUrl = "https://corsproxy.io/?";
  const apiUrl = "https://www.freetogame.com/api/games?category=shooter&sort-by=popularity";
  
  try {
    const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
    const games = await response.json();
    displayGames(games.slice(0, 15), "shooterGamesCards");
  } catch (error) {
    console.error("Error fetching shooter games:", error);
  }
}

async function fetchMMORPGGames() {
  const proxyUrl = "https://corsproxy.io/?";
  const apiUrl = "https://www.freetogame.com/api/games?category=mmorpg&sort-by=popularity";
  
  try {
    const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
    const games = await response.json();
    displayGames(games.slice(0, 15), "mmorpgGamesCards");
  } catch (error) {
    console.error("Error fetching MMORPG games:", error);
  }
}

function setupCarousel(trackId, prevBtnId, nextBtnId) {
  const track = document.getElementById(trackId);
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);

  if (track && prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      track.scrollBy({ left: -300, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
      track.scrollBy({ left: 300, behavior: "smooth" });
    });
  }
}

// Add loading state for carousels
function showCarouselLoading() {
  const containers = ["newGamesCards", "popularGamesCards", "shooterGamesCards", "mmorpgGamesCards"];
  containers.forEach(containerId => {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = '<div style="text-align: center; padding: 40px;">Loading games...</div>';
    }
  });
}

// Initialize everything
showCarouselLoading();
fetchNewReleases();
fetchPopularGames();
fetchShooterGames();
fetchMMORPGGames();
setupCarousel("newGamesCards", "newReleasesPrevBtn", "newReleasesNextBtn");
setupCarousel("popularGamesCards", "popularPrevBtn", "popularNextBtn");
setupCarousel("shooterGamesCards", "shooterPrevBtn", "shooterNextBtn");
setupCarousel("mmorpgGamesCards", "mmorpgPrevBtn", "mmorpgNextBtn");
