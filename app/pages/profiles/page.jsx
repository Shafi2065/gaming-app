"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from "@/app/loading";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import FriendsBox from "@/components/FriendsBox";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { ButtonGroup, CardTitle } from "react-bootstrap";
import "./style.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ColourNav from "@/components/Nav";
import Card from "react-bootstrap/Card";
import CardImg from "react-bootstrap/CardImg";
import Image from "react-bootstrap/Image";
import { sendFriendRequest } from "@/app/FriendRequests";
import GetProfileByDocID from "@/app/GetFiles/ProfileFetchByDocID";
import MessageTable from "@/components/MessageTable";
import getUserProfile from "@/app/GetFiles/ProfileDataFetch";

export default function UserProfilePage() {
  const [key, setKey] = useState("home");
  const [isProfileOwner, setIsProfileOwner] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [profileUserId, setProfileUserId] = useState(null);
  const [loggedInProfile, setLoggedInProfile] = useState(null);

  const defaultImageUrl = "/Create a team.jpg";
  // Get the docId from the URL query string
  const searchParams = useSearchParams();

  const docId = searchParams.get("docId");

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      // This useEffect is dedicated to listening for auth state changes
      const auth = getAuth();
  
      const unsubscribe = onAuthStateChanged(auth, async (user) => { // Make the callback async
        if (user) {
          const loggedInUser = await getUserProfile();
          setLoggedInProfile(loggedInUser);
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
    };
  
    fetchLoggedInUser();
  }, [userId]); // This effect only needs to run once when the component mounts

  useEffect(() => {
    // This useEffect is dedicated to fetching profile data based on docId
    // and determining profile ownership
    const fetchData = async () => {
      try {
        const userProfileData = await GetProfileByDocID(docId);
        if (userProfileData) {
          setUserProfile(userProfileData);
          setProfileUserId(userProfileData.userID);
          console.log("User profile's user ID", userProfileData.userID);
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
    if (!userId) {
      console.log("User is not logged in");
      return;
    }
    if (userId === profileUserId) {
      console.log("You can't send a friend request to yourself");
      return;
    }
    try {
      // Send friend request
      await sendFriendRequest(userId, loggedInProfile.displayName, profileUserId, userProfile.displayName);
      console.log("Friend request sent by", userId, "to", profileUserId);
    } catch (error) {
      console.error("Error sending friend request", error);
    }
  };
  // Put all the game images in an object
  const gameImages = {
    "Dota 2": "/dota 2.jpg",
    "Apex Legends": "/Apex Legends.jpg",
    Fortnite: "/Fortnite.jpg",
    "Counter Strike 2": "/CS2.jpg",
    Minecraft: "/minecraft.jpg",
    "Destiny 2": "/destiny2.jpg",
  };

  return (
    <div>
      {loading && <Loading />}
      {!loading && (
        <div id="ProfileBanner">
          <ColourNav />
          <Container fluid>
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
                <h1
                  style={{
                    fontWeight: "600",
                    display: "inline-block",
                    marginLeft: "2rem",
                  }}
                  className="profileName"
                >
                  {userProfile.displayName}
                </h1>
                <h3
                  style={{
                    fontWeight: "600",
                    display: "inline-block",
                    marginLeft: "2rem",
                  }}
                  className="profileName"
                >
                  Member since{" "}
                  {userProfile.createdAt.toDate().toLocaleDateString()}
                </h3>
                <p
                  id="profileBio"
                  style={{ display: "inline-block", marginLeft: "2rem" }}
                >
                  {userProfile.bio}
                </p>
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
          className="mb-5"
          fill
        >
          <Tab eventKey="home" title="Home">
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
                <div>
                  <h3 className="text-center">Tags:</h3>
                  <Row>
                    {userProfile &&
                      Array.isArray(userProfile.platform) &&
                      userProfile.platform
                        .filter(Boolean) // Filter out any empty values
                        .map((platform) => (
                          <ButtonGroup
                            size="lg"
                            className="mb-3"
                            style={{ width: "auto" }}
                          >
                            <Button key={platform} value={platform}>
                              {platform}
                            </Button>
                          </ButtonGroup>
                        ))}
                  </Row>
                  <Row>
                    {userProfile &&
                      Array.isArray(userProfile.playTimes) &&
                      userProfile.playTimes
                        .filter(Boolean) // Filter out any empty values
                        .map((playTime) => (
                          <ButtonGroup
                            size="lg"
                            className="mb-3"
                            style={{ width: "auto" }}
                          >
                            <Button key={playTime} value={playTime}>
                              {playTime}
                            </Button>
                          </ButtonGroup>
                        ))}
                  </Row>
                  <Row>
                    {userProfile &&
                      Array.isArray(userProfile.tags) &&
                      userProfile.tags
                        .filter(Boolean) // Filter out any empty values
                        .map((tag) => (
                          <ButtonGroup
                            size="lg"
                            className="mb-3"
                            style={{ width: "auto" }}
                          >
                            <Button key={tag} value={tag}>
                              {tag}
                            </Button>
                          </ButtonGroup>
                        ))}
                  </Row>
                </div>
                <div className="text-center">
                  <h3>Favourite Game</h3>
                  <div className="card-container">
                    <div id="ProfileGame">
                      <Row>
                        <Col>
                          <Card>
                            <CardTitle>
                              {userProfile ? userProfile.game : ""}
                            </CardTitle>
                            <CardImg
                              variant="top"
                              src={
                                userProfile ? gameImages[userProfile.game] : ""
                              }
                              className="gameCard"
                            />
                          </Card>
                        </Col>
                      </Row>
                    </div>
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
