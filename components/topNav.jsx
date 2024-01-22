"use client";
import "../public/style.css";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

export default function TopNav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsAuthenticated(true);
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  return (
    <Navbar id="navbar" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand id="navbarTitle" Link href="/">
          Gaming-App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link id="navItems" Link href="/">
              Home
            </Nav.Link>
            <Nav.Link id="navItems" Link href="/Games">
              Live Games
            </Nav.Link>
            <Nav.Link id="navItems" Link href="/Teams">
              Find a Team
            </Nav.Link>
            <Nav.Link id="navItems" Link href="/Players">
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
                    roundedCircle
                    className="profile-image"
                  />
                }
              >
                <NavDropdown.Item id="dropDownItems" href="#action/3.1">
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
