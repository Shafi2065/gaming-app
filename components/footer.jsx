import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Footer() {
  return (
    <div>
      <Container id="footer" fluid>
        <Row id="footerTitle">
          <Col>
            <h3>Gaming Platform To Connect Users Together</h3>
            <div className="custom-divider"></div>
          </Col>
        </Row>
        <Row id="footerItems">
            <Col></Col>
            <Col></Col>
          <Col>
            <p>About us</p>
            <p>Privacy Policy</p>
            <p>Terms and Conditions</p>
            <p>Bans</p>
          </Col>
          <Col>
            <p>Instagram</p>
            <p>Facebook</p>
            <p>Youtube</p>
            <p>Twitter</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
