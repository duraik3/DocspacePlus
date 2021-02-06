import React from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Alert, Col } from "react-bootstrap";
import { closeForgotPassword, openLogin } from "../actions/userActions";
import Axios from "axios";
import "../css/forgot-password.css";

class ForgotPasswordModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: "",
      error: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.showLogin = this.showLogin.bind(this);
  }

  showLogin() {
    this.props.dispatch(closeForgotPassword());
    this.props.dispatch(openLogin());
  }

  handleClose() {
    this.props.dispatch(closeForgotPassword());
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let data = {
      email: this.state.email,
    };
    Axios({
      method: "post",
      url: "/api/user/forgotpassword",
      data: data,
    })
      .then((response) => {
        this.props.dispatch(closeForgotPassword());
        window.location.reload(false);
      })
      .catch((response) => {
        console.log(response);
        this.setState({
          error: true,
        });
      });
  }

  displayError() {
    if (this.state.error) {
      return <Alert variant="danger">Invalid Email !</Alert>;
    }
    return null;
  }

  validateForm() {
    return this.state.email.length > 0;
  }

  render() {
    return (
      <Modal
        contentClassName="forgot-password-modal"
        centered="true"
        show={this.props.showForgotPassword}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header
          closeButton={!this.props.forceLogin}
          bsPrefix="forgot-password-modal-header"
        >
          <Modal.Title className="w-100">
            <h3>Password recovery</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body bsPrefix="forgot-password-modal-body">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group size="lg" controlId="email" name="email">
              <Form.Control
                autoFocus
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
            </Form.Group>
            <br />
            {this.displayError()}
            <Button
              block
              size="lg"
              type="submit"
              disabled={!this.validateForm()}
            >
              Send email
            </Button>
            <Col className="d-flex justify-content-center">
              <span>
                <Button onClick={this.showLogin} variant="link">
                  Return to login
                </Button>
              </span>
            </Col>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    showForgotPassword: state.userReducer.showForgotPassword,
    showLogin: state.userReducer.showLogin,
    error: state.userReducer.error,
  };
}

export default connect(mapStateToProps)(ForgotPasswordModal);
