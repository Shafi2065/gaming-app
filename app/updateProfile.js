import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseAuth";

const updateProfile = async (docId, data) => {
  if (!docId) {
    throw new Error("docId is required");
  }
  // Query the profiles collection for documents with the matching docId
  const docRef = doc(db, "profiles", docId);
  
  try {
    // Update the document with the matching docId
    await updateDoc(docRef, data);
    console.log("Document successfully updated!");
  } catch(e) {
    console.error("Error updating document: ", e);
    throw new Error("failed to update profile");
  }
}
export default updateProfile;
