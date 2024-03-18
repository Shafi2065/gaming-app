import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "../app/pages/home/home.css";

export default function NextCarousel() {
  return (
    <div className="Carousel">
      <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="Carousel-Image"
          src="/InstagramPost.png"
          alt="First slide"
          interval={3000}
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="Carousel-Image2"
          src="/TwitterPost.png"
          alt="Second slide"
          interval={3000}
        />
      </Carousel.Item>
    </Carousel>
    </div>
  );
}
