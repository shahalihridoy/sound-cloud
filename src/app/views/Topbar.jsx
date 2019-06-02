import React, { Component } from "react";
import { Icon, Card, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";

class Topbar extends Component {
  state = {};
  render() {
    return (
      <Card className="topbar px-16 py-8">
        <div className="flex flex-space-between container">
          <div className="flex flex-wrap flex-middle">
            <Icon style={{ fontSize: "2rem" }}>cloud</Icon>
            <Link to="/" className="mx-8">
              Home
            </Link>
            <Link to="/" className="mx-8">
              Stream
            </Link>
            <Link to="/" className="mx-8">
              Library
            </Link>
            <Link to="/dashboard/upload" className="mx-8">
              Upload
            </Link>
            <Link to="/dashboard/my-tracks" className="mx-8">
              My Track
            </Link>
          </div>
          <div>
            <IconButton>
              <Icon>person</Icon>
            </IconButton>
            <IconButton>
              <Icon>notifications</Icon>
            </IconButton>
            <IconButton>
              <Icon>mail</Icon>
            </IconButton>
            <IconButton>
              <Icon>power_settings_new</Icon>
            </IconButton>
            <IconButton>
              <Icon>more_hor</Icon>
            </IconButton>
          </div>
        </div>
      </Card>
    );
  }
}

export default Topbar;
