import React from "react";
import {Button, Col, Form, Row, Alert} from "react-bootstrap";
import Axios from "axios";

class RolesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            errorMessage: "",
            id: null,
            email:"",
            role:""
        };

        this.load = this.load.bind(this);
        this.new = this.new.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
    }

    componentDidMount() {
    }

    load(user) {
        this.setState({
            id: user.id,
            email:user.email,
            role:user.role
        });
    }

    new() {
        this.setState({
            id: null,
            email:"",
            role:""
        });
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value,
        });
    }
    handleRoleChange(e){
        this.setState({
            role: e.target.value,
        });
    }
    handleSubmit(event) {
        event.preventDefault();

        let payload = {
            id: this.state.id !== null ? this.state.id : null,
            email:this.state.email,
            role:this.state.role
        };

        Axios({
            method: "put",
            url: "/api/user/update/role",
            data: payload,
        })
        .then((response) => {
            //handle success
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

    displayError() {
        if (this.state.error) {
            return <Alert variant="danger">{this.state.errorMessage}</Alert>;
        }
        return null;
    }


    render() {
        return (
            <Form id="new-speaker-form" className="speaker-form">
                <Row>
                    <Col>
                        <span className="form-title">New Role</span>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group size="lg" controlId="name" name="name">
                            <Form.Control
                                autoFocus
                                required
                                placeholder="Email*"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group size="lg" name="role">
                            <Form.Control
                                as="select"
                                autoFocus
                                required
                                placeholder="Select Role*"
                                value={this.state.role}
                                onChange={this.handleRoleChange}
                            >
                                <option value="" selected disabled hidden>
                                    Select Role*
                                </option>
                                <option value="ADMIN">Admin</option>
                                <option value="DATA">Data</option>
                                <option value="CONTENT_MANAGEMENT">Content Management</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-end">
                        <Button type="submit" onClick={this.handleSubmit}>Save</Button>
                        <Button style={{"margin-left": "10px"}} onClick={this.new}>Cancel</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.displayError()}
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default RolesForm;
