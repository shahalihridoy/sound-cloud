import React, { Component } from "react";
import { Card, IconButton, Icon } from "@material-ui/core";
import firebase from "../authentication/FirebaseConfig";
import Loader from "../common/Loader";
import Like from "../common/Like";

class MyTracks extends Component {
  state = {
    files: []
  };

  componentWillMount() {
    let tempFileList = [];
    firebase
      .firestore()
      .collection("all-tracks")
      .where("uid", "==", localStorage.getItem("uid"))
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

  handleLike = (trackID, isLiked) => {
    let uid = localStorage.getItem("uid");

    if (isLiked) {
      firebase
        .firestore()
        .collection("all-tracks")
        .doc(trackID)
        .update(`likedBy.${uid}`, firebase.firestore.FieldValue.delete());
    } else {
      firebase
        .firestore()
        .collection("all-tracks")
        .doc(trackID)
        .set({ likedBy: { [uid]: true } }, { merge: true });
    }
  };

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
              className="track-card flex flex-middle flex-space-between p-16 mb-8"
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
                    <Like trackID={data.trackID} likedBy={data.likedBy} />
                    <span className="pr-16 pb-3">
                      {data.likedBy
                        ? Object.keys(data.likedBy).length > 0
                          ? Object.keys(data.likedBy).length
                          : ""
                        : ""}
                    </span>

                    <IconButton size="medium">
                      <Icon fontSize="small">message</Icon>
                    </IconButton>
                    <span className="pb-3">1</span>
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
              <div>{new Date(data.time).toLocaleString()}</div>
            </Card>
          ))}
        </div>
      );
  }
}

export default MyTracks;
