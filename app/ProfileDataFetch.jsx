import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebaseAuth";

export default async function getUserProfile() {
  const auth = getAuth();
  const user = auth.currentUser;
  //ToDo get the authenticated user and then get their profile data
  // which is stored in their cloud firestore profiles document
  if (user) {
    try {
      const userId = user.uid; // create a variable that holds the individual user based on their userID
      const q = query( //Maps through the entire collection then
        collection(db, "profiles"), //looks for the document with userID db field matching the userID variable
        where("userID", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userProfile = querySnapshot.docs[0].data(); // Access the data within the document snapshot
        console.log("User's display Name is: ", userProfile.displayName);
        return userProfile // allows us to call the function from elsewhere and get the profile data as well as owner of page
      } else {
        console.log("Profile does not exist");
        return null; // returns nothing
      }
    } catch (error) {
      console.log("Error fetching profile", error, error.code);
    }
  } else {
    console.log("User is not logged in");
  }
}
// The profile is not being fetched currently, fix the registration page and then test again with a new incognito user.
