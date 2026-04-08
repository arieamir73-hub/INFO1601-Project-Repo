// Search functionality for Skal Reviews
let allGames = [];
const searchBar = document.getElementById("searchBar");
const dropdown = document.getElementById("searchDropdown");

// Fetch all games once on page load
async function loadAllGames() {
  try {
    const url =
      "https://corsproxy.io/?" +
      encodeURIComponent("https://www.freetogame.com/api/games");
    const response = await fetch(url);
    allGames = await response.json();
  } catch (error) {
    console.error("Failed to load games for search:", error);
  }
}

// Show dropdown with matching games
function showDropdown(matches) {
  if (matches.length === 0) {
    dropdown.classList.remove("visible");
    return;
  }

  dropdown.innerHTML = "";

  matches.slice(0, 8).forEach((game) => {
    const item = document.createElement("div");
    item.className = "dropdown-item";
    item.textContent = game.title;

    item.addEventListener("click", () => {
      searchBar.value = game.title;
      dropdown.classList.remove("visible");
      window.location.href = `gamePage.html?game=${encodeURIComponent(game.title)}`;
    });

    dropdown.appendChild(item);
  });

  dropdown.classList.add("visible");
}

// Handle user typing
searchBar.addEventListener("input", () => {
  const query = searchBar.value.trim().toLowerCase();

  if (query.length < 2) {
    dropdown.classList.remove("visible");
    return;
  }

  const matches = allGames.filter((game) =>
    game.title.toLowerCase().includes(query),
  );

  showDropdown(matches);
});

// Handle Enter key
searchBar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const query = searchBar.value.trim();

    if (query) {
      dropdown.classList.remove("visible");
      window.location.href = `gamePage.html?game=${encodeURIComponent(query)}`;
    }
  }
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!searchBar.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.remove("visible");
  }
});

// Load games when page is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadAllGames);
} else {
  loadAllGames();
}
