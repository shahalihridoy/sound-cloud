import React, { Component, Fragment } from "react";
import { TextField } from "@material-ui/core";
import firebase from "../authentication/FirebaseConfig";
import { Context } from "./Context";
import PropTypes from "prop-types";

class CommentBox extends Component {
  state = {
    commentList: [],
    comment: ""
  };

  componentWillMount() {
    let { trackID } = this.props;
    if (trackID) this.loadComment(trackID);
  }

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
    let { trackID } = this.props;
    let { photoUrl } = this.context;
    if (!trackID) return null;
    return (
      <Fragment>
        <div className="flex flex-middle">
          <img
            className="circular-image mr-8"
            src={photoUrl ? photoUrl : "/assets/images/user.png"}
            alt="user"
          />
          <TextField
            value={this.state.comment}
            onChange={this.handleChange}
            onKeyUp={event => this.submitComment(event, trackID)}
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
                comment.photoUrl ? comment.photoUrl : "/assets/images/user.png"
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
    );
  }
}
CommentBox.propTypes = {
  trackID: PropTypes.string.isRequired
};
CommentBox.contextType = Context;
export default CommentBox;
