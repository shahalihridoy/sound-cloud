import React, { Component, Fragment } from "react";
import { Icon, Card, IconButton } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import firebase from "../authentication/FirebaseConfig";
import { Context } from "../common/Context";
import CustomizedMenu from "../common/CustomizedMenu";

class Topbar extends Component {
  state = {};

  handleSignOut = () => {
    this.props.history.push("/signin");
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem("uid");
        localStorage.removeItem("user");
        this.props.history.push("/signin");
      });
  };

  render() {
    return (
      <Card elevation={3} className="topbar px-16 py-8 border-radius-none">
        <div className="flex flex-space-between">
          <div className="flex flex-wrap flex-middle text-white">
            <Icon style={{ fontSize: "2rem" }}>cloud</Icon>
            <Link to="/" className="mx-8">
              Home
            </Link>
            <Link to="/" className="mx-8">
              Stream
            </Link>
            <Link to="/dashboard/charts" className="mx-8">
              Charts
            </Link>
            <Link to="/dashboard/upload" className="mx-8">
              Upload
            </Link>
            <Link to="/dashboard/my-tracks" className="mx-8">
              My Track
            </Link>
          </div>
          <div className="flex flex-middle">
            <CustomizedMenu
              menuButton={
                <Fragment>
                  <IconButton>
                    <Icon className="text-white">person</Icon>
                  </IconButton>
                  <Context.Consumer>
                    {({ username }) =>
                      username ? (
                        <span className="capitalize pointer text-white pr-8">
                          {username}
                        </span>
                      ) : null
                    }
                  </Context.Consumer>
                </Fragment>
              }
            >
              <div className="capitalize flex flex-middle">
                <Icon className="mr-16">person</Icon>
                update profile
              </div>
              <div className="capitalize flex flex-middle">
                <Icon className="mr-16">visibility</Icon>
                view profile
              </div>
              <div className="capitalize flex flex-middle">
                <Icon className="mr-16">queue_music</Icon>
                my tracks
              </div>
              <Link to="/dashboard/charts">
                <div className="capitalize flex flex-middle">
                  <Icon className="mr-16">favorite</Icon>
                  Favourite
                </div>
              </Link>
              <div
                className="capitalize flex flex-middle"
                onClick={this.handleSignOut}
              >
                <Icon className="mr-16">power_settings_new</Icon>
                sign out
              </div>
            </CustomizedMenu>
            <IconButton>
              <Icon className="text-white">notifications</Icon>
            </IconButton>
            <IconButton>
              <Icon className="text-white">mail</Icon>
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

export default withRouter(Topbar);
