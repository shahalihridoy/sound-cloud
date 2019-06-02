import React, { Component, Fragment } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Fab, Icon, MenuItem, Button, Divider } from "@material-ui/core";
import { Card } from "@material-ui/core";
import firebase from "../authentication/FirebaseConfig";
import SimpleSnackbar from "../common/SimpleSnackbar";
import CustomSnackbar from "../common/SimpleSnackbar";

class Signin extends Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = event => {
    let { email, password } = this.state;
    let signinRef = firebase.auth().signInWithEmailAndPassword(email, password);

    signinRef.catch(error => {
      console.log(error);
    });

    signinRef.then(() => {
      this.props.history.push("/dashboard");
    });
    // firebase.firestore().doc("jfjd").
  };

  siginInWithGoogle = () => {
    firebase
      .firestore()
      .collection("/test")
      .add({ data: "asshole" });
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    provider.addScope("https://www.googleapis.com/auth/plus.me");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        var token = result.credential.accessToken;
        var user = result.user;
        this.props.history.push("/dashboard");
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  };

  handleChange = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    let { email, password } = this.state;
    return (
      <Fragment>
        <div className="signin__bg w-100 h-100vh" />
        <div className="signin flex flex-middle flex-center w-100 h-100vh">
          <Card className="signin__card px-48 py-24 relative">
            <div className="w-100 text-center">
              <Icon color="secondary" style={{ fontSize: "4rem" }}>
                cloud
              </Icon>
            </div>
            <h2 className="w-100 text-center mb-32">Sign In</h2>
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
              onError={errors => null}
            >
              <TextValidator
                className="my-8 w-100"
                label="Email"
                onChange={this.handleChange}
                name="email"
                multiline
                value={email}
                validators={["required", "isEmail"]}
                errorMessages={["This field is required", "Email is not valid"]}
                variant="outlined"
              />
              <TextValidator
                className="my-8 mb-16 w-100"
                label="Password"
                onChange={this.handleChange}
                type="password"
                name="password"
                value={password}
                validators={["required"]}
                errorMessages={["This field is required"]}
                variant="outlined"
              />

              <Button
                className="x-center"
                variant="contained"
                type="submit"
                color="secondary"
              >
                <Icon className="mr-8">near_me</Icon>Sign In
              </Button>
              {/* <Fab color="primary" type="submit">
              <Icon>send</Icon>
            </Fab> */}
            </ValidatorForm>

            <Divider className="my-12" variant="middle" />
            <Button
              onClick={this.siginInWithGoogle}
              className=" x-center"
              variant="contained"
              color="primary"
            >
              Sign In with Google
            </Button>
          </Card>
        </div>

        <SimpleSnackbar />
      </Fragment>
    );
  }
}

export default Signin;
