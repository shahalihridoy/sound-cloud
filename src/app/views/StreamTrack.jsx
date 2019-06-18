import React, { Component, Fragment } from "react";
import { SoundPlayer } from "../common/SoundPlayer";
import firebase from "../authentication/FirebaseConfig";
import CommentBox from "../common/CommentBox";
import { Divider } from "@material-ui/core";
import Loader from "../common/Loader";

class StreamTrack extends Component {
  state = {
    track: null,
    loading: false
  };

  loadTrack = trackID => {
    this.setState({ loading: true });
    firebase
      .firestore()
      .collection("all-tracks")
      .doc(trackID)
      .get()
      .then(track => {
        this.setState({ track: track.data(), loading: false });
      });
  };
  componentWillMount() {
    let { params } = this.props.match;
    if (params.id) this.loadTrack(params.id);
  }
  render() {
    let { track, loading } = this.state;
    let { id: trackID } = this.props.match.params;

    if (!track)
      return (
        <div className="container text-center h-100vh-80">
          {loading ? (
            <Loader />
          ) : (
            <h3 className="relative y-center">No track is available !!!</h3>
          )}
        </div>
      );
    else
      return (
        <div>
          <SoundPlayer
            streamUrl={track.trackUrl}
            track={track}
            preloadType="metadata"
          />
          {trackID ? (
            <Fragment>
              <div className="px-16 pt-8 pb-16">
                <CommentBox trackID={trackID} />
              </div>
            </Fragment>
          ) : null}
        </div>
      );
  }
}

export default StreamTrack;
