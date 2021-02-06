import React from "react";
import { connect } from "react-redux";
import { Modal, Button, Row } from "react-bootstrap";
import "../../css/confirm-register.css";
import { closeConfirmRegister } from "../../actions/userActions";

class ConfirmRegister extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.dispatch(closeConfirmRegister());
  }

  render() {
    return (
      <Modal
        contentClassName="confirm-modal"
        centered="true"
        size="lg"
        show={this.props.showConfirmRegister}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header
          closeButton={!this.props.forceLogin}
          bsPrefix="confirm-modal-header"
        ></Modal.Header>
        <Modal.Body bsPrefix="confirm-modal-body">
          <Row className="justify-content-center">
            <img src="images/thanks.svg" className="thanks-icon" alt="Thanks" />
          </Row>
          <br />
          <Row className="justify-content-center">
            <h3>Thank you for registering on DocspacePlus. </h3>
          </Row>
          <Row className="justify-content-center">
            <h4>
              Please validate your account by clicking on the link sent to your
              registered email id
            </h4>
          </Row>
          <br />
          <Row className="justify-content-center">
            <Button onClick={this.handleClose}>GO BACK TO HOME PAGE</Button>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    showConfirmRegister: state.userReducer.showConfirmRegister,
    showRegister: state.userReducer.showRegister,
    showLogin: state.userReducer.showLogin,
    user: state.userReducer.user,
    loading: state.userReducer.loading,
    loggedOut: state.userReducer.loggedOut,
    error: state.userReducer.error,
  };
}

export default connect(mapStateToProps)(ConfirmRegister);
