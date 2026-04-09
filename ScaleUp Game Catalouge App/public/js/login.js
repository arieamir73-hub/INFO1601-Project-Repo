import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
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

const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

loginForm.addEventListener("submit", async () => {
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  errorMsg.textContent = "";

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    console.log("Logged in:", userCredential.user);
    window.location.href = "index.html"; // change to your home page
  } catch (error) {
    errorMsg.textContent = "Invalid email or password. Please try again.";
  }
});
