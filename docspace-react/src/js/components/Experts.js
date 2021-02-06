import React from "react";
import TinySlider from "tiny-slider-react";
import { Button } from "react-bootstrap";
import Axios from "axios";

class Experts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speakers: [],
    };
    this.onGoTo = this.onGoTo.bind(this);
  }
  componentDidMount() {
    Axios.get("/api/speaker/all")
      .then((response) => {
        this.setState({
          speakers: response.data,
        });
      })
      .catch((error) => {
        console.log("Error Get channels");
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
      <div className="experts-container">
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
        <h3 className="channel-title">Our Experts</h3>

        <TinySlider settings={settings} ref={(ts) => (this.ts = ts)}>
          {this.state.speakers &&
            this.state.speakers.map((item) => {
              return (
                <div key={"expert-" + item.id} className="speaker-container">
                  <div className="speaker">
                    <img src={item.image} alt="speaker"
                         className="rounded-circle"
                         height="105px"
                         width="105px"
                    />
                    <div className="speaker-info">
                      <span className="speaker-name">{ item.salutation + " " + item.firstName + " " + item.lastName}</span>
                      <span className="speaker-credential">
                        {item.credential}
                      </span>
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

export default Experts;
