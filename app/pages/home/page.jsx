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
import { GameCard, SupportedGames } from "@/components/gameCard";

function BgVideo() {
  return (
    <div className="video-container">
      <video autoPlay loop muted>
        <source src={"/TestVideo.mp4"} type="video/mp4" />
      </video>
      <div className="overlay"></div>
    </div>
  );
}
export default function Home() {
  return (
    <div>
      <ColourNav />
      <div className="main-content">
        <BgVideo />
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
          <Row className="mb-5">
            <Col>
              <h1 className="heading">Build Your Clan</h1>
              <p className="subtext">
                Connect with other gamers and create your own team to play with.{" "}
                Can't find players that match your skill level? You can filter
                via competitive players when recruiting for your team. Need a
                team that has a schedule that matches yours? Join a team and
                filter by the time they play.
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
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <div className="text-center">
                <h1 className="heading">Supported Games</h1>
                <SupportedGames />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="fourth-content">
        <Container fluid>
          <Row>
            <Col>
            <h1 className="heading">Level Up Your <span className="highlighted-word">&nbsp;GAME</span></h1>
              <p className="subtext">
                Tired of playing online with people you have no information on? 
                {" "} Gaming-App allows you to view players before you jump into a game.
                {" "} View in-game statistics, view the skill level, or intent for playing
                {" "} to find the perfect match for your gaming experience.
              </p>
              <div id="Buttons">
                <Button className="Secondary-button">
                  View All Live Games
                </Button>
              </div>
            </Col>
            <Col>
              <div id="LiveGameDiv">
                <LiveGameCards />
              </div>
            </Col>
          </Row>
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
