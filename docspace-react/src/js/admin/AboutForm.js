import React from "react";
import {Button, Col, Form, Row, Alert} from "react-bootstrap";
import Axios from "axios";

class AboutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            errorMessage: "",
            id: null,
            value:""
        };

        this.load = this.load.bind(this);
        this.new = this.new.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValueChange= this.handleValueChange.bind(this);
    }

    componentDidMount() {
    }

    load(about) {
        this.setState({
            id: about.id,
            value:about.value
        });
    }

    new() {
        this.setState({
            id: null,
            value:""
        });
    }

    handleValueChange(e) {
        this.setState({
            value: e.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let payload = {
            id: this.state.id !== null ? this.state.id : null,
            value:this.state.value
        };

        Axios({
            method: "post",
            url: "/api/about/",
            data: payload,
        })
        .then((response) => {
            this.props.reload();
        })
        .catch((error) => {
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
                        <span className="form-title">New Option</span>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group size="lg" controlId="value" name="value">
                            <Form.Control
                                autoFocus
                                required
                                placeholder="Value*"
                                value={this.state.value}
                                onChange={this.handleValueChange}
                            />
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

export default AboutForm;
