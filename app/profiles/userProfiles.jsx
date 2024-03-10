import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseAuth";
import { getAuth } from "firebase/auth";

async function createProfile(
  newDisplayName,
  newPlatform,
  newPlayTimes,
  newTags,
  newGame
) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      const docRef = await addDoc(collection(db, "profiles"), {
        userID: user.uid,
        displayName: newDisplayName,
        platform: newPlatform,
        playTimes: newPlayTimes,
        tags: newTags,
        game: newGame
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
