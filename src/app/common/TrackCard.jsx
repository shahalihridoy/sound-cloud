import React, { Component, Fragment } from "react";
import { Card, IconButton, Icon, Divider } from "@material-ui/core";
import Like from "./Like";
import CommentBox from "./CommentBox";
import { Link } from "react-router-dom";

class TrackCard extends Component {
  state = {
    openCommentBox: false
  };

  render() {
    let { data } = this.props;

    return (
      <Card className="track-card p-16 mb-8">
        <div className="flex flex-middle flex-space-between">
          <div className="flex">
            <div className="mr-16 h-100">
              <img
                src={
                  data.imgUrl && data.imgUrl != "/"
                    ? data.imgUrl
                    : "/assets/images/bg-1.jpg"
                }
                alt="fsdf"
              />
            </div>
            <div className="flex-column flex-space-between">
              <div className="m-0 capitalize">
                <Link to={"/dashboard/stream/" + data.trackID}>
                  <strong>{data.title}</strong>
                </Link>
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
                  onClick={() =>
                    this.setState({
                      openCommentBox: !this.state.openCommentBox
                    })
                  }
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
            <CommentBox trackID={data.trackID} />
          </Fragment>
        ) : null}
      </Card>
    );
  }
}

export default TrackCard;
