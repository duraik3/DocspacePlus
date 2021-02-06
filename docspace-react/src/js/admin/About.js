import React from "react";
import Axios from "axios";
import {Button, Col, Row} from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import AboutForm from "./AboutForm";

class About extends React.Component {
    constructor(props) {
        super(props);
        this.aboutForm = React.createRef();

        this.state = {
            users: [],
            selectedOption: null
        };
        this.options = {
            defaultSortName: 'value',  // default sort column name
            defaultSortOrder: 'asc'  // default sort order
        };

        this.load = this.load.bind(this);
        this.actionFormatter = this.actionFormatter.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        Axios.get("/api/about/all")
            .then((response) => {
                this.setState({
                    options: response.data,
                });
            })
            .catch((error) => {
                console.log("Error Get options list");
            });
    }

    load() {
        Axios.get("/api/about/all")
            .then((response) => {
                this.setState({
                    options: response.data,
                });
            })
            .catch((error) => {
                console.log("Error Get options list");
            });
    }

    actionFormatter(cell, row) {
        return (
            <div>
                <a onClick={() => {
                    this.edit(row)
                }}><img src="/images/edit_Active.svg"/></a>
                <a onClick={() => {
                    this.delete(row)
                }}><img src="/images/bin_Active.svg"/></a>
            </div>
        );
    }

    delete(option) {
        Axios.delete("/api/about/" + option.id)
            .then((response) => {
                this.load();
            })
            .catch((error) => {
                console.log("Error Get Options list");
            });
    }

    edit(option) {
        this.setState({
            selectedOption: option
        });
        this.aboutForm.current.load(option);
    }

    render() {
        return (
            <div className="admin-speakers-container">
                <Row>
                    <h4>Where did you hear about us?</h4>
                    <Col className="d-flex justify-content-end">
                        <Button onClick={() => this.aboutForm.current.new()}>Add New Option</Button>
                    </Col>
                </Row>
                <Row>
                    <AboutForm ref={this.aboutForm} reload={this.load}/>
                </Row>
                <Row>
                    <BootstrapTable data={this.state.options} striped hover tableContainerClass='custom-table'
                                    options={this.options}>
                        <TableHeaderColumn dataField='value' dataSort={true}>Option</TableHeaderColumn>
                        <TableHeaderColumn dataField='id' isKey={true}
                                           dataFormat={this.actionFormatter}>Actions</TableHeaderColumn>
                    </BootstrapTable>
                </Row>
            </div>
        );
    }
}

export default About;
