import React, { Component } from "react";
import { Icon, Card, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";

class Topbar extends Component {
  state = {};
  render() {
    return (
      <Card elevation={3} className="topbar px-16 py-8">
        <div className="flex flex-space-between">
          <div className="flex flex-wrap flex-middle text-white">
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
              <Icon className="text-white">person</Icon>
            </IconButton>
            <IconButton>
              <Icon className="text-white">notifications</Icon>
            </IconButton>
            <IconButton>
              <Icon className="text-white">mail</Icon>
            </IconButton>
            <IconButton>
              <Icon className="text-white">power_settings_new</Icon>
            </IconButton>
            <IconButton>
              <Icon className="text-white">more_hor</Icon>
            </IconButton>
          </div>
        </div>
      </Card>
    );
  }
}

export default Topbar;
