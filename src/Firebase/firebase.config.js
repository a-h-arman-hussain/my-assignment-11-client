// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTp-HpqNhMe7YgqBaJodMw7Hq_zulLmTo",
  authDomain: "scholar-stream-b147e.firebaseapp.com",
  projectId: "scholar-stream-b147e",
  storageBucket: "scholar-stream-b147e.firebasestorage.app",
  messagingSenderId: "342685796418",
  appId: "1:342685796418:web:0fcbcea1f3ecf91df405db",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
