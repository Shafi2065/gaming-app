"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseAuth";

export default function UserProfilePage() {
  const [userProfiles, setUserProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const getProfiles = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "profiles"));
      const profiles = querySnapshot.docs.map((doc) => doc.data());
      setUserProfiles(profiles);
      console.log(userProfiles);
    } catch (error) {
      console.log("Error getting profile data", error);
    }
  };

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <>
      {userProfiles.map((profile) => (
        <div key={profile.displayName}>
          <h1>{profile.displayName}</h1>
        </div>
      ))}
    </>
  );
}
