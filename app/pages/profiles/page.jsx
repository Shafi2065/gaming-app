"use client";
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from "@/app/loading";
import getUserProfile from "@/app/GetFiles/ProfileDataFetch";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import FriendsBox from "@/components/FriendsBox";
import MessageTable from "@/components/MessageTable";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "./style.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import UploadImage from "@/app/cloudImageStorage";
import updateProfile from "@/app/updateProfile";
import ColourNav from "@/components/Nav";
import GameCard from "@/components/gameCard";
import { sendFriendRequest } from "@/app/FriendRequests";

import { useQuery } from "@tanstack/react-query";
import GetProfileByDocID from "@/app/GetFiles/ProfileFetchByDocID";

export default function UserProfilePage() {
  const [key, setKey] = useState("home");
  const [Hover, setHover] = useState(false);
  const [isProfileOwner, setIsProfileOwner] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  const defaultImageUrl = "/Create a team.jpg";
  const searchParams = useSearchParams()

  const docId = searchParams.get("docId")
  console.log("docId is", docId)
  const auth = getAuth();
  const user = auth.currentUser;
  console.log("User is", user);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfileData = await GetProfileByDocID(docId);
        if (userProfileData) {
          setUserProfile(userProfileData);
          console.log("User profile found", userProfileData);
        } else {
          console.log("User profile not found");
        }
      } catch (error) {
        console.log("Error fetching profile", error);
      } finally {
        setLoading(false);
      }
    };
      fetchData();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      UploadImage(e.target.files[0], async (imageUrl) => {
        setUserProfile((prevProfile) => ({ ...prevProfile, imageUrl }));
        if (isProfileOwner) {
          await updateProfile(userId, { imageUrl });
        }
      });
    }
  };
  const handleFriendRequest = async (userId) => {
    if (!userId) {
      console.log("Receiver userID is not available");
      return;
    }
    try {
      await sendFriendRequest(userId);
      console.log("Friend Request sent successfully");
    } catch (error) {
      console.log("Error sending Friend Request", error, error.code);
    } finally {
      setLoading(false);
    }
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
                  <img
                    src={userProfile.imageUrl || defaultImageUrl}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={() => {
                      // Trigger the file input when the image is clicked
                      document.getElementById("fileInput")?.click();
                    }}
                    style={{ width: "100%" }}
                    className={Hover ? `hover` : ""}
                  />
                  {/* Hidden file input */}
                  <input
                    id="fileInput"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  {Hover && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        color: "white",
                        padding: "10px",
                        borderRadius: "5px",
                      }}
                    >
                      <h2>Test</h2>
                    </div>
                  )}
                </div>
              </Col>
              <Col xs={3}>
                <h3 style={{ fontWeight: "600" }} className="profileName">
                  {userProfile.displayName}
                </h3>
                <h3 style={{ fontWeight: "600" }} className="profileName">
                  Member since {userProfile.today}
                </h3>
                <p id="profileBio">{userProfile.bio}</p>
              </Col>
              <Col xs={2} id="buttonColumn">
                {!isProfileOwner && (
                  <>
                    <Button className="Friend-button">
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
            <div className="text-center">
              <h3>Favourite Games</h3>
              <div className="card-container">
                <GameCard />
              </div>
            </div>
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
{
  /* <div id="SecondSection">
            <Row>
              <Col>
                <Tabs
                  id="profileTab"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3"
                >
                  <Tab eventKey="home" title="Home">
                    <Row>
                      <Col>
                        <h3>Favourite Games</h3>
                      </Col>
                    </Row>
                    <Row>
                      <ComponentCard />
                    </Row>
                  </Tab>
                  <Tab eventKey="friends" title="Friends">
                    Tab content for Profile
                  </Tab>
                  <Tab eventKey="messages" title="Messages">
                    Tab content for Contact
                  </Tab>
                  <Tab eventKey="videos" title="Videos">
                    Tab content for Contact
                  </Tab>
                  <Tab eventKey="Feed" title="Feed">
                    Tab content for Contact
                  </Tab>
                </Tabs>
                <p>Additional content under the tab menu near the top</p>
              </Col>
              <Col className="text-end" id="SideContent">
                <h6>Social Media</h6>
                <h6>Discord</h6>
                <h6>Facebook</h6>
              </Col>
            </Row>
          </div> */
}
