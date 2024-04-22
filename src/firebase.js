// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxJW2fX4SMNWE0o87D8g-8aYa1vnQdwDQ",
  authDomain: "ecomm-4ac06.firebaseapp.com",
  projectId: "ecomm-4ac06",
  storageBucket: "ecomm-4ac06.appspot.com",
  messagingSenderId: "19577251614",
  appId: "1:19577251614:web:fb045d31986835839b0b0f",
  measurementId: "G-X5FQ1FDV1N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);


export { auth, firestore };