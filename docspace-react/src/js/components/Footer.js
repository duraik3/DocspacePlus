import React from "react";
import { Row, Col } from "react-bootstrap";

class Footer extends React.Component {
  render() {
    return (
      <div
        className={
          this.props.fixed === "true"
            ? "footer container-fluid fixed-bottom"
            : "footer container-fluid "
        }
      >
        <Row>
          <Col xs={12} md={6}>
            <img src="/images/email.svg" className="footer-logo" alt="Email" />
            <img
              src="/images/facebook.svg"
              className="footer-logo"
              alt="Facebook"
            />
            <img
              src="/images/twitter.svg"
              className="footer-logo"
              alt="Twitter"
            />
          </Col>
          <Col xs={12} md={6}>
            <div className="copyright">
              <span className="first">
                About | <a href="/privacy"> Privacy</a> | Terms | Help Center | Feedback
              </span>
              <span>Copyright 2020 DOCSPACE, All rights reserved.</span>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Footer;
