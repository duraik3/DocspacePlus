import React from "react";
import { Switch, Route } from "react-router-dom";
import AppScreen from "./js/AppScreen";
import VideoScreen from "./js/VideoScreen";
import AdminScreen from "./js/AdminScreen";
import Privacy from "./js/components/Privacy";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={AppScreen} />
          <Route path="/video/:id" component={VideoScreen} />
          <Route path="/admin" component={AdminScreen} />
          <Route path="/privacy" component={Privacy} />
        </Switch>
      </main>
    );
  }
}

export default App;
