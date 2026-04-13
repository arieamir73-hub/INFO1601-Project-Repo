import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

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

onAuthStateChanged(auth, (user) => {
  const loginBtn = document.getElementById("loginBtn");

  if (!loginBtn) return;

  if (user) {
    loginBtn.innerHTML = `<i class="bx bx-log-out" style="font-size: 28px;"></i>`;
    loginBtn.style.background = "none";
    loginBtn.style.border = "none";
    loginBtn.style.cursor = "pointer";

    loginBtn.addEventListener("click", async () => {
      const confirmed = window.confirm("Are you sure you want to log out?");
      if (confirmed) {
        await signOut(auth);
        window.location.href = "login.html";
      }
    });
  } else {
    loginBtn.innerHTML = `<a href="login.html">Login</a>`;
    loginBtn.style.background = "";
    loginBtn.style.border = "";
  }
});
