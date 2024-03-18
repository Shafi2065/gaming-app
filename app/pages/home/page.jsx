"use client";
import * as React from "react";
import ComponentCard from "@/components/card";
import NextCarousel from "@/components/profileCarousel";
import "../../firebaseAuth";
import "./home.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import LiveGameCards from "@/components/livegamecard";
import ColourNav from "@/components/Nav";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  return (
    <div>
      <ColourNav />
      <div className="main-content">
        <Container fluid>
          <Row>
            <Col>
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed once, initially
                  "Welcome to Gaming-App",
                ]}
                speed={50}
                wrapper="h1"
                className="heading"
                cursor={false}
              />
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed once, initially
                  "Explore the gaming community!",
                  3000,
                  "Quickly jump into a game!",
                  3000,
                  "Never miss out on an epic multiplayer experience!",
                  3000,
                  "Win exciting prizes!",
                  3000,
                ]}
                speed={50}
                deletionSpeed={66}
                wrapper="h3"
                className="subtext"
                cursor={true}
                repeat={Infinity}
              />
              <Button className="Secondary-button">Get Started</Button>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="third-content">
        <Container fluid>
          <Row>
            <Col>
              <h1 className="heading">Teams</h1>
              <p className="subtext">
                Join or create a team to enhance your gaming experience
              </p>
              <Row>
                <div id="Buttons">
                  <Button className="Primary-button">Create a Team</Button>
                  <Button className="Secondary-button">Find a Team</Button>
                </div>
              </Row>
            </Col>
            <Col>
              <ComponentCard />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="fourth-content">
        <Container fluid>
          <h1 className="heading">Featured Live Games</h1>
          <p className="subtext">
            Want to play multiplayer games with players of your choice?
          </p>
          <p className="subtext">
            Jump into custom lobbies for live gaming sessions
          </p>
          <div id="Buttons">
            <Button className="Secondary-button">View All Live Games</Button>
          </div>
          <div id="LiveGameDiv">
            <LiveGameCards />
          </div>
        </Container>
      </div>
      <div className="fourth-content">
        <Container fluid>
          <h1 className="heading">Reviews</h1>
          <p className="subtext">
            See what others have to say about their experience using Gaming-App
          </p>
          <div>
            <NextCarousel />
          </div>
        </Container>
      </div>
    </div>
  );
}
