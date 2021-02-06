import React from "react";
import Axios from "axios";
import {Button, Col, Row} from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import RolesForm from "./RolesForm";

class Roles extends React.Component {
    constructor(props) {
        super(props);
        this.roleForm = React.createRef();

        this.state = {
            users: [],
            selectedUser: null
        };
        this.options = {
            defaultSortName: 'email',  // default sort column name
            defaultSortOrder: 'asc'  // default sort order
        };

        this.load = this.load.bind(this);
        this.nameFormatter = this.nameFormatter.bind(this);
        this.actionFormatter = this.actionFormatter.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        Axios.get("/api/user/all")
            .then((response) => {
                this.setState({
                    users: response.data,
                });
            })
            .catch((error) => {
                console.log("Error Get Users list");
            });
    }

    load() {
        Axios.get("/api/user/all")
            .then((response) => {
                this.setState({
                    users: response.data,
                });
            })
            .catch((error) => {
                console.log("Error Get Users list");
            });
    }

    nameFormatter(cell, row) {
        if (row !== null) {
            return (
                row.salutation + " " + row.firstName + " " + row.lastName
            );
        } else {
            return "";
        }

    }

    actionFormatter(cell, row) {
        return (
            <div>
                <a onClick={() => {
                    this.edit(row)
                }}><img src="/images/edit_Active.svg"/></a>
            </div>
        );
    }

    delete(user) {
        return;
    }

    edit(user) {
        this.setState({
            selectedUser: user
        });
        this.roleForm.current.load(user);
    }

    render() {
        return (
            <div className="admin-speakers-container">
                <Row>
                    <h4>Roles</h4>
                    <Col className="d-flex justify-content-end">
                        <Button onClick={() => this.roleForm.current.new()}>Add New Role</Button>
                    </Col>
                </Row>
                <Row>
                    <RolesForm ref={this.roleForm} reload={this.load}/>
                </Row>
                <Row>
                    <BootstrapTable data={this.state.users} striped hover tableContainerClass='custom-table'
                                    options={this.options}>
                        <TableHeaderColumn dataField='id' dataFormat={this.nameFormatter} dataSort={true}>Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='role' dataSort={true}>Role</TableHeaderColumn>
                        <TableHeaderColumn dataField='email' dataSort={true}>Email</TableHeaderColumn>
                        <TableHeaderColumn dataField='created' dataSort={true}>Date Added</TableHeaderColumn>
                        <TableHeaderColumn dataField='id' isKey={true}
                                           dataFormat={this.actionFormatter}>Actions</TableHeaderColumn>
                    </BootstrapTable>
                </Row>
            </div>
        );
    }
}

export default Roles;
