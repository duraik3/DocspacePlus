import React from "react";
import { connect } from "react-redux";
import {
  Modal,
  Button,
  Form,
  Alert,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import Axios from "axios";
import "../css/register.css";
import {
  closeRegister,
  openConfirmRegister,
  openLogin,
} from "../actions/userActions";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import TermsModal from "./components/TermsModal";

class RegisterModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.modal = React.createRef();
    this.state = {
      countries: [],
      states: [],
      cities: [],
      register: false,
      error: false,
      errorMessage: "",
      salutation: "Dr.",
      firstName: "",
      lastName: "",
      email: "",
      speciality: "",
      mobileNumber: "",
      country: "India",
      state: "",
      city: "",
      aboutUs: "",
      password: "",
      professional: false,
      agreeTerms: false,
    };
    this.showLogin = this.showLogin.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleMobileNumberChange = this.handleMobileNumberChange.bind(this);
    this.handleSalutationChange = this.handleSalutationChange.bind(this);
    this.handleSpecialityChange = this.handleSpecialityChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleProfChange = this.handleProfChange.bind(this);
    this.handleAgreeTermsChange = this.handleAgreeTermsChange.bind(this);
    this.handleAboutUs = this.handleAboutUs.bind(this);
  }

  componentDidMount() {
    Axios.get("/api/geo/countries")
      .then((response) => {
        this.setState({
          countries: response.data,
        });
        let _countries = response.data;
        if (
          _countries.filter((c) => c.name === "India") &&
          _countries.filter((c) => c.name === "India").length > 0
        ) {
          let stateObject = _countries.filter((c) => c.name === "India")[0];
          Axios.get("/api/geo/state/" + stateObject.id)
            .then((response) => {
              this.setState({
                states: response.data,
              });
            })
            .catch((error) => {
              console.log("Error Get countries");
            });
        }
      })
      .catch((error) => {
        console.log("Error Get countries");
      });
  }

  showLogin() {
    this.props.dispatch(closeRegister());
    this.props.dispatch(openLogin());
  }
  handleClose() {
    this.props.dispatch(closeRegister());
  }
  handleSalutationChange(e) {
    this.setState({
      salutation: e.target.value,
    });
  }
  handleFirstNameChange(e) {
    this.setState({
      firstName: e.target.value,
    });
  }
  handleLastNameChange(e) {
    this.setState({
      lastName: e.target.value,
    });
  }
  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }
  handleSpecialityChange(e) {
    this.setState({
      speciality: e.target.value,
    });
  }
  handleMobileNumberChange(value, country) {
    this.setState({
      mobileNumber: value,
      country: country.name,
      city: "",
      state: "",
      cities: [],
    });

    if (
      this.state.countries.filter((c) => c.name === country.name) &&
      this.state.countries.filter((c) => c.name === country.name).length > 0
    ) {
      let stateObject = this.state.countries.filter(
        (c) => c.name === country.name
      )[0];
      Axios.get("/api/geo/state/" + stateObject.id)
        .then((response) => {
          this.setState({
            states: response.data,
          });
        })
        .catch((error) => {
          console.log("Error Get countries");
        });
    }
  }
  handleStateChange(e) {
    this.setState({
      state: e.target.value,
    });

    if (
      this.state.states.filter((c) => c.name === e.target.value) &&
      this.state.states.filter((c) => c.name === e.target.value).length > 0
    ) {
      let cityObject = this.state.states.filter(
        (c) => c.name === e.target.value
      )[0];
      Axios.get("/api/geo/city/" + cityObject.id)
        .then((response) => {
          this.setState({
            cities: response.data,
          });
        })
        .catch((error) => {
          console.log("Error Get countries");
        });
    }
  }
  handleCityChange(e) {
    this.setState({
      city: e.target.value,
    });
  }
  handleAboutUs(e) {
    this.setState({
      aboutUs: e.target.value,
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

  handleAgreeTermsChange(e) {
    this.setState({
      agreeTerms: e.target.checked,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.mobileNumber === "") {
      this.setState({
        error: true,
        errorMessage: "Mobile Number is required ! ",
      });
      return;
    }
    let data = {
      salutation: this.state.salutation,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      speciality: this.state.speciality,
      mobileNumber: this.state.mobileNumber,
      country: this.state.country,
      state: this.state.state,
      city: this.state.city,
      aboutUs: this.state.aboutUs,
    };
    Axios({
      method: "post",
      url: "/api/user/register",
      data: data,
    })
      .then((response) => {
        //handle success
        this.setState({
          register: true,
        });
        this.props.dispatch(closeRegister());
        this.props.dispatch(openConfirmRegister());
        setTimeout(function(){ window.location.reload(false); }, 3000);
      })
      .catch((error) => {
        //handle error
        console.log(error);
        this.setState({
          error: true,
          errorMessage:
            error.response && error.response.data
              ? error.response.data
              : error.message,
        });
      });
  }
  displayError() {
    if (this.state.error) {
      return <Alert variant="danger">{this.state.errorMessage}</Alert>;
    }
    return null;
  }

  validateForm() {
    return this.state.agreeTerms === true && this.state.professional === true;
  }
  render() {
    return (
      <div>
        <Modal
          contentClassName="register-modal"
          centered="true"
          show={this.props.showRegister}
          size="lg"
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header
            closeButton={!this.props.forceLogin}
            bsPrefix="register-modal-header"
          >
            <Modal.Title className="w-100">
              <img src="images/Register.svg" className="register-icon" alt="" />
              <h3>Register</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body bsPrefix="register-modal-body">
            <Form id="register-form">
              <Row>
                <Col>
                  <Form.Group size="lg" controlId="firstName" name="firstName">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <Form.Control
                          as="select"
                          required
                          value={this.state.salutation}
                          onChange={this.handleSalutationChange}
                        >
                          <option value="Dr.">Dr.</option>
                          <option value="Prof.">Prof.</option>
                          <option value="Mr.">Mr.</option>
                          <option value="Mrs.">Mrs.</option>
                          <option value="Miss.">Miss.</option>
                        </Form.Control>
                      </InputGroup.Prepend>
                      <Form.Control
                        autoFocus
                        required
                        placeholder="First Name*"
                        value={this.state.firstName}
                        onChange={this.handleFirstNameChange}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group size="lg" controlId="lastName" name="lastName">
                    <Form.Control
                      autoFocus
                      required
                      placeholder="Last Name*"
                      value={this.state.lastName}
                      onChange={this.handleLastNameChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group size="lg" controlId="email" name="email">
                    <Form.Control
                      required
                      type="email"
                      placeholder="Email*"
                      autoFocus
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group size="lg" controlId="password" name="password">
                    <Form.Control
                      autoFocus
                      required
                      type="password"
                      placeholder="Password*"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group size="lg" name="mobileNumber">
                    <PhoneInput
                      inputProps={{
                        name: "phone",
                        required: true,
                        autoFocus: true,
                      }}
                      required="true"
                      type="tel"
                      country={"in"}
                      placeholder="Mobile Number*"
                      value={this.state.mobileNumber}
                      onChange={this.handleMobileNumberChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group size="lg" name="speciality">
                    <Form.Control
                      as="select"
                      autoFocus
                      required
                      placeholder="Select Speciality"
                      value={this.state.speciality}
                      onChange={this.handleSpecialityChange}
                    >
                      <option value="" selected disabled hidden>
                        Select Speciality*
                      </option>
                      <option>Physician - IVF specialist</option>
                      <option>Physician - Obs/Gyn</option>
                      <option>Physician - Endocrinologist</option>
                      <option>Physician - Other</option>
                      <option>Assistant to Physician</option>
                      <option>Student</option>
                      <option>Registered Nurse</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group size="lg" controlId="state" name="state">
                    <Form.Control
                      as="select"
                      autoFocus
                      value={this.state.state}
                      onChange={this.handleStateChange}
                    >
                      <option value="" selected disabled hidden>
                        Select State*
                      </option>
                      {this.state.states.map((state) => {
                        return (
                          <option key={"option_state_" + state.name}>
                            {state.name}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group size="lg" controlId="city" name="city">
                    <Form.Control
                      as="select"
                      autoFocus
                      required
                      placeholder="City"
                      value={this.state.city}
                      onChange={this.handleCityChange}
                    >
                      <option value="" selected disabled hidden>
                        Select City*
                      </option>
                      {this.state.cities.map((city) => {
                        return <option key={city.name}>{city.name}</option>;
                      })}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group size="lg" controlId="wheredidyou" name="aboutUs">
                    <Form.Control
                      as="select"
                      required
                      value={this.state.aboutUs}
                      onChange={this.handleAboutUs}
                    >
                      <option value="" selected disabled hidden>
                        Where did you hear about us?*
                      </option>
                      <option>Docspace email</option>
                      <option>Docspace sms</option>
                      <option>WhatsApp invite</option>
                      <option>Facebook</option>
                      <option>Linkedin</option>
                      <option>Twitter</option>
                      <option>Others</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Check
                type="checkbox"
                checked={this.state.professional}
                onChange={this.handleProfChange}
                label="I certify that I am a student or healthcare professional"
              />
              <br />
              <Form.Check>
                <Form.Check.Input
                  type="checkbox"
                  checked={this.state.agreeTerms}
                  onChange={this.handleAgreeTermsChange}
                />
                <Form.Check.Label>
                  I agree to the{" "}
                  <a onClick={() => this.modal.current.showTerms()}>
                    terms & conditions
                  </a>
                </Form.Check.Label>
              </Form.Check>
              <br />
              {this.displayError()}
              <Col className="d-flex justify-content-center">
                <Button
                  block
                  size="lg"
                  type="submit"
                  onClick={this.handleSubmit}
                  disabled={!this.validateForm()}
                >
                  Register
                </Button>
              </Col>
              <Col className="d-flex justify-content-center">
                <span>
                  If you are an existing user,
                  <Button onClick={this.showLogin} variant="link">
                    login here
                  </Button>
                </span>
              </Col>
            </Form>
          </Modal.Body>
        </Modal>
        <TermsModal ref={this.modal} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    showRegister: state.userReducer.showRegister,
    showLogin: state.userReducer.showLogin,
    user: state.userReducer.user,
    loading: state.userReducer.loading,
    loggedOut: state.userReducer.loggedOut,
    error: state.userReducer.error,
  };
}

export default connect(mapStateToProps)(RegisterModal);
