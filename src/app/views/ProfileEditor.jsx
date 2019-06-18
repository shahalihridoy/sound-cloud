import React, { Component } from "react";
import { Card, Divider, Button, Fab, Icon } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import firebase from "../authentication/FirebaseConfig";
import { Context } from "../common/Context";

class ProfileEditor extends Component {
  state = {
    username: "",
    firstName: "",
    lastName: "",
    city: "",
    country: "",
    bio: "",
    loading: false,
    photoUrl: "",
    uid: "",
    file: null
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleImageSelect = event => {
    let file = event.target.files[0];
    if (!file) return;
    let url = URL.createObjectURL(file);
    this.setState({ photoUrl: url, file: file });
  };

  handleSubmit = () => {
    let { uid, file } = this.state;
    if (uid === "") return;
    if (file) {
      this.uploadImage(uid, file);
    } else this.postDataToFirebase();
    this.setState({ loading: true });
  };

  postDataToFirebase = () => {
    let { uid, photoUrl } = this.state;
    let tempState = { ...this.state };
    delete tempState.file;
    delete tempState.loading;
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .set({ photoUrl, ...tempState }, { merge: true })
      .then(() => {
        this.setState({ loading: false });
        this.context.openSnackbar("Update Successful !!!");
      });
  };

  uploadImage = (uid, file) => {
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
        uploadTask.snapshot.ref.getDownloadURL().then(photoUrl => {
          this.setState({ photoUrl });
          this.postDataToFirebase();
        });
      }
    );
  };

  handleCancel = () => {
    this.props.history.push("/dashboard/view-profile");
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .onSnapshot(doc => {
            localStorage.setItem("user", "true");
            localStorage.setItem("uid", user.uid);
            this.setState({ uid: user.uid, ...doc.data() });
          });
      }
    });
  }

  render() {
    let {
      username,
      firstName,
      lastName,
      city,
      country,
      bio,
      photoUrl,
      loading
    } = this.state;

    return (
      <Card className="container p-16 my-16">
        <h3 className="text-normal">Edit Your Profile</h3>
        <Divider />
        <div className="flex mt-24">
          <div className="relative flex-column">
            <img
              className="big-circular-image"
              src={photoUrl ? photoUrl : "/assets/images/user.png"}
              alt="user"
            />
            <label htmlFor="upload-image">
              <Fab
                className="capitalize x-center mt-8"
                color="secondary"
                component="span"
                variant="extended"
              >
                <Icon className="pr-8">camera_alt</Icon>
                <span>upload image</span>
              </Fab>
            </label>
            <input
              className="display-none"
              accept="image/*"
              onChange={this.handleImageSelect}
              id="upload-image"
              type="file"
            />
          </div>
          <ValidatorForm
            ref="form"
            className="flex-column w-100 pl-48"
            onSubmit={this.handleSubmit}
            onError={errors => null}
          >
            <TextValidator
              className="mb-8 w-100"
              label="Display Name"
              onChange={this.handleInputChange}
              name="username"
              value={username}
              validators={["required"]}
              errorMessages={["This field is required"]}
              variant="outlined"
            />
            <div className="flex">
              <TextValidator
                className="my-8 mr-8 w-100"
                label="First Name"
                onChange={this.handleInputChange}
                name="firstName"
                value={firstName}
                variant="outlined"
              />
              <TextValidator
                className="my-8 ml-8 w-100"
                label="Last Name"
                onChange={this.handleInputChange}
                name="lastName"
                value={lastName}
                variant="outlined"
              />
            </div>

            <div className="flex">
              <TextValidator
                className="my-8 mr-8 w-100"
                label="City"
                onChange={this.handleInputChange}
                name="city"
                value={city}
                variant="outlined"
              />
              <TextValidator
                className="my-8 ml-8 w-100"
                label="Country"
                onChange={this.handleInputChange}
                name="country"
                value={country}
                variant="outlined"
              />
            </div>
            <TextValidator
              className="my-8 w-100"
              label="Bio"
              onChange={this.handleInputChange}
              name="bio"
              value={bio}
              variant="outlined"
              multiline
            />

            <div className="flex flex-end py-16">
              <Button
                onClick={this.handleCancel}
                type="button"
                className="capitalize mr-16"
                variant="text"
              >
                Cancel
              </Button>
              <Button
                className="capitalize"
                variant="contained"
                color="secondary"
                type="submit"
                disabled={loading}
              >
                Save
              </Button>
            </div>
          </ValidatorForm>
        </div>
      </Card>
    );
  }
}

ProfileEditor.contextType = Context;
export default ProfileEditor;
