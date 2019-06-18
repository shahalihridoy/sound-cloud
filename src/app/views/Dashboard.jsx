import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { geolocated } from "react-geolocated";
import firebase from "../authentication/FirebaseConfig";
import Topbar from "./Topbar";
import Upload from "./Upload";
import MyTracks from "./MyTracks";
import Pricing from "./Pricing";
import { Context } from "../common/Context";
import AlertDialog from "../common/AlertDialogue";
import Favorite from "./Favorite";
import StreamTrack from "./StreamTrack";
import ProfileViewer from "./ProfileViewer";
import ProfileEditor from "./ProfileEditor";
import SimpleSnackbar from "../common/SimpleSnackbar";

class Dashboard extends Component {
  state = {
    OpenPricingDialog: false
  };

  handlePricingDialogClose = () => {
    this.setState({ OpenPricingDialog: false });
  };

  componentDidMount() {
    if (!this.props.isGeolocationEnabled) {
      window.alert("Enable location/GPS");
    } else {
    }
    this.checkPricingPlan();
  }

  checkPricingPlan = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(localStorage.getItem("uid"))
      .onSnapshot(doc => {
        if (doc.data()) {
          if (!doc.data().plan) this.setState({ OpenPricingDialog: true });
        } else {
          this.setState({ OpenPricingDialog: false });
        }
      });
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
    let { snackbar, handleSnackbarClose } = this.context;
    return (
      <Fragment>
        <Topbar />
        <Switch>
          <Route exact path="/dashboard/my-tracks" component={MyTracks} />
          <Route exact path="/dashboard/upload" component={Upload} />
          <Route exact path="/dashboard/charts" component={Favorite} />
          <Route exact path="/dashboard/stream/:id" component={StreamTrack} />
          <Route
            exact
            path="/dashboard/view-profile"
            component={ProfileViewer}
          />
          <Route
            exact
            path="/dashboard/edit-profile"
            component={ProfileEditor}
          />
          <Route
            path="/"
            render={props => <Redirect to="/dashboard/upload" />}
          />
        </Switch>
        <AlertDialog
          open={this.state.OpenPricingDialog}
          handleClose={this.handlePricingDialogClose}
        >
          <Pricing handlePricingDialogClose={this.handlePricingDialogClose} />
        </AlertDialog>

        <SimpleSnackbar
          open={snackbar.open}
          message={snackbar.message}
          handleClose={handleSnackbarClose}
        />
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
