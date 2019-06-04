import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Topbar from "./Topbar";
import Upload from "./Upload";
import Tracks from "./Tracks";

class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <Topbar />
        <Switch>
          <Route exact path="/dashboard/my-tracks" component={Tracks} />
          <Route exact path="/dashboard/upload" component={Upload} />
          <Route
            path="/"
            render={props => <Redirect to="/dashboard/upload" />}
          />
        </Switch>
      </Fragment>
    );
  }
}

export default Dashboard;
