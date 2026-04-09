import { auth } from "../firebaseConfig.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Sign Up
async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    console.log("User created:", userCredential.user);
  } catch (error) {
    console.log(error.code, error.message);
  }
}

// Login
async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    console.log("Logged in:", userCredential.user);
  } catch (error) {
    console.log(error.code, error.message);
  }
}

// Logout
async function logout() {
  await signOut(auth);
}

// Auth State Listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Logged in:", user.uid);
  } else {
    console.log("No user logged in");
  }
});
