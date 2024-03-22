import {
  doc,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebaseAuth";
import { serverTimestamp } from "firebase/firestore";

async function sendFriendRequest(
  senderId,
  senderDisplayName,
  receiverId,
  receiverDisplayName
) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("User is not logged in");
    return;
  }
  if (!senderId || !receiverId) {
    console.error("Sender ID or Receiver ID is missing");
    return;
  }
  // Construct a unique document ID for the friend request
  const friendRequestId = `${user.uid}_${receiverId}`;

  // Reference to the specific friend request document using the unique ID
  const friendRequestDocRef = doc(db, "friendRequests", friendRequestId);

  console.log(`Sender ID: ${user.uid}, Receiver ID: ${receiverId}`);

  try {
    await runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(friendRequestDocRef);

      if (docSnap.exists()) {
        console.log("Friend request already exists");
        return;
      }

      // Create the friend request within the transaction
      await transaction.set(friendRequestDocRef, {
        senderId: user.uid,
        senderDisplayName,
        receiverId,
        receiverDisplayName,
        status: "pending" || "accepted" || "rejected",
        createdAt: serverTimestamp(),
      });

      console.log("Friend request sent", friendRequestDocRef.id);
      return true;
    });
  } catch (error) {
    console.error("Error sending friend request: ", error, error.code);
  }

  const handleAccept = (friendRequestDocRef) => {
    console.log("Accepting friend request", friendRequestDocRef.id);
    // Update the friend request status to "accepted"
    updateFriendRequestStatus(friendRequestDocRef.id, "accepted");
  };
  
  const handleDecline = (friendRequestDocRef) => {
    console.log("Declining friend request", friendRequestDocRef.id);
    // Update the friend request status to "rejected"
    updateFriendRequestStatus(friendRequestDocRef.id, "rejected");
  };
}
async function updateFriendRequestStatus(friendRequestId, newStatus) {
  try {
    const friendRequestDocRef = doc(db, "friendRequests", friendRequestId);
    await updateDoc(friendRequestDocRef, { status: newStatus });
    console.log(
      "Friend request status updated successfully:",
      friendRequestId,
      newStatus
    );
  } catch (error) {
    console.error("Error updating friend request:", error);
  }
}

export {sendFriendRequest, updateFriendRequestStatus};