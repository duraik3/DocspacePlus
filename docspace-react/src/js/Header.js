import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import ConfirmRegister from "./components/ConfirmRegister";
import ForgotPasswordModal from "./ForgotPasswordModal";
import React from "react";
import { connect } from "react-redux";
import { Navbar, NavDropdown, Button, Nav } from "react-bootstrap";
import { fetchUser, logoutUser, openLogin } from "../actions/userActions";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.showLogin = this.showLogin.bind(this);
  }
  componentDidMount() {
    if (this.props.user === null) {
      this.props.dispatch(fetchUser());
    }
  }

  logout() {
    this.props.dispatch(logoutUser());
    window.location.reload(false);
  }

  showLogin() {
    this.props.dispatch(openLogin());
  }

  render() {
    return (
      <div>
        <LoginModal forceLogin={this.props.forceLogin} />
        <RegisterModal forceLogin={this.props.forceLogin} />
        <ConfirmRegister forceLogin={this.props.forceLogin} />
        <ForgotPasswordModal forceLogin={this.props.forceLogin} />
        <Navbar expand="lg" className="nav-bar" fixed="top" variant="dark">
          <Navbar.Brand href="/">
            <img
              src="/images/logo.png"
              className="d-inline-block align-top nav-logo"
              alt="Docspace logo"
            />
          </Navbar.Brand>

          {this.props.user !== null && (
            <Nav className="ml-auto">
              <Nav.Link>
                <Button variant="outline-light" className="search-button">
                  <img src="/images/search.svg" alt="s" />
                  <span className="search-text">SEARCH</span>
                </Button>
              </Nav.Link>
              <NavDropdown
                title={
                  <span>
                    <img
                      src="/images/Register.svg"
                      className="user-dropdown-img"
                      alt="user pic"
                    />
                    <span className="user-dropdown-text">
                      {this.props.user.salutation +
                        " " +
                        this.props.user.firstName +
                        " " +
                        this.props.user.lastName}
                    </span>
                  </span>
                }
                id="collasible-nav-dropdown"
                className="justify-content-end user-dropdown"
              >
                <NavDropdown.Item href="/admin">Admin</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={this.logout}>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
          {this.props.user === null && (
            <Nav className="ml-auto">
              <Nav.Link>
                <Button variant="outline-light" className="search-button">
                  <img src="/images/search.svg" alt="s" />
                  <span className="search-text">SEARCH</span>
                </Button>
              </Nav.Link>
              <Nav.Link>
                <Button
                  onClick={this.showLogin}
                  variant="outline-light"
                  className="login-button"
                >
                  <span>LOGIN</span>
                  <span className="login-add-text"> / NEW USER</span>
                </Button>
              </Nav.Link>
            </Nav>
          )}
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    loading: state.userReducer.loading,
    loggedOut: state.userReducer.loggedOut,
    error: state.userReducer.error,
  };
}

export default connect(mapStateToProps)(Header);
