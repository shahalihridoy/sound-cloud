import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { geolocated } from "react-geolocated";
import firebase from "../authentication/FirebaseConfig";
import Topbar from "./Topbar";
import Upload from "./Upload";
import Tracks from "./Tracks";
import { Context } from "../common/Context";

class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.isGeolocationEnabled) {
      window.alert("Enable location/GPS");
    } else {
    }
  }

  user = () => {
    let value = this.context;
    console.log(value);
  };

  componentWillReceiveProps(props) {
    let { coords: location } = this.props;
    let uid = localStorage.getItem("uid");
    if (location) {
      firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .set(
          {
            latitude: location.latitude,
            longitude: location.longitude
          },
          { merge: true }
        );
    }
  }

  render() {
    this.user();
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
Dashboard.contextType = Context;

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
    maximumAge: 0,
    timeout: Infinity
  },
  watchPosition: false,
  userDecisionTimeout: 10000,
  suppressLocationOnMount: false,
  geolocationProvider: navigator.geolocation,
  isOptimisticGeolocationEnabled: true
})(Dashboard);
