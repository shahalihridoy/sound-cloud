import React, { Component, Fragment } from "react";
import { Card, IconButton, Icon, Divider, TextField } from "@material-ui/core";
import Like from "./Like";
import firebase from "../authentication/FirebaseConfig";
import { Context } from "./Context";

class TrackCard extends Component {
  state = {
    commentList: [],
    openCommentBox: false,
    comment: ""
  };

  loadComment = trackID => {
    this.setState({ openCommentBox: !this.state.openCommentBox });
    if (this.state.commentList.length > 0) return;
    let tempCommentList = [];
    firebase
      .firestore()
      .collection("comments")
      .doc(trackID)
      .collection("comments")
      .onSnapshot(docs => {
        tempCommentList = [];
        docs.forEach(comment => {
          tempCommentList.push(comment.data());
        });
        this.setState({ commentList: [...tempCommentList] });
      });
  };

  submitComment = (event, trackID) => {
    let { uid, photoUrl, username } = this.context;
    if (event.key === "Enter" && !event.shiftKey) {
      this.setState({ comment: "" });

      //   increamenting comment number in track
      firebase
        .firestore()
        .collection("all-tracks")
        .doc(trackID)
        .get()
        .then(doc => {
          let totalComment = doc.data().totalComment;
          firebase
            .firestore()
            .collection("all-tracks")
            .doc(trackID)
            .set(
              { totalComment: totalComment ? totalComment + 1 : 1 },
              { merge: true }
            );
        });

      firebase
        .firestore()
        .collection("comments")
        .doc(trackID)
        .collection("comments")
        .add({
          comment: this.state.comment,
          date: Date.now(),
          uid: uid,
          username: username,
          photoUrl: photoUrl
        });
    }
  };

  handleChange = event => {
    event.persist();
    this.setState({ comment: event.target.value });
  };

  render() {
    let { data } = this.props;
    let { photoUrl } = this.context;
    return (
      <Card className="track-card p-16 mb-8">
        <div className="flex flex-middle flex-space-between">
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
                  {data.username === "Null" ? "" : data.username}
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

                <IconButton
                  size="medium"
                  onClick={() => this.loadComment(data.trackID)}
                >
                  <Icon fontSize="small">message</Icon>
                </IconButton>
                <span className="pb-3">{data.totalComment}</span>
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
          <div className="text-muted">
            {new Date(data.time).toLocaleString()}
          </div>
        </div>
        {this.state.openCommentBox ? (
          <Fragment>
            <Divider className="my-16" />
            <div className="flex flex-middle">
              <img
                className="circular-image mr-8"
                src={photoUrl ? photoUrl : "/assets/images/user.png"}
                alt="user"
              />
              <TextField
                value={this.state.comment}
                onChange={this.handleChange}
                onKeyUp={event => this.submitComment(event, data.trackID)}
                variant="outlined"
                multiline
                className="w-100"
                placeholder="press enter to submit and shift+enter for new line"
              />
            </div>
            {this.state.commentList.map((comment, index) => (
              <div className="flex pt-16" key={index}>
                <img
                  src={
                    comment.photoUrl
                      ? comment.photoUrl
                      : "/assets/images/user.png"
                  }
                  alt="commenter"
                  className="circular-image mr-8"
                />
                <div>
                  <p className="m-0 capitalize">{comment.username}</p>
                  <small className="text-muted">
                    {new Date(comment.date).toLocaleString()}
                  </small>
                  <p className="m-0 pt-8" style={{ whiteSpace: "pre" }}>
                    {comment.comment}
                  </p>
                </div>
              </div>
            ))}
          </Fragment>
        ) : null}
      </Card>
    );
  }
}

TrackCard.contextType = Context;
export default TrackCard;
