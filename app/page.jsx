"use client";
import { gsap } from "gsap";
import TopNav from "../components/topNav";
import "../public/style.css";
import "./globals.css";
import { useEffect } from "react";
<<<<<<< Updated upstream

export default function Index() {
=======
import * as React from "react";
import { useState } from 'react';
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

    // Cleanup function to unsubscribe from onAuthStateChanged
    return () => unsubscribe();
  }, []);
  // Define the timeline for the banner animations
>>>>>>> Stashed changes
  useEffect(() => {
    var t1 = gsap.timeline();

    var tween = gsap.fromTo(".bannerText", { opacity: 0, x: -200}, { duration: 2.5, opacity: 1, x: 0 });
    var tween2 = gsap.fromTo(".bannerButton", { opacity: 0 }, {duration: 2.5, opacity: 1, delay: 1});
    t1.add(tween);
    t1.add(tween2);
  }, []);

<<<<<<< Updated upstream
  return (
    <>
      <div className="homeContainer">
      <TopNav />
=======
  // Define the animations for the explore containers
  const exploreAnimations = () => {
    var t2 = gsap.timeline();
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
        start: "center center"
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
>>>>>>> Stashed changes
        <div className="bannerContent">
          <h1 className="bannerText">Find Your Place.</h1>
          <button className="bannerButton">Explore</button>
        </div>
      </div>
      <div className="exploreContent">
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
          took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
          but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s 
          with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
          software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </div>
    </>
  );
}
