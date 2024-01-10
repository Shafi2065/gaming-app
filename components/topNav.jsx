"use client";
import "../public/style.css";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function TopNav() {
  return (
    <Navbar id="navbar" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand id="navbarTitle" Link href="/">
          Gaming-App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link id="navItems" Link href="/features">
              Home
            </Nav.Link>
            <Nav.Link id="navItems" Link href="#pricing">
              Live Games
            </Nav.Link>
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
