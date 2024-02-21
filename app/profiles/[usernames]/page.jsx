"use client";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from "../../loading";
import getUserProfile from "@/app/ProfileDataFetch";

export default function UserProfilePage() {
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const fetchData = async () => {
      try {
        const userProfileData = await getUserProfile();
        console.log("userProfileData: ", userProfileData);
        if (userProfileData) {
          setUserProfile(userProfileData);
          console.log(
            "User Profile is: ",
            userProfileData.userID,
            userProfileData.displayName
          );
        } else {
          console.log("User profile not found");
        }
      } catch (error) {
        console.log("Error fetching profile", error, error.code);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div>
          <h1>{userProfile?.displayName}</h1>
          <h3>You like to play on {userProfile?.playTimes}</h3>
        </div>
      )}
    </>
  );
}
