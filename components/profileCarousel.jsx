import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "../app/pages/home/home.css";
import Image from "react-bootstrap/Image";

export default function NextCarousel() {
  return (
    <div className="Carousel">
      <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <Image
          className="Carousel-Image"
          src="/InstagramPost.png"
          alt="First slide"
          interval={3000}
        />
      </Carousel.Item>

      <Carousel.Item>
        <Image
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
