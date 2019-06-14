import React, { Component } from "react";
import { Card, IconButton, Icon } from "@material-ui/core";
import firebase from "../authentication/FirebaseConfig";
import Loader from "../common/Loader";
import Like from "../common/Like";
import TrackCard from "../common/TrackCard";

class Favorite extends Component {
  state = {
    files: []
  };

  componentWillMount() {
    let uid = localStorage.getItem("uid");

    let tempFileList = [];

    firebase
      .firestore()
      .collection("all-tracks")
      .where(`likedBy.${uid}`, "==", true)
      .onSnapshot(
        docs => {
          tempFileList = [];
          docs.forEach(element => {
            tempFileList.push({ ...element.data(), trackID: element.id });
          });
          tempFileList.length == 0
            ? this.setState({ files: null })
            : this.setState({ files: [...tempFileList] });
        },
        error => {}
      );
  }

  render() {
    let { files } = this.state;
    if (files == null)
      return (
        <div className="container text-center h-100vh-80">
          <h3 className="relative y-center">Favourite list is empty !!!</h3>
        </div>
      );
    else if (files.length == 0) return <Loader />;
    else
      return (
        <div className="container my-16">
          {files.map((data, index) => (
            <TrackCard data={data} key={index} />
          ))}
        </div>
      );
  }
}

export default Favorite;
