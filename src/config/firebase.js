import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// tel firebase that it's gonna have access to the firestore
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBxPrQzdwWbwhheaN_MtWNCfNsH9yXvJ4E",
    authDomain: "fir-course-f45cd.firebaseapp.com",
    projectId: "fir-course-f45cd",
    storageBucket: "fir-course-f45cd.appspot.com",
    messagingSenderId: "857765741425",
    appId: "1:857765741425:web:b751b4f05a1e9d5db1ecd0",
    measurementId: "G-SGHWDFL33N"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage=getStorage(app);