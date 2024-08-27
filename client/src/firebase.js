// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-auth-5df89.firebaseapp.com',
  projectId: 'mern-auth-5df89',
  storageBucket: 'mern-auth-5df89.appspot.com',
  messagingSenderId: '215043858424',
  appId: '1:215043858424:web:354eb34516680322e9c00d',
  measurementId: 'G-Z0QBSBHE8K',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
