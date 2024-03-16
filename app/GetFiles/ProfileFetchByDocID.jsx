import { db } from "../firebaseAuth";
import { doc, getDocs } from "firebase/firestore";

export default async function GetProfileByDocID(docId) {
  // Ensure docId is defined
  if (!docId) {
    console.log("docId is required");
    return null; // Early return if docId is not provided
  }
  try {
    const q = doc(db, "profiles", docId); // Get a reference to the document
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userProfile = querySnapshot.docs[0].data(); // Access the data within the document snapshot
      console.log("User's display Name is: ", userProfile.displayName);
      return userProfile; // allows us to call the function from elsewhere and get the profile data as well as owner of page
    } else {
      console.log("Profile does not exist");
      return null; // returns nothing
    }
  } catch (error) {
    console.log("Error fetching profile", error, error.code);
  }
}
