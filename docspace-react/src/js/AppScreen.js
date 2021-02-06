import React from "react";
import Header from "./Header";
import Footer from "./components/Footer";
import Home from "./Home";

class AppScreen extends React.Component {
  render() {
    return (
      <div>
        <Header forceLogin={false} />
        <Home />
        <Footer fixed="false" />
      </div>
    );
  }
}

export default AppScreen;
