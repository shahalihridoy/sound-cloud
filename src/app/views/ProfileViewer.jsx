import React, { Component, Fragment } from "react";
import { Button, Divider, Icon } from "@material-ui/core";
import firebase from "../authentication/FirebaseConfig";
import { Context } from "../common/Context";
import { Link } from "react-router-dom";

class ProfileViewer extends Component {
  state = {};

  getBackgroundImage = coverImgUrl => {
    return {
      background: `gray url('${
        coverImgUrl ? coverImgUrl : "/assets/images/bg-1.jpg"
      }')`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center"
    };
  };

  handleImageSelect = event => {
    let file = event.target.files[0];
    let { uid } = this.context;

    if (!uid) return;

    let uploadTask = firebase
      .storage()
      .ref("user-photo/")
      .child(uid + "/" + file.name)
      .put(file);

    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {},
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(imgUrl => {
          firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .set({ coverPhotoUrl: imgUrl }, { merge: true });
        });
      }
    );
  };

  render() {
    let {
      username,
      photoUrl,
      firstName,
      lastName,
      coverPhotoUrl
    } = this.context;

    return (
      <Fragment>
        <div
          className="view-profile p-48 relative"
          style={this.getBackgroundImage(coverPhotoUrl)}
        >
          <div className="flex flex-space-between">
            <div className="flex">
              <img
                className="big-circular-image"
                src={photoUrl ? photoUrl : "/assets/images/user.png"}
                alt="user"
              />
              <div className="pl-24">
                <h3 className="m-0 pb-8 text-normal capitalize">{username}</h3>
                <h4 className="m-0 text-normal capitalize">
                  {firstName} {lastName}
                </h4>
              </div>
            </div>
            <div className="view-profile__cover-button-holder">
              <label htmlFor="uload-cover-image">
                <Button
                  className="capitalize"
                  variant="contained"
                  color="secondary"
                  component="span"
                >
                  <Icon className="pr-8">camera_alt</Icon>
                  <span> upload cover</span>
                </Button>
              </label>
              <input
                accept="image/*"
                onChange={this.handleImageSelect}
                id="uload-cover-image"
                type="file"
              />
            </div>
          </div>
        </div>
        <div className="px-48 flex flex-middle flex-space-between">
          <div className="flex py-16 view-profile-links">
            <Link to="/">All</Link>
            <Link to="/">Tracks</Link>
            <Link to="/">Album</Link>
            <Link to="/">Playlist</Link>
          </div>
          <Link to="/dashboard/edit-profile">
            <Button
              className="capitalize"
              variant="contained"
              color="secondary"
              component="span"
            >
              <Icon className="pr-8">edit</Icon>
              <span>edit profile</span>
            </Button>
          </Link>
        </div>
        <Divider />
      </Fragment>
    );
  }
}

ProfileViewer.contextType = Context;
export default ProfileViewer;
