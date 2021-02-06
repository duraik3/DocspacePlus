import React from "react";
import {connect} from "react-redux";
import {Collapse, Nav} from "react-bootstrap";
import {setAdminScreen} from "../../actions/adminActions";
import "../../css/sidebar.css";

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contentManagement: false,
            analytics: false,
            settings: false
        };
        this.openContentManagement = this.openContentManagement.bind(this);
        this.openAnalytics = this.openAnalytics.bind(this);
        this.openSettings = this.openSettings.bind(this);
        this.openChannels = this.openChannels.bind(this);
        this.openSpeakers = this.openSpeakers.bind(this);
        this.openEvents = this.openEvents.bind(this);
        this.openRoles = this.openRoles.bind(this);
        this.openAbout = this.openAbout.bind(this);
    }

    openContentManagement() {
        this.setState({
            contentManagement: !this.state.contentManagement
        });
    }

    openAnalytics() {
        this.setState({
            analytics: !this.state.analytics
        });
    }

    openSettings() {
        this.setState({
            settings: !this.state.settings
        });
    }

    openChannels() {
        this.props.dispatch(setAdminScreen("CHANNELS"));
    }

    openSpeakers() {
        this.props.dispatch(setAdminScreen("SPEAKERS"));
    }

    openEvents() {
        this.props.dispatch(setAdminScreen("EVENTS"));
    }

    openRoles(){
        this.props.dispatch(setAdminScreen("ROLES"));
    }

    openAbout(){
        this.props.dispatch(setAdminScreen("ABOUT"));
    }

    render() {
        return (
            <div className="sidebar-wrapper">
                <Nav id="sidebar">
                    <div className="sidebar-header">
                        <p>Admin Home</p>
                    </div>
                    <ul className="list-unstyled components">
                        <li className="active">
                            <a data-toggle="collapse"
                               onClick={this.openContentManagement}
                               aria-controls="example-collapse-text"
                               aria-expanded={this.state.contentManagement}
                               className="dropdown-toggle">Content Management</a>
                            <Collapse in={this.state.contentManagement}>
                                <ul className="collapse list-unstyled" id="homeSubmenu">
                                    <li>
                                        <a onClick={this.openChannels}>Channels</a>
                                    </li>
                                    <li>
                                        <a onClick={this.openSpeakers}>Speakers</a>
                                    </li>
                                    <li>
                                        <a onClick={this.openEvents}>Events</a>
                                    </li>
                                </ul>
                            </Collapse>
                        </li>
                        <li className="active">
                            <a data-toggle="collapse"
                               onClick={this.openAnalytics}
                               aria-controls="example-collapse-text"
                               aria-expanded={this.state.analytics}
                               className="dropdown-toggle">Analytics</a>
                            <Collapse in={this.state.analytics}>
                                <ul className="collapse list-unstyled" id="homeSubmenu">
                                    <li>
                                        <a>Home 1</a>
                                    </li>
                                    <li>
                                        <a>Home 2</a>
                                    </li>
                                    <li>
                                        <a>Home 3</a>
                                    </li>
                                </ul>
                            </Collapse>
                        </li>
                        <li className="active">
                            <a data-toggle="collapse"
                               onClick={this.openSettings}
                               aria-controls="example-collapse-text"
                               aria-expanded={this.state.settings}
                               className="dropdown-toggle">Settings</a>
                            <Collapse in={this.state.settings}>
                                <ul className="collapse list-unstyled" id="homeSubmenu">
                                    <li>
                                        <a onClick={this.openRoles}>Roles</a>
                                    </li>
                                    <li>
                                        <a>Specialities</a>
                                    </li>
                                    <li>
                                        <a onClick={this.openAbout}>Where did you hear about us ?</a>
                                    </li>
                                </ul>
                            </Collapse>
                        </li>
                    </ul>
                </Nav>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        adminScreen: state.adminReducer.adminScreen,
    };
}

export default connect(mapStateToProps)(SideBar);