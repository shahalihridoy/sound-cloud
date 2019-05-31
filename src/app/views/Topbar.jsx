import React, { Component } from "react";
import { Icon, Card } from "@material-ui/core";
import { Link } from "react-router-dom";

class Topbar extends Component {
  state = {};
  render() {
    return (
      <Card className="topbar w-100 px-16 py-12">
        <div className="flex flex-wrap flex-space-between flex-middle container">
          <div>
            <Icon style={{ fontSize: "2rem" }}>cloud</Icon>
            <Link to="/">Home</Link>
            <Link to="/signin" className="mx-8">
              Stream
            </Link>
            <Link to="/signup" className="mx-8">
              Library
            </Link>
            <Link to="/upload" className="mx-8">
              Upload
            </Link>
            <Link to="/my-tracks" className="mx-8">
              My Track
            </Link>
          </div>
        </div>
      </Card>
    );
  }
}

export default Topbar;
