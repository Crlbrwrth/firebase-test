import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCbCO-Y1ZCW-Q8uYh14gXpZdrBnoX6n_j4",
  authDomain: "testproject-371ff.firebaseapp.com",
  projectId: "testproject-371ff",
  storageBucket: "testproject-371ff.appspot.com",
  messagingSenderId: "23570436196",
  appId: "1:23570436196:web:f9f35ef5474f8f50050f71",
  measurementId: "G-7VNZ3CGZV7",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);

export const analytics = getAnalytics(app);
