import React from "react";
import TinySlider from "tiny-slider-react";
import { Button } from "react-bootstrap";
import dateformat from "dateformat";
import { Link } from "react-router-dom";
import Axios from "axios";
import "../../css/events.css";
import {openLogin} from "../../actions/userActions";
import {connect} from "react-redux";

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
    this.onGoTo = this.onGoTo.bind(this);
    this.watchLater = this.watchLater.bind(this);
  }
  watchLater(video_id) {
    Axios.get("/api/watchlater/" + video_id)
      .then((response) => {})
      .catch((error) => {
        console.log(error.response);
      });
  }

  componentDidMount() {
    Axios.get("/api/video/events")
      .then((response) => {
        this.setState({
          events: response.data,
        });
      })
      .catch((error) => {
        console.log("Unable to get upcoming events: " + JSON.stringify(error));
      });
  }

  onGoTo(dir) {
    return this.ts.slider.goTo(dir);
  }

  render() {
    const settings = {
      items: 4,
      lazyload: true,
      nav: false,
      controls: false,
      mouseDrag: true,
      responsive: {
        350: {
          items: 2,
        },
        500: {
          items: 4,
        },
      },
    };
    return (
      <div className="event-container">
        <div className="nav-button">
          <Button
            variant="dark"
            className="prev-button"
            onClick={() => this.onGoTo("prev")}
          >
            &lt;
          </Button>
          <Button
            variant="dark"
            className="next-button"
            onClick={() => this.onGoTo("next")}
          >
            &gt;
          </Button>
        </div>
        <h3 className="channel-title" style={{ zIndex: "0" }}>
          Upcoming Events
        </h3>

        <TinySlider settings={settings} ref={(ts) => (this.ts = ts)}>
          {this.state.events &&
            this.state.events.map((item) => {
              let date = item.eventDate ? new Date(item.eventDate) : new Date();
              return (
                <div
                  key={"event-" + item.id}
                  className="thumbnail-container zoom"
                >
                  <span className="badge badge-danger badge-pill thumbnail-live">
                    {item.status === "Live" && "Live"}
                  </span>
                  {this.props.user !== null &&
                  <Link
                    to={{
                      pathname: "/video/" + item.id,
                      state: { video: item },
                    }}
                  >
                    <img
                      src={item.thumbnail}
                      data-src={item.thumbnail}
                      alt="Thumbnail"
                    />
                  </Link>}
                  {this.props.user === null &&
                  <a onClick={() => this.props.dispatch(openLogin())}
                  >
                    <img
                        src={item.thumbnail}
                        data-src={item.thumbnail}
                        alt="Thumbnail"
                    />
                  </a>}
                  <div className="thumbnail-info">
                    <span>{dateformat(date, "mmm d | h TT")}</span>
                    <div className="wishlist-button">
                      <Button
                        variant="outline-light"
                        onClick={() => {
                          this.watchLater(item.id);
                        }}
                      >
                        + Watch later
                      </Button>
                    </div>
                  </div>

                </div>
              );
            })}
        </TinySlider>
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

export default connect(mapStateToProps)(Events);
