import React, { Component, Fragment } from "react";
import { Button, Icon } from "@material-ui/core";
import Topbar from "./views/Topbar";
import Upload from "./views/Upload";

class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <Topbar />
        <Upload />
      </Fragment>
    );
  }
}

export default Dashboard;
