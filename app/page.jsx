"use client";
import React from "react";
import "../public/style.css";
import TopNav from "../components/topNav";
import Footer from "../components/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./firebaseAuth";
import { useRouter } from "next/navigation";

function BgVideo() {
  return (
    <div className="video-container">
      <video autoPlay loop muted>
        <source src={"/test homepage bg.mp4"} type="video/mp4" />
      </video>
      <div className="overlay"></div>
    </div>
  );
}

function Home() {
  const router = useRouter();

  const handleRedirect = () => {
   router.push("/pages/home");
  };
  return (
    <>
      <TopNav />
      <div className="homepage">
        <BgVideo />
      </div>
      <div className="homepage-content">
        <h1>Gaming App</h1>
        <button
          id="homepage-button"
          className="button"
          onClick={handleRedirect}
        >
          {" "}
          <span className="right-arrow">&#9654;</span>
          Explore
        </button>
      </div>
    </>
  );
}
export default Home;
