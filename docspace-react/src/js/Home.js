import React from "react";
import { connect } from "react-redux";
import HomeCarousel from "./components/HomeCarousel";
import Channel from "./components/Channel";
import "../css/home.css";
import Axios from "axios";
import Events from "./components/Events";
import Affiliations from "./components/Affiliations";
import Experts from "./components/Experts";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      channels: null,
    };
  }
  componentDidMount() {
    Axios.get("/api/channel/all")
      .then((response) => {
        console.log(response);
        this.setState({
          channels: response.data,
        });
      })
      .catch((error) => {
        console.log("Error Get channels");
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <HomeCarousel channels={this.state.channels}/>
        <Events />
        <Experts />
        {this.state.channels &&
          this.state.channels.map((channel) => (
            <Channel
              id={channel.id}
              key={"channel-"+channel.id}
              title={channel.title}
              videos={channel.videos}
            />
          ))}
        <div />
        <Affiliations />
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

export default connect(mapStateToProps)(Home);
