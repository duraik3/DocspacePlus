import React from "react";
import {Button, Col, Row} from "react-bootstrap";
import SpeakerForm from "./SpeakerForm";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import Axios from "axios";

class Speakers extends React.Component {
    constructor(props) {
        super(props);
        this.speakersForm = React.createRef();

        this.state = {
            speakers: [],
            selectedSpeaker: null
        };
        this.options = {
            defaultSortName: 'email',  // default sort column name
            defaultSortOrder: 'asc'  // default sort order
        };

        this.loadSpeakers = this.loadSpeakers.bind(this);
        this.nameFormatter = this.nameFormatter.bind(this);
        this.actionFormatter = this.actionFormatter.bind(this);
        this.editSpeaker = this.editSpeaker.bind(this);
        this.deleteSpeaker = this.deleteSpeaker.bind(this);
        this.newSpeaker = this.newSpeaker.bind(this);
    }

    componentDidMount() {
        Axios.get("/api/speaker/all")
            .then((response) => {
                this.setState({
                    speakers: response.data,
                });
            })
            .catch((error) => {
                console.log("Error Get Speakers list");
            });
    }

    loadSpeakers() {
        Axios.get("/api/speaker/all")
            .then((response) => {
                this.setState({
                    speakers: response.data,
                });
            })
            .catch((error) => {
                console.log("Error Get Speakers list");
            });
    }

    nameFormatter(cell, row) {
        return (
            row.salutation + " " + row.firstName + " " + row.lastName
        );
    }

    actionFormatter(cell, row) {
        return (
            <div>
                <a onClick={() => {
                    this.editSpeaker(row)
                }}><img src="/images/edit_Active.svg"/></a>
                <a onClick={() => {
                    this.deleteSpeaker(row)
                }}><img src="/images/bin_Active.svg"/></a>
            </div>
        );
    }

    deleteSpeaker(speaker) {
        Axios.delete("/api/speaker/" + speaker.id)
            .then((response) => {
                this.loadSpeakers();
            })
            .catch((error) => {
                console.log("Error Get Speakers list");
            });
    }

    editSpeaker(speaker) {
        this.setState({
            selectedSpeaker: speaker
        });
        this.speakersForm.current.load(speaker);
    }

    newSpeaker(){
        this.speakersForm.current.new();
    }

    render() {
        return (
            <div className="admin-speakers-container">
                <Row>
                    <h4>Speakers</h4>
                    <Col className="d-flex justify-content-end">
                        <Button onClick={this.newSpeaker}>Add New Speaker</Button>
                    </Col>
                </Row>
                <Row>
                    <SpeakerForm ref={this.speakersForm} reload={this.loadSpeakers} />
                </Row>
                <Row>
                    <BootstrapTable data={this.state.speakers} striped hover tableContainerClass='custom-table'
                                    options={this.options}>
                        <TableHeaderColumn dataField='id' dataFormat={this.nameFormatter}
                                           dataSort={true}>Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='speciality' dataSort={true}>Speciality</TableHeaderColumn>
                        <TableHeaderColumn dataField='email' isKey={true} dataSort={true}>Email</TableHeaderColumn>
                        <TableHeaderColumn dataField='city' dataSort={true}>City</TableHeaderColumn>
                        <TableHeaderColumn dataField='id' dataFormat={this.actionFormatter}>Actions</TableHeaderColumn>
                    </BootstrapTable>
                </Row>
            </div>
        );
    }
}

export default Speakers;
