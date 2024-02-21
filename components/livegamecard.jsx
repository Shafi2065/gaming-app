import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default function LiveGameCards() {
  return (
    <div>
      <Card id="LiveGameCards">
        <Row>
          <Col md={3}>
            <Card.Img src="Create a team.jpg" style={{ marginTop: "6px" }} />
          </Col>
          <Col>
            <Card.Body>
              <Card.Title>Call of Duty: Modern Warfare 3</Card.Title>
              <button id="LiveTag">Live Now</button>
              <Card.Text style={{ opacity: "0.6" }}>
                Quick zombies game
              </Card.Text>
              <Row>
                <Col>
                  <img
                    src="default-profile.png"
                    style={{
                      width: "50px",
                      borderRadius: "50%",
                      display: "inline-block",
                      marginRight: "5px",
                    }}
                  />
                  <Card.Text style={{ display: "inline-block" }}>
                    TheGamingGuru
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      <>
        <Card id="LiveGameCards" border="primary">
          <Row>
            <Col md={3}>
              <Card.Img src="Create a team.jpg" style={{ marginTop: "6px" }} />
            </Col>
            <Col>
              <Card.Body>
                <Card.Title>Starcraft 2</Card.Title>
                <button id="LiveTag">Live Now</button>
                <Card.Text style={{ opacity: "0.6" }}>
                  Arcade games
                </Card.Text>
                <Row>
                  <Col>
                    <img
                      src="default-profile.png"
                      style={{
                        width: "50px",
                        borderRadius: "50%",
                        display: "inline-block",
                        marginRight: "5px",
                      }}
                    />
                    <Card.Text style={{ display: "inline-block" }}>
                      HotDog_2013
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </>
    </div>
  );
}
