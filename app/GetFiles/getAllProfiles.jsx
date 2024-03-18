import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseAuth";

export default async function GetAllProfiles() {
    const querySnapshot = await getDocs(collection(db, "profiles"));
    const profiles = [];
    querySnapshot.forEach(doc => {
      profiles.push({ id: doc.id, ...doc.data() });
    });
    return profiles;
  }
