import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebaseAuth";

const updateProfile = async (userID, data) => {
  // Query the profiles collection for documents with the matching userID
  const profilesCollectionRef = collection(db, "profiles");
  const q = query(profilesCollectionRef, where("userID", "==", userID));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    
    const docRef = querySnapshot.docs[0].ref;
    
    await updateDoc(docRef, data);
    console.log("Profile updated successfully.");
  } else {
    throw new Error("Profile document not found.");
  }
};

export default updateProfile;
