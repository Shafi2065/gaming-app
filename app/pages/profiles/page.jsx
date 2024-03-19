"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from "@/app/loading";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import FriendsBox from "@/components/FriendsBox";
import MessageTable from "@/components/MessageTable";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "./style.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ColourNav from "@/components/Nav";
import { GameCard, SupportedGames } from "@/components/gameCard";
import Image from "react-bootstrap/Image";
import { sendFriendRequest } from "@/app/FriendRequests";
import GetProfileByDocID from "@/app/GetFiles/ProfileFetchByDocID";

export default function UserProfilePage() {
  const [key, setKey] = useState("home");
  const [isProfileOwner, setIsProfileOwner] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  const defaultImageUrl = "/Create a team.jpg";
  // Get the docId from the URL query string
  const searchParams = useSearchParams();

  const docId = searchParams.get("docId");

  useEffect(() => {
    // This useEffect is dedicated to listening for auth state changes
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        console.log("User is logged in as", user.uid);
      } else {
        setUserId(null);
        setIsProfileOwner(false); // Reset ownership when logged out
        console.log("User is not logged in");
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []); // This effect only needs to run once when the component mounts

  useEffect(() => {
    // This useEffect is dedicated to fetching profile data based on docId
    // and determining profile ownership
    const fetchData = async () => {
      try {
        const userProfileData = await GetProfileByDocID(docId);
        if (userProfileData) {
          setUserProfile(userProfileData);
          console.log("User profile found", userProfileData);

          // Determine profile ownership
          if (userId && userProfileData.userID === userId) {
            setIsProfileOwner(true);
            console.log("User is the profile owner");
          } else {
            setIsProfileOwner(false);
            console.log("User is not the profile owner");
          }
        } else {
          console.log("Profile not found");
          setUserProfile(null);
        }
      } catch (error) {
        console.log("Error fetching profile", error);
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    };

    if (docId) {
      fetchData();
    }
  }, [docId, userId]); // Rerun this effect when docId or userId changes

  const handleFriendRequest = async () => {
    const Auth = getAuth();
    const unsubscribe = onAuthStateChanged(Auth, async (user) => {
      if (user) {
        try {
          await sendFriendRequest(docId);
          console.log("Friend request sent by", user.uid, "to", docId);
        } catch (error) {
          console.error("Error sending friend request", error);
        }
      } else {
        console.log("User is not logged in.");
      }
    });
    return () => unsubscribe();
  };

  return (
    <div>
      {loading && <Loading />}
      {!loading && (
        <div id="ProfileBanner">
          <Container fluid>
            <ColourNav />
            <Row>
              <Col xs={2}>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <Image
                    src={userProfile.imageUrl || defaultImageUrl}
                    style={{ width: "100%" }}
                    alt="Profile picture"
                  />
                </div>
              </Col>
              <Col xs={3}>
                <h1 style={{ fontWeight: "600" }} className="profileName">
                  {userProfile.displayName}
                </h1>
                <h3 style={{ fontWeight: "600" }} className="profileName">
                  Member since {userProfile.createdAt.toDate().toLocaleDateString()}
                </h3>
                <p id="profileBio">{userProfile.bio}</p>
              </Col>
              <Col xs={2} id="buttonColumn">
                {!isProfileOwner && (
                  <>
                    <Button
                      className="Friend-button"
                      onClick={handleFriendRequest}
                    >
                      Send Friend Request
                    </Button>
                    <Button className="Message-button">Send a message</Button>
                    <Button className="Report-button">Report Player</Button>
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      )}
      <div id="SecondSection">
        <Tabs
          id="profileTab"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
          fill
        >
          <Tab eventKey="home" title="Home">
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
                <div className="text-center">
                  <h3>Favourite Games</h3>
                  <div className="card-container">
                    <GameCard />
                  </div>
                </div>
              </Col>
              <Col md={3} className="text-end" id="SideContent">
                {userProfile && userProfile.socialMediaLinks ? (
                  <>
                    {/* Render social media links if they exist */}
                    {userProfile.socialMediaLinks.discord && (
                      <h6>Discord: {userProfile.socialMediaLinks.discord}</h6>
                    )}
                    {userProfile.socialMediaLinks.twitter && (
                      <h6>Twitter: {userProfile.socialMediaLinks.twitter}</h6>
                    )}
                    {userProfile.socialMediaLinks.instagram && (
                      <h6>
                        Instagram: {userProfile.socialMediaLinks.instagram}
                      </h6>
                    )}
                    {userProfile.socialMediaLinks.steam && (
                      <h6>Steam: {userProfile.socialMediaLinks.steam}</h6>
                    )}
                    {userProfile.socialMediaLinks.twitch && (
                      <h6>Twitch: {userProfile.socialMediaLinks.twitch}</h6>
                    )}
                    {userProfile.socialMediaLinks.youtube && (
                      <h6>YouTube: {userProfile.socialMediaLinks.youtube}</h6>
                    )}
                    {userProfile.socialMediaLinks.other && (
                      <h6>Other: {userProfile.socialMediaLinks.other}</h6>
                    )}
                  </>
                ) : (
                  // Display a message or leave empty if socialMediaLinks is null or undefined
                  <h6>No social media links provided.</h6>
                )}
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="friends" title="Friends">
            <div id="FriendsSection">
              <h3>Friends List</h3>
              <FriendsBox />
            </div>
          </Tab>
          {isProfileOwner && (
            <Tab eventKey="messages" title="Messages">
              <MessageTable />
            </Tab>
          )}
          <Tab eventKey="videos" title="Videos">
            Tab content for Contact
          </Tab>
          <Tab eventKey="feed" title="Feed">
            Tab content for Contact
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
