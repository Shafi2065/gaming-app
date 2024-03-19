"use client";
import "../public/Navstyle.css";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import getUserProfile from "@/app/GetFiles/ProfileDataFetch";
import Image from "react-bootstrap/Image";

export default function ColourNav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [docId, setDocId] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        try {
          const profileData = await getUserProfile();
          setUserProfile(profileData);
          setDocId(profileData.docId);
          console.log("User profile found", profileData);
          console.log("docId is", profileData.docId);
        } catch (error) {
          console.log("Error fetching profile", error, error.code);
        }
        // Check if profile exists
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // ...
      } else {
        setIsAuthenticated(false);
        // User is signed out
        // ...
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Navbar id="navbar" collapseOnSelect expand="lg">
      <Container>
        <Link href="/">
          <Navbar.Brand id="navbarTitle">
            <Image
              src="/Logo.png"
              width="150"
              height="60"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link id="navItems" href="/pages/home">
              Home
            </Nav.Link>
            <Nav.Link id="navItems" href="/pages/Games">
              Live Games
            </Nav.Link>
            <Nav.Link id="navItems" href="/pages/find-team">
              Find a Team
            </Nav.Link>
            <Nav.Link id="navItems" href="/pages/SearchProfiles">
              Search Players
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            {isAuthenticated && userProfile && (
              <NavDropdown
                id="collapsible-nav-dropdown"
                title={
                  <Image src={userProfile.imageUrl || "/default-profile.png"}  className="profile-image" alt="Profile Picture" />
                }
              >
                <NavDropdown.Item id="dropDownItems">
                  Welcome,{" "}
                  {userProfile ? userProfile.displayName : "Loading..."}
                </NavDropdown.Item>
                {isAuthenticated && userProfile && userProfile.docId && (
                  <>
                  <NavDropdown.Item
                    id="dropDownItems"
                    href={`/pages/profiles?docId=${docId}`}
                  >
                    My Profile
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    id="dropDownItems"
                    href={`./profiles/EditProfile`}
                  >
                    Edit Profile
                  </NavDropdown.Item>
                  </>
                )}
                <NavDropdown.Item id="dropDownItems" href="#action/3.2">
                  My Teams
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item id="redDropDownItems" href="#action/3.4">
                  Deactivate Profile
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {!isAuthenticated && (
              <div id="register-container">
                <button id="register-button">
                  REGISTER NOW
                  <span id="register-span">&#9747;</span>
                </button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
