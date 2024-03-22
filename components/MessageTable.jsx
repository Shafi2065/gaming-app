import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { getAuth } from "firebase/auth";
import { db } from "../app/firebaseAuth";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  runTransaction,
} from "firebase/firestore";
import { Button } from "react-bootstrap";

const handleAccept = async (friendRequestDocRef) => {
  console.log("Accepting friend request", friendRequestDocRef.id);
  // Update the friend request status to "rejected"
  updateFriendRequestStatus(friendRequestDocRef.id, "accepted");
  // delete doc from friends requests collection
};

const handleDecline = (friendRequestDocRef) => {
  console.log("Declining friend request", friendRequestDocRef.id);
  // Update the friend request status to "rejected"
  updateFriendRequestStatus(friendRequestDocRef.id, "rejected");
  // delete doc from friends requests collection
};

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

export default function MessageTable() {
  const [selectedOption, setSelectedOption] = useState("friendRequests");
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      console.error("User is not logged in");
      return;
    }

    const fetchFriendRequests = async () => {
      const friendRequestsRef = collection(db, "friendRequests");

      const q = query(friendRequestsRef, where("receiverId", "==", user.uid));

      const querySnapshot = await getDocs(q);
      console.log("querySnapshot", querySnapshot.docs);
      setFriendRequests(querySnapshot.docs);
    };
    fetchFriendRequests();
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => setSelectedOption("friendRequests")}>
          Friend Requests
        </button>
        <button onClick={() => setSelectedOption("messages")}>Messages</button>
      </div>

      {selectedOption === "friendRequests" && (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Display Name</th>
              <th>Status</th>
              <th>Request Received on</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {friendRequests.map((friendRequests, index) => (
              <tr key={friendRequests.id}>
                <td>{index + 1}</td>
                <td>{friendRequests.data().senderDisplayName}</td>
                <td>{friendRequests.data().status}</td>
                <td>
                  {friendRequests
                    .data()
                    .createdAt.toDate()
                    .toLocaleDateString()}
                </td>
                <td>
                  {friendRequests.data().status === "pending" && (
                    <>
                      <Button
                        onClick={() =>
                          updateFriendRequestStatus(
                            friendRequests.id,
                            "accepted"
                          )
                        }
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() =>
                          updateFriendRequestStatus(
                            friendRequests.id,
                            "rejected"
                          )
                        }
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {selectedOption === "messages" && (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Display Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Larry the Bird</td>
            </tr>
          </tbody>
        </Table>
      )}
    </div>
  );
}
