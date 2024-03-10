"use client";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from "../../loading";
import getUserProfile from "@/app/ProfileDataFetch";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import uploadImage from "@/app/cloudImageStorage";
import ColourNav from "@/components/Nav";
import GameCard from "@/components/gameCard";

export default function UserProfilePage() {
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [key, setKey] = useState("home");
  const [Hover, setHover] = useState(false);

  const defaultImageUrl = "/Create a team.jpg";

  useEffect(() => {
    const auth = getAuth();
    const fetchData = async () => {
      try {
        const userProfileData = await getUserProfile();
        console.log("userProfileData: ", userProfileData);
        if (userProfileData) {
          setUserProfile(userProfileData);
          const userId = userProfileData.userId; // Get userId separately
          setUserId(userId);
          console.log(
            "User Profile is: ",
            userProfileData.userID,
            userProfileData.displayName,
            userId
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

  const handleFileChange = (e) => {
    if (e.target.files) {
      uploadImage(e.target.files[0], setUserProfile);
    }
  };
    return (
      <div>
        <ColourNav />
        {loading && <Loading />}
        {!loading && (
          <div id="ProfileBanner">
            <Container fluid>
              <Row>
                <Col xs={2}>
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
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
                  <p id="profileBio">
                    Always down to play some games when I'm available. Send me a
                    friend request and hit me up if you'd like to join my squad.
                  </p>
                </Col>
                <Col xs={2} id="buttonColumn">
                  {!userId && (
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
        </div>
      </div>
    );
  };
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
