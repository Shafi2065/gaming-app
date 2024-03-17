import { db } from "../firebaseAuth";
import { doc, getDoc } from "firebase/firestore";

export default async function GetProfileByDocID(docId) {
  // Ensure docId is defined
  if (!docId) {
    console.log("docId is required");
    return null; // Early return if docId is not provided
  }

  const docRef = doc(db, "profiles", docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data(); // Return the document data if found
  } else {
    console.log("No such document!");
    return null; // Return null if the document doesn't exist
  }
}
