import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCfyF35FjI0ebsDcRYP2M6kBetAUEeJ5qA",
  authDomain: "scaleup-game-catalouge-app.firebaseapp.com",
  projectId: "scaleup-game-catalouge-app",
  storageBucket: "scaleup-game-catalouge-app.firebasestorage.app",
  messagingSenderId: "961765854732",
  appId: "1:961765854732:web:5006ad00fc7cba5b976829",
  measurementId: "G-XZF9KG7CB1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  const bioText = document.getElementById("profileBioText");
  const favoritesGrid = document.getElementById("favouritesGrid");

  if (!user) {
    bioText.textContent = "Please log in to view your profile.";
    favoritesGrid.innerHTML = "";
    return;
  }

  // Display name
  bioText.textContent = `👾 ${user.displayName || "Gamer"}`;

  // Load favorites
  const favSnapshot = await getDocs(
    collection(db, "users", user.uid, "favorites"),
  );

  if (favSnapshot.empty) {
    favoritesGrid.innerHTML = "<p>No favorites yet — go add some!</p>";
    return;
  }

  favoritesGrid.innerHTML = "";

  favSnapshot.forEach((doc) => {
    const game = doc.data();
    const card = document.createElement("div");
    card.className = "newCards";
    card.style.cursor = "pointer";
    card.innerHTML = `
      <img src="${game.thumbnail}" alt="${game.title}" class="newImage" />
      <p class="newName" style="text-decoration: underline;">${game.title}</p>
      <p class="newGenre">Genre: ${game.genre}</p>
    `;
    card.addEventListener("click", () => {
      window.location.href = `gamePage.html?game=${encodeURIComponent(game.title)}`;
    });
    favoritesGrid.appendChild(card);
  });
});
