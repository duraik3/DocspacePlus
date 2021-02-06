import React from "react";
import Axios from "axios";
import {Button, Col, Row, Modal, Form} from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import EventForm from "./EventForm";
import dateformat from "dateformat";

class Events extends React.Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();

        this.state = {
            linkModal : false,
            linkToEvent : "",
            linkSelectedEvent : null,
            events: [],
            selected: null
        };
        this.options = {
            defaultSortName: 'topic',  // default sort column name
            defaultSortOrder: 'asc'  // default sort order
        };

        this.load = this.load.bind(this);
        this.nameFormatter = this.nameFormatter.bind(this);
        this.actionFormatter = this.actionFormatter.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.linkFormatter = this.linkFormatter.bind(this);
        this.showLinkModal = this.showLinkModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleLinkChange = this.handleLinkChange.bind(this);
        this.saveLink = this.saveLink.bind(this);
    }

    componentDidMount() {
        Axios.get("/api/video/all")
            .then((response) => {
                this.setState({
                    events: response.data,
                });
            })
            .catch((error) => {
                console.log("Error Get events list");
            });
    }

    load() {
        Axios.get("/api/video/all")
            .then((response) => {
                this.setState({
                    events: response.data,
                });
            })
            .catch((error) => {
                console.log("Error Get events list");
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

    linkFormatter(cell, row) {
        if (row.status === "Upcoming") {
            return (
                <div>
                    <a onClick={() => {
                        this.showLinkModal(row)
                    }}><img src="/images/link_active.svg"/></a>

                </div>
            );
        } else {
            return (
                <div>
                    <a><img src="/images/link_inactive.svg"/></a>
                </div>
            );
        }
    }

    showLinkModal(event){
        this.setState({
            linkSelectedEvent : event.id,
            linkModal : true
        })
    }

    closeModal(){
        this.setState({
            linkModal : false,
            linkToEvent : ""
        })
    }

    handleLinkChange(e){
        this.setState({
            linkToEvent : e.target.value
        })
    }

    saveLink(){

        let payload = {
            id: this.state.linkSelectedEvent !== null ? this.state.linkSelectedEvent : null,
            url:this.state.linkToEvent
        };
        Axios({
            method: "put",
            url: "/api/video/link",
            data: payload,
        })
            .then((response) => {
                //handle success
                this.load();
                this.setState({
                    linkToEvent : "",
                    linkModal : false,
                    linkSelectedEvent :null,
                })

            })
            .catch((error) => {
                //handle error
                console.log(error);
            });
    }

    delete(event) {
        Axios.delete("/api/video/" + event.id)
            .then((response) => {
                this.load();
            })
            .catch((error) => {
                console.log("Error Get Speakers list");
            });
    }

    edit(event) {
        this.setState({
            selected: event
        });
        this.form.current.load(event);
    }

    nameFormatter(cell, row) {
        if (cell !== null) {
            return (
                cell.salutation + " " + cell.firstName + " " + cell.lastName
            );
        } else {
            return "";
        }

    }

    dateFormatter(cell, row) {
        if (cell !== null) {
            let date = new Date(cell);
            return dateformat(date, "mmm d | h TT");
        } else {
            return "";
        }
    }

    channelFormatter(cell, row) {
        if (row.channels !== null && row.channels.length > 0) {
            return row.channels[0].title + " / " + cell;
        } else {
            return cell;
        }
    }

    render() {


        return (
            <div className="admin-speakers-container">
                {this.state.linkModal &&
                <Modal centered="true"
                       show={this.state.linkModal}
                       onHide={this.closeModal}
                       backdrop="static"
                       keyboard={false}>
                    <Modal.Header closeButton>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Control
                            autoFocus
                            required
                            placeholder="Title of the event*"
                            value={this.state.linkToEvent}
                            onChange={this.handleLinkChange}
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={this.saveLink}>Save</Button>
                    </Modal.Footer>
                </Modal>}
                <Row>
                    <h4>Events</h4>
                    <Col className="d-flex justify-content-end">
                        <Button onClick={() => this.form.current.new()}>Add Event</Button>
                    </Col>
                </Row>
                <Row>
                    <EventForm ref={this.form} reload={this.load}/>
                </Row>
                <Row>
                    <BootstrapTable data={this.state.events} striped hover tableContainerClass='custom-table'
                                    options={this.options}>
                        <TableHeaderColumn dataField='eventDate'
                                           dataFormat={this.dateFormatter}>Date</TableHeaderColumn>
                        <TableHeaderColumn dataField='topic'>Topic</TableHeaderColumn>
                        <TableHeaderColumn dataField='type'>Type</TableHeaderColumn>
                        <TableHeaderColumn dataField='episode' dataFormat={this.channelFormatter}>Channel/ Episode
                            No.</TableHeaderColumn>
                        <TableHeaderColumn dataField='status'>Status</TableHeaderColumn>
                        <TableHeaderColumn dataField='speaker'
                                           dataFormat={this.nameFormatter}>Speaker</TableHeaderColumn>
                        <TableHeaderColumn dataFormat={this.linkFormatter}></TableHeaderColumn>
                        <TableHeaderColumn dataField='id' isKey={true}
                                           dataFormat={this.actionFormatter}>Actions</TableHeaderColumn>
                    </BootstrapTable>
                </Row>
            </div>
        );
    }
}

export default Events;
