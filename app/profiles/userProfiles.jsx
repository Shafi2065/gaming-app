import React from "react";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseAuth";
import { getAuth } from "firebase/auth";

async function createProfile(
  newDisplayName,
  newPlatform,
  newPlayTimes,
  newTags
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
      });
      console.log("Successfully created profile with ID: ", docRef.id);
    } catch (error) {
      console.log("error creating profile", error);
    }
  } else {
    console.log("Not signed in");
  }
  return <div></div>;
}

export default createProfile;
