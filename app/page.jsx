"use client";
import { gsap } from "gsap";
import TopNav from "../components/topNav";
import "../public/style.css";
import "./globals.css";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    var t1 = gsap.timeline();

    var tween = gsap.fromTo(".bannerText", { opacity: 0, x: -200}, { duration: 2.5, opacity: 1, x: 0 });
    var tween2 = gsap.fromTo(".bannerButton", { opacity: 0 }, {duration: 2.5, opacity: 1, delay: 1});
    t1.add(tween);
    t1.add(tween2);
  }, []);

  return (
    <>
      <div className="homeContainer">
      <TopNav />
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
