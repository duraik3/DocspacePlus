import React from "react";
import TinySlider from "tiny-slider-react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../css/channel.css";
import {connect} from "react-redux";
import {openLogin} from "../../actions/userActions";

class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onGoTo = this.onGoTo.bind(this);
  }
  componentDidMount() {}

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
      <div className="channel">
        <div className="channel-container">
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
          <h3 className="channel-title">{this.props.title}</h3>

          <TinySlider settings={settings} ref={(ts) => (this.ts = ts)}>
            {this.props.videos &&
              this.props.videos.map((item) => {
                return (
                  <div key={item.id} className="thumbnail-container zoom">
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
                  </div>
                );
              })}
          </TinySlider>
        </div>
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

export default connect(mapStateToProps)(Channel);
