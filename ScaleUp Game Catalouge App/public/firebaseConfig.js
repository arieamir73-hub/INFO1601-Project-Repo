// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfyF35FjI0ebsDcRYP2M6kBetAUEeJ5qA",
  authDomain: "scaleup-game-catalouge-app.firebaseapp.com",
  projectId: "scaleup-game-catalouge-app",
  storageBucket: "scaleup-game-catalouge-app.firebasestorage.app",
  messagingSenderId: "961765854732",
  appId: "1:961765854732:web:5006ad00fc7cba5b976829",
  measurementId: "G-XZF9KG7CB1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
