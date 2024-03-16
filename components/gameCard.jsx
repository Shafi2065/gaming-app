import Card from "react-bootstrap/Card";
import CardImg from "react-bootstrap/CardImg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../app/pages/profiles/[docId]/style.css";

export default function GameCard() {
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
            <Card.Img variant="top" src="/Fortnite.jpg" className="gameCard"/>
          </Card>
          </Col>
      </Row>
    </div>
  );
}
