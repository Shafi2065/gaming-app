"use client";
import "../public/style.css";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import getUserProfile from "@/app/GetFiles/ProfileDataFetch";

export default function TopNav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        try {
          const profileData = await getUserProfile();
          setUserProfile(profileData);
        } catch(error) {
          console.log("Error fetching profile", error, error.code)
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
            <img
              src="Logo.png"
              width="150"
              height="60"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link id="navItems" href="/home">
              Home
            </Nav.Link>
            <Nav.Link id="navItems" href="/Games">
              Live Games
            </Nav.Link>
            <Nav.Link id="navItems" href="/Teams">
              Find a Team
            </Nav.Link>
            <Nav.Link id="navItems" href="/Players">
              Search Players
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            {isAuthenticated && (
              <NavDropdown
                id="collapsible-nav-dropdown"
                title={
                  <img
                    src="default-profile.png"
                    className="profile-image"
                  />
                }
              >
                 <NavDropdown.Item id="dropDownItems">
                 Welcome, {userProfile ? userProfile.displayName : "Loading..."}
                </NavDropdown.Item>
                <NavDropdown.Item id="dropDownItems" href="./profiles/[usernames]">
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item id="dropDownItems" href="#action/3.2">
                  My Teams
                </NavDropdown.Item>
                <NavDropdown.Item id="dropDownItems" href="#action/3.3">
                  Friends List
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
