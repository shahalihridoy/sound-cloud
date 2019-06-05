import React, { Component } from "react";
import { Card, IconButton, Icon } from "@material-ui/core";
import firebase from "../authentication/FirebaseConfig";
import Loader from "../common/Loader";

class Tracks extends Component {
  state = {
    files: []
  };

  componentWillMount() {
    let tempFileList = [];
    firebase
      .firestore()
      .collection("all-tracks")
      .doc(localStorage.getItem("uid"))
      .collection("tracks")
      .orderBy("time", "desc")
      .onSnapshot(
        docs => {
          tempFileList = [];
          docs.forEach(element => {
            tempFileList.push(element.data());
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
          <h3 className="relative y-center">No track is uploaded yet !!!</h3>
        </div>
      );
    else if (files.length == 0) return <Loader />;
    else
      return (
        <div className="container my-16">
          {files.map((data, index) => (
            <Card
              className="track-card flex flex-middle flex-space-between p-16"
              key={index}
            >
              <div className="flex">
                <div className="mr-16 h-100">
                  <img
                    src={data.imgUrl ? data.imgUrl : "/assets/images/bg-1.jpg"}
                    alt="fsdf"
                  />
                </div>
                <div className="flex-column flex-space-between">
                  <div className="m-0 capitalize">
                    <strong>{data.title}</strong>
                    <p className="m-0 pt-4 text-muted">
                      {data.username == "Null" ? "" : data.username}
                    </p>
                  </div>
                  <div className="text-muted flex flex-middle">
                    <Icon fontSize="small">favorite</Icon>
                    <span className="pr-8">2</span>
                    <Icon fontSize="small">message</Icon>
                    <span>1</span>
                  </div>
                </div>
              </div>
              <div>
                <audio controls>
                  <source src={data.trackUrl} type="audio/mpeg" />
                  <source src={data.trackUrl} type="audio/ogg" />
                  <source src={data.trackUrl} type="audio/wav" />
                </audio>
              </div>
              {/* <div className="track-options ">
              <IconButton fontSize="small">
                <Icon fontSize="small">favorite</Icon>
              </IconButton>
              <IconButton fontSize="small">
                <Icon fontSize="small">edit</Icon>
              </IconButton>
              <IconButton fontSize="small">
                <Icon fontSize="small">delete</Icon>
              </IconButton>
              <IconButton fontSize="small">
                <Icon fontSize="small">more_hor</Icon>
              </IconButton>
            </div> */}
              <div>{data.time}</div>
            </Card>
          ))}
        </div>
      );
  }
}

export default Tracks;
