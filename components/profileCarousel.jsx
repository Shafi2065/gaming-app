import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "../app/home/home.css";

export default function NextCarousel() {
    return (
      <div className="Carousel">
        <Carousel fade data-bs-theme="light">
          <Carousel.Item>
            <img src="Profile.jpg" text="First slide" />
            <Carousel.Caption>
              <h3>haha</h3>
              <p>
               123
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="Profile2.jpg" text="Second slide" />
            <Carousel.Caption>
              <h3>Looking for new members?</h3>
              <p>
                Use our comprehensive member recruitment system to find the
                teammates you want, whether its for a competition or a relaxing
                session.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="Profile3.jpg" text="Third slide" />
            <Carousel.Caption>
              <h3>In need of organization in your team?</h3>
              <p>
                Keep everything documented by adding a list of games to be played
                and displayed tags to let users know your gaming platforms, social
                media links and rules.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }