import React from "react";
import {Button, Col, Form, Row, InputGroup, Alert} from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import Axios from "axios";
import S3FileUpload from 'react-s3';


class SpeakerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show : false,
            countries: [],
            states: [],
            cities: [],
            docspaceUser: false,
            error: false,
            errorMessage: "",
            id: null,
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
            credential: "",
            biography: "",
            imageFile: null
        };

        this.load = this.load.bind(this);
        this.new = this.new.bind(this);
        this.cancel = this.cancel.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleMobileNumberChange = this.handleMobileNumberChange.bind(this);
        this.handleSalutationChange = this.handleSalutationChange.bind(this);
        this.handleSpecialityChange = this.handleSpecialityChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleAboutUs = this.handleAboutUs.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCredentialChange = this.handleCredentialChange.bind(this);
        this.handleBiographyChange = this.handleBiographyChange.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.handleDocspaceUserChange = this.handleDocspaceUserChange.bind(this);
        this.setStatesCities = this.setStatesCities.bind(this);
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

    load(speaker) {
        this.setState({
            show:true,
            id: speaker.id,
            salutation: speaker.salutation,
            firstName: speaker.firstName,
            lastName: speaker.lastName,
            email: speaker.email,
            speciality: speaker.speciality,
            mobileNumber: speaker.mobileNumber,
            country: speaker.country,
            state: speaker.state,
            city: speaker.city,
            aboutUs: speaker.aboutUs,
            credential: speaker.credential,
            biography: speaker.biography,
            imageFile: null
        });

        this.setStatesCities(speaker.country, speaker.state);
    }

    new() {
        this.setState({
            show:true,
            id: null,
            salutation: "Dr.",
            firstName: "",
            lastName: "",
            email: "",
            speciality: "",
            mobileNumber: "",
            country: "",
            state: "",
            city: "",
            aboutUs: "",
            credential: "",
            biography: "",
            imageFile: null
        });
    }

    cancel(){
        this.setState({
            show : false
        });
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
        if(this.state.docspaceUser === true){
            Axios.get("/api/user/" + e.target.value)
                .then((response) => {
                    if(response && response.data){
                        console.log(response.data);

                        this.setState({
                            salutation: response.data.salutation,
                            firstName: response.data.firstName,
                            lastName: response.data.lastName,
                            email: response.data.email,
                            speciality: response.data.speciality,
                            mobileNumber: response.data.mobileNumber,
                            country: response.data.country,
                            state: response.data.state,
                            city: response.data.city,
                            aboutUs: response.data.aboutUs,
                        });

                        this.setStatesCities(response.data.country, response.data.state);
                    }

                })
                .catch((error) => {
                    console.log("Error Get user");
                });
        }
    }

    handleSpecialityChange(e) {
        this.setState({
            speciality: e.target.value,
        });
    }

    handleCredentialChange(e) {
        this.setState({
            credential: e.target.value,
        });
    }

    handleBiographyChange(e) {
        this.setState({
            biography: e.target.value,
        });
    }

    handleImage(e) {
        this.setState({
            imageFile: e.target.files[0]
        });
    }

    handleMobileNumberChange(value, country) {
        this.setState({
            mobileNumber: value,
            country: country.name,
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

    handleDocspaceUserChange(e) {
        this.setState({
            docspaceUser: e.target.checked,
        });

        if(this.state.email !== "" && e.target.checked){
            Axios.get("/api/user/" + this.state.email)
                .then((response) => {
                    if(response && response.data){
                        console.log(response.data);
                        this.setState({
                            salutation: response.data.salutation,
                            firstName: response.data.firstName,
                            lastName: response.data.lastName,
                            email: response.data.email,
                            speciality: response.data.speciality,
                            mobileNumber: response.data.mobileNumber,
                            country: response.data.country,
                            state: response.data.state,
                            city: response.data.city,
                            aboutUs: response.data.aboutUs,
                        });

                        this.setStatesCities(response.data.country, response.data.state);
                    }

                })
                .catch((error) => {
                    console.log("Error Get user");
                });
        }
    }

    setStatesCities(country, state){
        if(country !==""){
            let stateObject = this.state.countries.filter(
                (c) => c.name === country
            )[0];
            if(stateObject) {
                Axios.get("/api/geo/state/" + stateObject.id)
                    .then((response) => {
                        this.setState({
                            states: response.data,
                        });
                    })
                    .catch((error) => {
                        console.log("Error Get states");
                    });
            }
        }

        if(state !==""){
            let cityObject = this.state.states.filter(
                (c) => c.name === state
            )[0];
            if(cityObject) {
                Axios.get("/api/geo/city/" + cityObject.id)
                    .then((response) => {
                        this.setState({
                            cities: response.data,
                        });
                    })
                    .catch((error) => {
                        console.log("Error Get cities");
                    });
            }
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const config = {
            bucketName: 'docspace-speaker',
            region: 'us-east-2',
            accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY
        };

        if (this.state.imageFile !== null) {
            S3FileUpload.uploadFile(this.state.imageFile, config)
                .then((data) => {
                    console.log(data.location);
                    let imageUrl = data.location;

                    let payload = {
                        id: this.state.id !== null ? this.state.id : null,
                        docspaceUser: this.state.docspaceUser,
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
                        credential: this.state.credential,
                        biography: this.state.biography,
                        image: imageUrl
                    };
                    Axios({
                        method: "post",
                        url: "/api/speaker",
                        data: payload,
                    })
                        .then((response) => {
                            //handle success
                            console.log(response);
                            this.setState({
                                show:false
                            });
                            this.props.reload();
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
                })
                .catch((err) => {
                    console.log(err)
                });
        } else {

            let payload = {
                id: this.state.id !== null ? this.state.id : null,
                docspaceUser: this.state.docspaceUser,
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
                credential: this.state.credential,
                biography: this.state.biography
            };
            Axios({
                method: "post",
                url: "/api/speaker",
                data: payload,
            })
                .then((response) => {
                    //handle success
                    console.log(response);
                    this.setState({
                        show:false
                    });
                    this.props.reload();
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
    }

    displayError() {
        if (this.state.error) {
            return (<div><br/><Alert variant="danger">{this.state.errorMessage}</Alert></div>);
        }
        return null;
    }


    render() {
        if(this.state.show) {
            return (
                <Form id="new-speaker-form" className="speaker-form">
                    <Row>
                        <Col>
                            <span className="form-title">New Speaker</span>
                        </Col>
                        <Col>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Existing Docspace User"
                                            checked={this.state.docspaceUser}
                                            onChange={this.handleDocspaceUserChange}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group size="lg" controlId="email" name="email">
                                <Form.Control
                                    autoFocus
                                    required
                                    placeholder="Email*"
                                    value={this.state.email}
                                    onChange={this.handleEmailChange}
                                />
                            </Form.Group>
                        </Col>
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
                                        return <option key={state.name}>{state.name}</option>;
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
                        <Col>
                            <Form.Group size="lg" controlId="degrees" name="degrees">
                                <Form.Control
                                    autoFocus
                                    required
                                    placeholder="Degrees"
                                    value={this.state.credential}
                                    onChange={this.handleCredentialChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="biography">
                                <Form.Control as="textarea"
                                              placeholder="Add bio"
                                              value={this.state.biography}
                                              onChange={this.handleBiographyChange} rows={3}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.File
                                id="custom-file"
                                label="Upload Image"
                                custom
                                onChange={this.handleImage}
                            />
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Button type="submit" onClick={this.handleSubmit}>Save</Button>
                            <Button style={{"margin-left": "10px"}} onClick={this.cancel}>Cancel</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {this.displayError()}
                        </Col>
                    </Row>
                </Form>
            );
        }else{
            return null;
        }
    }
}

export default SpeakerForm;
