function getGameNameFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("game");
}

// Direct FreeToGame API calls (no backend needed)
async function searchSteamGame(gameName) {
  try {
    // Try FreeToGame API first (no CORS issues)
    await fetchFromFreeToGame(gameName);
  } catch (error) {
    console.error("Error loading game:", error);
    displayError(`Failed to load "${gameName}"`);
  }
}

async function fetchFromFreeToGame(gameName) {
  try {
    // Use CORS proxy to avoid CORS issues
    const proxyUrl = 'https://corsproxy.io/?';
    const apiUrl = 'https://www.freetogame.com/api/games';
    
    const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
    const games = await response.json();
    
    // Find the matching game
    const foundGame = games.find(game => 
      game.title.toLowerCase() === gameName.toLowerCase()
    );
    
    if (foundGame) {
      // Fetch detailed info for this game
      const detailResponse = await fetch(proxyUrl + encodeURIComponent(`https://www.freetogame.com/api/game?id=${foundGame.id}`));
      const gameDetails = await detailResponse.json();
      
      const game = {
        name: gameDetails.title,
        releaseDate: gameDetails.release_date || 'Unknown',
        metacriticScore: null,
        fullDescription: gameDetails.short_description,
        shortDescription: gameDetails.short_description,
        platforms: {
          windows: gameDetails.platform?.includes('PC') || false,
          mac: false,
          linux: false
        },
        headerImage: gameDetails.thumbnail,
        screenshots: gameDetails.screenshots?.map(ss => ({ 
          path_thumbnail: ss, 
          path_full: ss 
        })) || [],
        source: 'freetogame',
        genre: gameDetails.genre,
        publisher: gameDetails.publisher,
        developer: gameDetails.developer
      };
      displayGameDetails(game);
    } else {
      displayError(`"${gameName}" was not found.`);
    }
  } catch (error) {
    console.error("Freetogame error:", error);
    displayError(`Failed to load "${gameName}". Please try again later.`);
  }
}

function displayGameDetails(game) {
  // Update game name
  const gameNameElement = document.querySelector(".gameName");
  if (gameNameElement) gameNameElement.textContent = game.name;

  // Update release date
  const releaseDateElement = document.querySelector(".releaseDate");
  if (releaseDateElement)
    releaseDateElement.textContent = `Release Date: ${game.releaseDate || "Unknown"}`;

  // Update score
  const scoreElement = document.querySelector(".gameScore");
  if (scoreElement) {
    scoreElement.textContent = game.metacriticScore
      ? `Metacritic Score: ${game.metacriticScore}`
      : "Score: Not available";
  }

  // Update description
  const descriptionElement = document.querySelector(".gameDescription");
  if (descriptionElement)
    descriptionElement.innerHTML =
      game.fullDescription ||
      game.shortDescription ||
      "No description available";

  // Update platforms
  const platformsElement = document.querySelector(".platforms");
  if (platformsElement && game.platforms) {
    const availablePlatforms = [];
    if (game.platforms.windows) availablePlatforms.push("PC");
    if (game.platforms.mac) availablePlatforms.push("Mac");
    if (game.platforms.linux) availablePlatforms.push("Linux");
    platformsElement.textContent = `Available on: ${availablePlatforms.join(", ") || "Not specified"}`;
  }

  // Add genre and publisher if available
  if (game.genre || game.publisher) {
    const extraInfo = document.createElement("div");
    extraInfo.className = "extraInfo";
    extraInfo.style.marginTop = "10px";
    extraInfo.style.fontSize = "14px";
    extraInfo.style.color = "#aaa";
    if (game.genre) extraInfo.innerHTML += `<p>Genre: ${game.genre}</p>`;
    if (game.publisher) extraInfo.innerHTML += `<p>Publisher: ${game.publisher}</p>`;
    if (game.developer) extraInfo.innerHTML += `<p>Developer: ${game.developer}</p>`;
    
    const detailsColumn = document.querySelector(".detailsColumn");
    if (detailsColumn) detailsColumn.appendChild(extraInfo);
  }

  // Update image gallery
  const imageGalleryElement = document.querySelector(".imageGallery");
  if (imageGalleryElement && game.screenshots && game.screenshots.length > 0) {
    imageGalleryElement.innerHTML = "";
    game.screenshots.forEach((screenshot) => {
      const img = document.createElement("img");
      img.src = screenshot.path_thumbnail || screenshot.path_full;
      img.alt = "Screenshot";
      img.style.cursor = "pointer";
      img.style.width = "100px";
      img.style.height = "56px";
      img.style.objectFit = "cover";
      img.addEventListener("click", () => {
        const mainImageElement = document.querySelector(".mainImage");
        if (mainImageElement) mainImageElement.src = screenshot.path_full;
      });
      imageGalleryElement.appendChild(img);
    });
  }

  // Update main image
  const mainImageElement = document.querySelector(".mainImage");
  if (mainImageElement && game.headerImage) {
    mainImageElement.src = game.headerImage;
    mainImageElement.alt = game.name;
  }

  // Show source badge if it came from freetogame
  if (game.source === "freetogame") {
    const sourceNote = document.createElement("p");
    sourceNote.textContent = "ℹ️ Game information provided by FreeToGame";
    sourceNote.style.cssText = "color: #aaa; font-size: 0.85rem; margin-top: 8px;";
    const descriptionParent = document.querySelector(".gameDescription");
    if (descriptionParent && !document.querySelector(".source-note")) {
      sourceNote.className = "source-note";
      descriptionParent.after(sourceNote);
    }
  }
}

function displayError(message) {
  const descriptionElement = document.querySelector(".gameDescription");
  if (descriptionElement) {
    descriptionElement.innerHTML = message;
    descriptionElement.style.color = "#ff6666";
    descriptionElement.style.textAlign = "center";
    descriptionElement.style.padding = "40px";
  }
  
  // Also clear loading states
  const platformsElement = document.querySelector(".platforms");
  if (platformsElement) platformsElement.textContent = "";
  
  const releaseDateElement = document.querySelector(".releaseDate");
  if (releaseDateElement) releaseDateElement.textContent = "";
  
  const scoreElement = document.querySelector(".gameScore");
  if (scoreElement) scoreElement.textContent = "";
}

// Add loading indicator
function showLoading() {
  const descriptionElement = document.querySelector(".gameDescription");
  if (descriptionElement) {
    descriptionElement.innerHTML = "Loading game details...";
    descriptionElement.style.color = "#aaa";
    descriptionElement.style.textAlign = "center";
    descriptionElement.style.padding = "40px";
  }
  
  const platformsElement = document.querySelector(".platforms");
  if (platformsElement) platformsElement.textContent = "Loading platforms...";
  
  const releaseDateElement = document.querySelector(".releaseDate");
  if (releaseDateElement) releaseDateElement.textContent = "Loading release date...";
  
  const scoreElement = document.querySelector(".gameScore");
  if (scoreElement) scoreElement.textContent = "Loading score...";
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  const gameName = getGameNameFromURL();
  if (gameName) {
    showLoading();
    searchSteamGame(gameName);
  } else {
    displayError("No game selected. Please go back and select a game.");
  }
});
  if (gameName) {
    searchSteamGame(gameName);
  } else {
    displayError("No game selected");
  }
});
