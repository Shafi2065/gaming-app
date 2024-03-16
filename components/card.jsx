import Card from "react-bootstrap/Card";
import CardImg from "react-bootstrap/CardImg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../app/pages/home/home.css";

export default function ComponentCard() {
  return (
    <div>
      <Row>
          <Card id="TeamCard">
            <Card.Img variant="top" src="Create a team.jpg" id="card-image" />
            <Card.Body>
              <Card.Title>Create a New Team</Card.Title>
              <Card.Text>
                Build your community!
                <Row>
                  <Col>
                    <span className="emoji">&#128270;</span>
                    <span className="emoji">&#128197;</span>
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card id="TeamCard">
            <Card.Img variant="top" src="Join a team.jpg" id="card-image" />
            <Card.Body>
              <Card.Title>Join a Team</Card.Title>
              <Card.Text>
                Discover Existing Teams!
                <Row>
                  <Col>
                    <span className="emoji">&#128270;</span>
                    <span className="emoji">&#128197;</span>
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
      </Row>
    </div>
  );
}
