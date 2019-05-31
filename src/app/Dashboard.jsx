import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Topbar from "./views/Topbar";
import Upload from "./views/Upload";
import Tracks from "./views/Tracks";

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
