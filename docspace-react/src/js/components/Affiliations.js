import React from "react";
import TinySlider from "tiny-slider-react";

class Affiliations extends React.Component {
  constructor(props) {
    super(props);
    this.onGoTo = this.onGoTo.bind(this);
  }
  componentDidMount() {}

  onGoTo(dir) {
    return this.ts.slider.goTo(dir);
  }
  render() {
    const settings = {
      items: 6,
      lazyload: true,
      nav: false,
      controls: false,
      mouseDrag: true,
      responsive: {
        350: {
          items: 3,
        },
        500: {
          items: 6,
        },
      },
    };
    return (
      <div className="affiliation-container">
        <h3 className="channel-title">OUR AFFILIATIONS</h3>
        <TinySlider settings={settings} ref={(ts) => (this.ts = ts)}>
          <div key="affiliation-cogi" className="affiliation">
            <img src="/images/cogi.jpg" alt="COGI" />
          </div>
          <div key="affiliation-cogi-2" className="affiliation"></div>
        </TinySlider>
      </div>
    );
  }
}

export default Affiliations;
