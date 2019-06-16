import React, { Component } from "react";
import { Card, LinearProgress, Divider, Button } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import BasicInfo from "./BasicInfo";
import Metadata from "./Metadata";
import SimpleSnackbar from "../common/SimpleSnackbar";
import firebase from "../authentication/FirebaseConfig";
import { Context } from "../common/Context";

class TrackEditor extends Component {
  imageFile = null;
  username = "";
  uid = "uid";

  state = {
    title: "",
    genre: "",
    tag: "",
    description: "",
    permission: "public",
    license: "All rights reserved",
    trackUrl: "",
    trackID: "",
    imgUrl: "",
    tabIndex: 0,
    progress: 0,
    uploaded: 0,
    loading: false,
    snackbar: {
      open: false,
      message: ""
    }
  };

  handleTabChange = (event, value) => {
    this.setState({ tabIndex: value });
  };

  handleInputChange = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFormSubmit = () => {
    let { trackID } = this.state;
    let uid = this.uid;
    // when user id is not available
    if (uid === "uid") {
      this.setState({
        loading: false,
        snackbar: {
          open: true,
          message: "User is not available. Try login"
        }
      });
      return;
    }

    this.setState({ loading: true });
    if (this.state.trackUrl) {
      let trackData = { ...this.state };
      delete trackData.snackbar;
      delete trackData.uploaded;
      delete trackData.progress;
      delete trackData.tabIndex;
      delete trackData.loading;
      delete trackData.trackID;

      if (trackID) {
        if (this.imageFile != null && this.state.imgUrl === "") {
          this.uploadImage();
        } else {
          firebase
            .firestore()
            .collection("all-tracks")
            .doc(trackID)
            .update({
              ...trackData,
              time: Date.now(),
              username: this.username,
              uid: this.uid
            })
            .then(() => {
              this.setState({
                loading: false,
                snackbar: { open: true, message: "Saved Successfully" }
              });
            })
            .catch(error => {
              this.setState({
                loading: false,
                snackbar: { open: true, message: error.message }
              });
            });
        }
      } else {
        firebase
          .firestore()
          .collection("all-tracks")
          .add({
            ...trackData,
            time: Date.now(),
            username: this.username,
            uid: this.uid
          })
          .then(snapshot => {
            this.setState({
              loading: false,
              trackID: snapshot.id,
              snackbar: { open: true, message: "Updated Successfully" }
            });
          })
          .catch(error => {
            this.setState({
              loading: false,
              snackbar: { open: true, message: error.message }
            });
          });
      }
    } else {
      this.uploadTrack();
    }
  };

  uploadImage = () => {
    if (this.imageFile != null) {
      let uploadTask = firebase
        .storage()
        .ref("track-photo/")
        .child(this.uid + "/" + this.imageFile.name)
        .put(this.imageFile);

      uploadTask.snapshot.ref
        .getDownloadURL()
        .then(imgUrl => {
          this.setState({ imgUrl });
          this.handleFormSubmit();
        })
        .catch(error => {
          console.log(error);
          this.setState({
            imgUrl: "/", //to prevent recursive call a value is set if error occurs
            snackbar: { open: true, message: error.message }
          });
          this.handleFormSubmit();
        });
    } else {
      this.handleFormSubmit();
    }
  };

  uploadTrack = () => {
    let { file } = this.props;
    let uploadTask = firebase
      .storage()
      .ref("tracks/")
      .child(this.uid + "/" + file.name)
      .put(file);

    uploadTask.on(
      "state_changed",
      snapshot => {
        let prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({ progress: prog, uploaded: snapshot.bytesTransferred });
      },
      error => {
        this.setState({
          loading: false,
          snackbar: {
            open: true,
            message: error.message
          }
        });
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(url => {
          this.setState({
            // loading: false,
            trackUrl: url
          });

          // calling submit to put data into database
          this.uploadImage();
          // this.handleFormSubmit();
        });
      }
    );
  };

  componentWillMount() {
    this.setState({
      title: this.props.file.name
    });
    this.getUserInfo();
  }

  handleSnackbarClose = () => {
    this.setState({
      snackbar: {
        open: false
      }
    });
  };

  handleImageSelection = file => {
    // set imgUrl to null on new image selection
    this.setState({ imgUrl: "" });
    this.imageFile = file;
  };

  getUserInfo = () => {
    let { username, uid } = this.context;
    this.username = username;
    this.uid = uid;
    console.log(this.context);
  };

  render() {
    let { tabIndex, snackbar, progress, uploaded } = this.state;
    let { file, handleCancel } = this.props;
    return (
      <Card className="my-16">
        <div className="flex flex-space-between light-gray py-12 px-16">
          <span>{file.name}</span>
          <span>
            {(uploaded / 1024 / 1024).toFixed(2)} MB of{" "}
            {(file.size / 1024 / 1024).toFixed(2)} MB uploaded
          </span>
        </div>
        <LinearProgress
          color="primary"
          variant="determinate"
          value={progress}
        />
        <div className="p-16 relative">
          <Tabs
            value={tabIndex}
            onChange={this.handleTabChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="standard"
          >
            <Tab className="capitalize" label="basic info" />
            <Tab className="capitalize" label="metadata" />
            {/* <Tab className="capitalize" label="permissions" /> */}
          </Tabs>
          <Divider />
          <SwipeableViews index={tabIndex}>
            <BasicInfo
              fileName={file.name}
              handleImageSelection={this.handleImageSelection}
              state={{
                ...this.state,
                handleInputChange: this.handleInputChange,
                handleSubmit: this.handleFormSubmit,
                handleCancel: handleCancel
              }}
            />
            <Metadata
              fileName={file.name}
              state={{
                ...this.state,
                handleInputChange: this.handleInputChange,
                handleSubmit: this.handleFormSubmit,
                handleCancel: handleCancel
              }}
            />
            {/* <div>Item Three</div> */}
          </SwipeableViews>
        </div>

        <SimpleSnackbar
          open={snackbar.open}
          message={snackbar.message}
          handleClose={this.handleSnackbarClose}
        />
      </Card>
    );
  }
}

TrackEditor.contextType = Context;

export default TrackEditor;
