"use client";
import React from "react";
import "../public/style.css";
import TopNav from "../components/topNav";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./firebaseAuth";
import { useRouter } from "next/navigation";

function BgVideo() {
  return (
    <div className="video-container">
      <video autoPlay loop muted>
        <source src={"/versus3080p.mp4"} type="video/mp4" />
      </video>
      <div className="overlay"></div>
    </div>
  );
}

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
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

  const handleRedirect = () => {
    if (isAuthenticated) {
      router.push("/find-team"); // Replace "/authenticated-page" with your actual authenticated page
    } else {
      router.push("/login");
    }
  };
  return (
    <div className="homeContainer">
      {isAuthenticated && <TopNav />}
      <div className="homepage">
        <BgVideo />
        <div className="homepage-content">
          <h1>Gaming App</h1>
          <button
            id="homepage-button"
            className="button"
            onClick={handleRedirect}
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}
export default Home;
