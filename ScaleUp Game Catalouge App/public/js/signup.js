import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
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

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePassword.classList.replace("bx-hide", "bx-show");
  } else {
    passwordInput.type = "password";
    togglePassword.classList.replace("bx-show", "bx-hide");
  }
});

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signupForm = document.getElementById("signupForm");
const errorMsg = document.getElementById("errorMsg");
const successMsg = document.getElementById("successMsg");

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.add("show");
}

function showSuccess(msg) {
  successMsg.textContent = msg;
  successMsg.classList.add("show");
}

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const agreeTerms = document.getElementById("agreeTerms").checked;

  // Clear messages
  errorMsg.textContent = "";
  errorMsg.classList.remove("show");
  successMsg.textContent = "";
  successMsg.classList.remove("show");

  if (!agreeTerms) {
    showError("You must agree to the Terms of Service.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await updateProfile(userCredential.user, {
      displayName: `${firstName} ${lastName}`,
    });

    showSuccess("Account created! Redirecting..."); // moved here inside try
    setTimeout(() => (window.location.href = "login.html"), 2000);
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      showError("This email is already registered.");
    } else if (error.code === "auth/weak-password") {
      showError("Password must be at least 6 characters.");
    } else {
      showError("Something went wrong. Please try again.");
    }
  }
});
