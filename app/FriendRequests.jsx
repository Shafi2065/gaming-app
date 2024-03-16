import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebaseAuth";

// This function should ideally take the receiver's user ID or display name as an argument
export async function sendFriendRequest(receiverUserId) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("User is not logged in");
    return;
  }

  // Assuming `receiverUserId` is the UID of the user receiving the friend request
  try {
    // Adding the friend request to the sender's subcollection
    await addDoc(collection(db, `profiles/${user.uid}/friendRequests`), {
      senderId: user.uid, // Current user's ID
      receiverId: receiverUserId,
      pending: "Pending",
      timestamp: new Date(), // You can use serverTimestamp() if you prefer
    });

    await addDoc(collection(db, `profiles/${receiverUserId}/friendRequests`), {
      senderId: user.uid,
      receiverId: receiverUserId,
      pending: "Pending",
      timestamp: new Date(), // Or serverTimestamp()
    });

    console.log("Friend request sent successfully.");
  } catch (error) {
    console.error("Could not send the friend request", error);
  }
}
