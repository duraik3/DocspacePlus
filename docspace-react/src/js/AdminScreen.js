import React from "react";
import Header from "./Header";
import Footer from "./components/Footer";
import {Col, Row} from "react-bootstrap";
import SideBar from "./admin/SideBar";
import {connect} from "react-redux";
import "../css/admin.css"
import Speakers from "./admin/Speakers";
import Channels from "./admin/Channels";
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import Events from "./admin/Events";
import Roles from "./admin/Roles";
import About from "./admin/About";

class AdminScreen extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Row className="admin-container">
                    <Col className="col-auto">
                        <SideBar/>
                    </Col>
                    <Col>
                        {this.props.adminScreen === "CHANNELS" && <Channels/>}
                        {this.props.adminScreen === "SPEAKERS" && <Speakers/>}
                        {this.props.adminScreen === "EVENTS" && <Events/>}
                        {this.props.adminScreen === "ROLES" && <Roles/>}
                        {this.props.adminScreen === "ABOUT" && <About/>}
                    </Col>
                </Row>
                <Footer fixed="false"/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        adminScreen: state.adminReducer.adminScreen,
    };
}

export default connect(mapStateToProps)(AdminScreen);
