"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import getUserProfile from "@/app/GetFiles/ProfileDataFetch";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import updateProfile from "@/app/updateProfile";
import "./style.css";
import ColourNav from "@/components/Nav";
import UploadImage from "@/app/cloudImageStorage";
import Swal from "sweetalert2";

const EditProfilePage = () => {
  const [docId, setDocId] = useState(null);

  const [profileData, setProfileData] = useState({
    imageUrl: "",
    displayName: "",
    bio: "",
    socialMediaLinks: {
      discord: "",
      instagram: "",
      steam: "",
      twitch: "",
      youtube: "",
      twitter: "",
      other: "",
    },
  });
  const router = useRouter();

  // useEffect to fetch the logged in user's profile data
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User is logged in", user.uid);
        try {
          const userProfile = await getUserProfile();
          setProfileData(userProfile);
          setDocId(userProfile.docId);
          console.log("docId is", userProfile.docId);
        } catch (error) {
          console.log("Error fetching profile", error, error.code);
        }
      } else {
        console.log("User is not logged in");
        setIsAuthenticated(false); // It's safer not to throw an error here, just handle the state
      }
    });
    return () => unsubscribe();
  }, []);
  // function to handle profile picture change
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      UploadImage(e.target.files[0], async (imageUrl) => {
        setProfileData((prevProfile) => ({ ...prevProfile, imageUrl }));
        await updateProfile(docId, { imageUrl });
      });
    }
  };

  // Function to handle profile data changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (Object.keys(profileData.socialMediaLinks).includes(name)) {
      // If the field name exists within socialMediaLinks, update that field specifically
      setProfileData((prevProfileData) => ({
        ...prevProfileData,
        socialMediaLinks: {
          ...prevProfileData.socialMediaLinks,
          [name]: value, // Use the input's name as the key and its current value for the update
        },
      }));
    } else {
      // Otherwise, update the top-level state
      setProfileData((prevProfileData) => ({
        ...prevProfileData,
        [name]: value,
      }));
    }
  };

  // Function to handle profile changes submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profileData.docId, profileData);
      console.log("Profile updated successfully", profileData);
      Swal.fire({
        title: "Successfully updated profile!",
        text: "Taking you back to your profile page",
        icon: "success",
      });
      setTimeout(() => {
        Swal.close();
        router.push(`/pages/profiles?docId=${docId}`);
      }, 2000);
    } catch (error) {
      console.log("Error updating profile", error, error.code);
      Swal.fire({
        title: "Something went wrong",
        text: "Please reload the page and try again",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <ColourNav />
      <Form onSubmit={handleSubmit}>
        <label htmlFor="file" className="sr-only">
          Profile Picture:
        </label>
        <input id="file" type="file" onChange={handleFileChange} />
        <Form.Group controlId="displayName">
          <Form.Label>Display Name: </Form.Label>
          <Form.Control
            type="text"
            name="displayName"
            value={profileData.displayName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="bio">
          <Form.Label>Bio: </Form.Label>
          <Form.Control
            as="textarea"
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="discord">
          <Form.Label>Discord:</Form.Label>
          <Form.Control
            type="text"
            name="discord"
            value={profileData.socialMediaLinks.discord}
            onChange={(e) => handleChange(e, "discord")}
          />
        </Form.Group>

        <Form.Group controlId="instagram">
          <Form.Label>Instagram:</Form.Label>
          <Form.Control
            text="text"
            name="instagram"
            value={profileData.socialMediaLinks.instagram}
            onChange={(e) => handleChange(e, "instagram")}
          />
        </Form.Group>

        <Form.Group controlId="steam">
          <Form.Label>Steam:</Form.Label>
          <Form.Control
            text="text"
            name="steam"
            value={profileData.socialMediaLinks.steam}
            onChange={(e) => handleChange(e, "steam")}
          />
        </Form.Group>

        <Form.Group controlId="twitch">
          <Form.Label>Twitch:</Form.Label>
          <Form.Control
            text="text"
            name="twitter"
            value={profileData.socialMediaLinks.twitch}
            onChange={(e) => handleChange(e, "twitch")}
          />
        </Form.Group>

        <Form.Group controlId="youtube">
          <Form.Label>YouTube:</Form.Label>
          <Form.Control
            text="text"
            name="youtube"
            value={profileData.socialMediaLinks.youtube}
            onChange={(e) => handleChange(e, "youtube")}
          />
        </Form.Group>

        <Form.Group controlId="twitter">
          <Form.Label>Twitter:</Form.Label>
          <Form.Control
            text="text"
            name="twitter"
            value={profileData.socialMediaLinks.twitter}
            onChange={(e) => handleChange(e, "twitter")}
          />
        </Form.Group>

        <Form.Group controlId="other">
          <Form.Label>Other:</Form.Label>
          <Form.Control
            text="text"
            name="other"
            value={profileData.socialMediaLinks.other}
            onChange={(e) => handleChange(e, "other")}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditProfilePage;
