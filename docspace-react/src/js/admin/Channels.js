import React from "react";
import Axios from "axios";
import {Button, Col, Row} from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import ChannelForm from "./ChannelForm";

class Channels extends React.Component {
    constructor(props) {
        super(props);
        this.channelForm = React.createRef();

        this.state = {
            channels: [],
            selectedChannel: null
        };
        this.options = {
            defaultSortName: 'title',  // default sort column name
            defaultSortOrder: 'asc'  // default sort order
        };

        this.loadChannels = this.loadChannels.bind(this);
        this.nameFormatter = this.nameFormatter.bind(this);
        this.actionFormatter = this.actionFormatter.bind(this);
        this.editChannel = this.editChannel.bind(this);
        this.deleteChannel = this.deleteChannel.bind(this);
    }

    componentDidMount() {
        Axios.get("/api/channel/all")
            .then((response) => {
                this.setState({
                    channels: response.data,
                });
            })
            .catch((error) => {
                console.log("Error Get Channels list");
            });
    }

    loadChannels() {
        Axios.get("/api/channel/all")
            .then((response) => {
                this.setState({
                    channels: response.data,
                });
            })
            .catch((error) => {
                console.log("Error Get Channels list");
            });
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

    actionFormatter(cell, row) {
        return (
            <div>
                <a onClick={() => {
                    this.editChannel(row)
                }}><img src="/images/edit_Active.svg"/></a>
                <a onClick={() => {
                    this.deleteChannel(row)
                }}><img src="/images/bin_Active.svg"/></a>
            </div>
        );
    }

    deleteChannel(channel) {
        Axios.delete("/api/channel/" + channel.id)
            .then((response) => {
                this.loadChannels();
            })
            .catch((error) => {
                console.log("Error Get Speakers list");
            });
    }

    editChannel(channel) {
        this.setState({
            selectedChannel: channel
        });
        this.channelForm.current.load(channel);
    }

    render() {
        return (
            <div className="admin-speakers-container">
                <Row>
                    <h4>Channels</h4>
                    <Col className="d-flex justify-content-end">
                        <Button onClick={() => this.channelForm.current.new()}>Add Channel</Button>
                    </Col>
                </Row>
                <Row>
                    <ChannelForm ref={this.channelForm} reload={this.loadChannels}/>
                </Row>
                <Row>
                    <BootstrapTable data={this.state.channels} striped hover tableContainerClass='custom-table'
                                    options={this.options}>
                        <TableHeaderColumn dataField='title' dataSort={true}>Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='sponsor' dataSort={true}
                                           dataFormat={this.nameFormatter}>Sponsor</TableHeaderColumn>
                        <TableHeaderColumn dataField='created' dataSort={true}>Date Added</TableHeaderColumn>
                        <TableHeaderColumn dataField='id' isKey={true}
                                           dataFormat={this.actionFormatter}>Actions</TableHeaderColumn>
                    </BootstrapTable>
                </Row>
            </div>
        );
    }
}

export default Channels;
