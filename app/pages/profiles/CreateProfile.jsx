import {
  addDoc,
  collection,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebaseAuth";
import { getAuth } from "firebase/auth";

async function createProfile(
  newDisplayName,
  newPlatform,
  newPlayTimes,
  newTags,
  newGame,
  imageUrl = "https://firebasestorage.googleapis.com/v0/b/gaming-app-83a01.appspot.com/o/ProfileImages%2FProfile3.jpg?alt=media&token=b9ed2379-7631-4fb3-8500-87b81d4d6e88",
  bio = "This user is currently a mystery but we are sure they are great!",
  commends = 0,
) {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    console.log("Not signed in");
    return false;
}
  if (user) {
    try {
      const docRef = await addDoc(collection(db, "profiles"), {
        userID: user.uid,
        displayName: newDisplayName,
        platform: newPlatform,
        playTimes: newPlayTimes,
        tags: newTags,
        game: newGame,
        imageUrl,
        bio,
        commends,
      });
      console.log("Successfully created profile with ID: ", docRef.id);
      return true;
    } catch (error) {
      console.log("error creating profile", error);
      return false;
    }
  } else {
    console.log("Not signed in");
    return false;
  }
}

export default createProfile;
