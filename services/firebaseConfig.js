// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyArWFIAfis-e6MlT1RdQ4BRNfPdQblwcGk",
    authDomain: "my-school-app-d1217.firebaseapp.com",
    projectId: "my-school-app-d1217",
    storageBucket: "my-school-app-d1217.appspot.com",
    messagingSenderId: "910631042526",
    appId: "1:910631042526:web:d873d7492aa43e0533f14f",
    measurementId: "G-082JGV3ES2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth };