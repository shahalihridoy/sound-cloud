import React, { Component } from "react";
import { Card, IconButton, Icon } from "@material-ui/core";
import firebase from "../authentication/FirebaseConfig";
import Loader from "../common/Loader";

class Charts extends Component {
  state = {
    files: []
  };

  componentWillMount() {
    let tempFileList = [];
    firebase
      .firestore()
      .collection("all-tracks")
      .orderBy("time", "desc")
      .limit(20)
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
                    <IconButton size="medium">
                      <Icon fontSize="small">favorite</Icon>
                    </IconButton>
                    <span className="pr-16 pb-3">2</span>

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
              <div>{new Date(data.time).toLocaleString()}</div>
            </Card>
          ))}
        </div>
      );
  }
}

export default Charts;
