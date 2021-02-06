import React from "react";
import Carousel from "react-bootstrap/Carousel";

class HomeCarousel extends React.Component {
  render() {
    return (
      <Carousel className="home-carousel">
          {this.props.channels &&
          this.props.channels.map((channel) => (
              <Carousel.Item>
                  <img
                      className="d-block w-100 carousel-image"
                      src={channel.banner}
                      alt={channel.title}
                  />
              </Carousel.Item>
          ))}
      </Carousel>
    );
  }
}

export default HomeCarousel;
