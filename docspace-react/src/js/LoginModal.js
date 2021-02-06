import React from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Alert, Col } from "react-bootstrap";
import {
  closeLogin,
  openRegister,
  openForgotPassword,
} from "../actions/userActions";
import Axios from "axios";
import "../css/login.css";

class LoginModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: "",
      password: "",
      rememberMe: false,
      loggedIn: false,
      error: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleProfChange = this.handleProfChange.bind(this);
    this.handleRememberMeChange = this.handleRememberMeChange.bind(this);
    this.showRegister = this.showRegister.bind(this);
    this.showForgotPassword = this.showForgotPassword.bind(this);
  }

  showForgotPassword() {
    this.props.dispatch(openForgotPassword());
  }

  showRegister() {
    this.props.dispatch(openRegister());
  }

  handleClose() {
    this.props.dispatch(closeLogin());
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleProfChange(e) {
    this.setState({
      professional: e.target.checked,
    });
  }

  handleRememberMeChange(e) {
    this.setState({
      rememberMe: e.target.checked,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    data.append("email", this.state.email);
    data.append("password", this.state.password);
    Axios({
      method: "post",
      url: "/api/user/login",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        this.setState({
          loggedIn: true,
        });
        this.props.dispatch(closeLogin());
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
      return <Alert variant="danger">Invalid Email and/or Password !</Alert>;
    }
    return null;
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  render() {
    return (
      <Modal
        contentClassName="login-modal"
        centered="true"
        show={this.props.showLogin}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header
          closeButton={!this.props.forceLogin}
          bsPrefix="login-modal-header"
        >
          <Modal.Title className="w-100">
            <img
              src="/images/Register.svg"
              className="login-icon"
              alt="login"
            />
            <h3>Login</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body bsPrefix="login-modal-body">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group size="lg" controlId="email" name="email">
              <Form.Control
                autoFocus
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password" name="password">
              <Form.Control
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
              <Form.Text className="d-flex justify-content-end">
                <Button variant="link" onClick={this.showForgotPassword}>
                  Forgot password ?{" "}
                </Button>
              </Form.Text>
            </Form.Group>

            <Form.Check
              className="remember-check"
              type="checkbox"
              checked={this.state.rememberMe}
              onChange={this.handleRememberMeChange}
              label="Keep me signed in"
            />

            <br />
            {this.displayError()}
            <Button
              block
              size="lg"
              type="submit"
              disabled={!this.validateForm()}
            >
              LOGIN
            </Button>
            <Col className="d-flex justify-content-center">
              <span>
                If you are a new user,
                <Button onClick={this.showRegister} variant="link">
                  register here
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
    showRegister: state.userReducer.showRegister,
    showForgotPassword: state.userReducer.showForgotPassword,
    showLogin: state.userReducer.showLogin,
    user: state.userReducer.user,
    loading: state.userReducer.loading,
    loggedOut: state.userReducer.loggedOut,
    error: state.userReducer.error,
  };
}

export default connect(mapStateToProps)(LoginModal);
