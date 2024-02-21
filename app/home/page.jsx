"use client";
import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TopNav from "@/components/topNav";
import ComponentCard from "@/components/card";
import ComponentCarousel from "@/components/carousel";
import NextCarousel from "@/components/profileCarousel";
import "../firebaseAuth";
import "./home.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { useState } from "react";
import LiveGameCards from "@/components/livegamecard";

export default function Home() {
  return (
    <div>
      <TopNav />
      <div className="main-content">
        <Container fluid>
          <Row>
            <Col>
              <h1 className="heading">Welcome to Gaming-App</h1>
              <p className="subtext">
                Connect with gamers and explore the gaming community.
              </p>
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
    </div>
  );
}
