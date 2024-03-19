import Card from "react-bootstrap/Card";
import CardImg from "react-bootstrap/CardImg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../app/pages/profiles/style.css";
import Form from "react-bootstrap/Form";
import React from "react";


function GameCard() {
  return (
    <div>
      <Row>
        <Col>
          <Card>
            <Card.Img variant="top" src="/dota 2.jpg" className="gameCard" />
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src="/Fortnite.jpg" className="gameCard" />
          </Card>
        </Col>
        <Form.Range />
      </Row>
    </div>
  );
}

function SupportedGames() {
  return (
    <div class="card-group card-group-scroll">
      <div class="card">
        <img
          src="/Apex Legends.jpg"
          class="card-img-top"
          alt="Apex Legends"
        />
      </div>
      <div class="card">
        <img
          src="/Dota 2.jpg"
          class="card-img-top"
          alt="Palm Springs Road"
        />
      </div>
      <div class="card">
        <img
          src="/Fortnite.jpg"
          class="card-img-top"
          alt="Palm Springs Road"
        />
        </div>
        <div class="card">
        <img
          src="/warzone.jpg"
          class="card-img-top"
          alt="Palm Springs Road"
        />
        </div>
        <div class="card">
        <img
          src="/destiny2.jpg"
          class="card-img-top"
          alt="Palm Springs Road"
        />
        </div>
        <div class="card">
        <img
          src="/minecraft.jpg"
          class="card-img-top"
          alt="Palm Springs Road"
        />
        </div>
    </div>
  );
}
export { GameCard, SupportedGames };
