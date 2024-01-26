import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCN-90uldG5_72H1nqI0iGTsfddmkoLVY8",
  authDomain: "gaming-app-83a01.firebaseapp.com",
  projectId: "gaming-app-83a01",
  storageBucket: "gaming-app-83a01.appspot.com",
  messagingSenderId: "376270645962",
  appId: "1:376270645962:web:91a2c8e53cd44100ce6233",
  measurementId: "G-H4YCETZ4FY",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

export { db };