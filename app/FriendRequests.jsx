import { doc, runTransaction, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebaseAuth";

export async function sendFriendRequest(receiverId) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("User is not logged in");
    return;
  }
  // Construct a unique document ID for the friend request
  const friendRequestId = `${user.uid}_${receiverId}`;

  // Reference to the specific friend request document using the unique ID
  const friendRequestDocRef = doc(db, "friendRequests", user.uid, receiverId);

  console.log(`Sender ID: ${user.uid}, Receiver ID: ${receiverId}`);

  try {
    await runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(friendRequestDocRef);
      if (docSnap.exists()) {
        console.log("Friend request already exists");
        return;
      }
      const docRef = await addDoc(collection(db, "friendRequests"), {
        senderId: user.uid,
        receiverId,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      console.log("Friend request sent", docRef.id);
      return true;
    });
  } catch (error) {
    console.error("Error sending friend request: ", error, error.code);
  }
}
