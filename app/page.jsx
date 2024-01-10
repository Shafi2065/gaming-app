"use client";
import { gsap } from "gsap";
import TopNav from "../components/topNav";
import Footer from "../components/footer"
import "../public/style.css";
import "./globals.css";
import { useState, useEffect } from "react";
import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './firebaseAuth';

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  
    return () => unsubscribe(); 
  }, []); 
 // Define the timeline for the banner animations
  useEffect(() => {
    var t1 = gsap.timeline();
    var tween = gsap.fromTo(
      ".bannerText",
      { opacity: 0, x: -200 },
      { duration: 2.5, opacity: 1, x: 0 }
    );
    var tween2 = gsap.fromTo(
      ".bannerButton",
      { opacity: 0 },
      { duration: 2.5, opacity: 1, delay: 1 }
    );
    t1.add(tween);
    t1.add(tween2);
  }, []);

  // Define the animations for the explore containers
  const exploreAnimations = () => {
    // Trigger animations when the exploreContainer comes into view
    gsap.fromTo("#exploreContainer", {
      opacity: 0,
      y: -200,
      duration: 1,
    },
      {
        opacity: 1,
        y: 0,
      scrollTrigger: {
        trigger: "#exploreContainer",
        ease: "power1.inOut",
        pin: false,
        start: "top top"
      },
    });

    // Trigger animations when the exploreContainer2 comes into view
    gsap.fromTo("#exploreContainer2", {
      opacity: 0,
      x: -200,
      duration: 1,
    },
    {
      opacity: 1,
      x: 0,
      delay: 1,
      scrollTrigger: {
        trigger: "#exploreContainer2",
        ease: "power1.inOut",
        pin: false,
        start: "bottom bottom"
      },
    });
  };

  useEffect(() => {
    exploreAnimations();
  }, []);

  return (
    <>
      <div className="homeContainer">
        {isAuthenticated && <TopNav />}
        <div className="bannerContent">
          <h1 className="bannerText">Find Your Place.</h1>
          <Button variant="primary" Link href="/login">
            Explore
          </Button>{" "}
        </div>
      </div>
      <div className="exploreContent">
        <Container id="exploreContainer">
          <Row>
            <h2>Gear up for Multiplayer</h2>
            <p>
              Be better prepared for online gaming by creating a team with
              people you select to gear up for competitive gaming or a relaxed
              session.
            </p>
            <Button variant="primary" Link href="/login">
              Create a team
            </Button>{" "}
          </Row>
          </Container>

          <Container id="exploreContainer2" fluid>
          <Row id="secondRow">
            <Col id="col1">
              <h2>Gear up for Multiplayer</h2>
              <p>
                Be better prepared for online gaming by creating a team with
                people you select to gear up for competitive gaming or a relaxed
                session.
              </p>
            </Col>
            <Col id="col2">
              <h2>Gear up for Multiplayer</h2>
              <p>
                Be better prepared for online gaming by creating a team with
                people you select to gear up for competitive gaming or a relaxed
                session.
              </p>
            </Col>
            <Col md id="col3">
              <h2>Gear up for Multiplayer</h2>
              <p>
                Be better prepared for online gaming by creating a team with
                people you select to gear up for competitive gaming or a relaxed
                session.
              </p>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </>
  );
}
