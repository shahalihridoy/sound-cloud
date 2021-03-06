import React, { Component, Fragment } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Fab,
  Icon,
  MenuItem,
  Button,
  Divider,
  LinearProgress
} from "@material-ui/core";
import { Card } from "@material-ui/core";
import SimpleSnackbar from "../common/SimpleSnackbar";
import firebase from "../authentication/FirebaseConfig";

class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    loading: false,
    snackbar: {
      open: false,
      message: ""
    }
  };

  genderList = [
    {
      value: "male",
      label: "Male"
    },
    {
      value: "female",
      label: "Female"
    },
    {
      value: "other",
      label: "Other"
    }
  ];

  handleSubmit = event => {
    let userData = this.state;
    this.setState({ loading: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then(({ user }) => {
        delete userData.snackbar;
        delete userData.loading;
        localStorage.setItem("user", "true");
        firebase
          .firestore()
          .collection("/users")
          .doc(user.uid)
          .set(userData)
          .then(() => {
            localStorage.setItem("user", "true");
            localStorage.setItem("uid", user.uid);
            this.props.history.push("/dashboard");
          });
      })
      .catch(error => {
        this.setState({
          loading: false,
          snackbar: {
            open: true,
            message: error.message
          }
        });
      });
  };

  handleChange = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({
      snackbar: {
        open: false
      }
    });
  };

  siginInWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    provider.addScope("https://www.googleapis.com/auth/plus.me");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(({ user }) => {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .set({
            email: user.email,
            username: user.displayName
          })
          .then(() => {
            localStorage.setItem("user", "true");
            localStorage.setItem("uid", user.uid);
            this.props.history.push("/dashboard/upload");
          });
      })
      .catch(error => {});
  };

  render() {
    let {
      username,
      email,
      password,
      age,
      gender,
      snackbar,
      loading
    } = this.state;
    return (
      <Fragment>
        <div className="signin__bg w-100 h-100vh" />
        <div className="signin flex flex-middle flex-center w-100 h-100vh">
          <Card className="signup__card relative">
            {loading && (
              <LinearProgress color="primary" variant="indeterminate" />
            )}
            <div className="pb-24 pt-16 px-48">
              <div className="w-100 text-center">
                <Icon color="secondary" style={{ fontSize: "4rem" }}>
                  cloud
                </Icon>
              </div>
              <h2 className="w-100 text-center mb-32">Create Account</h2>
              <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => null}
              >
                <TextValidator
                  className="mb-8 w-100"
                  label="Name"
                  onChange={this.handleChange}
                  name="username"
                  value={username}
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  variant="outlined"
                />
                <TextValidator
                  className="my-8 w-100"
                  label="Email"
                  onChange={this.handleChange}
                  name="email"
                  value={email}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "This field is required",
                    "Email is not valid"
                  ]}
                  variant="outlined"
                />
                <TextValidator
                  className="my-8 w-100"
                  label="Password"
                  onChange={this.handleChange}
                  type="password"
                  name="password"
                  value={password}
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  variant="outlined"
                />
                <TextValidator
                  className="my-8 w-100"
                  label="Age"
                  onChange={this.handleChange}
                  name="age"
                  value={age}
                  type="number"
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  variant="outlined"
                />
                <TextValidator
                  className="my-8 mb-16 w-100"
                  label="Gender"
                  onChange={this.handleChange}
                  name="gender"
                  select
                  value={gender}
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  variant="outlined"
                >
                  {this.genderList.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextValidator>
                <Button
                  className="x-center capitalize"
                  variant="contained"
                  type="submit"
                  color="secondary"
                  disabled={loading}
                >
                  <Icon className="mr-8">near_me</Icon>Submit
                </Button>
                {/* <Fab color="primary" type="submit">
              <Icon>send</Icon>
            </Fab> */}
              </ValidatorForm>

              <Divider className="my-12" variant="middle" />
              <div className="flex flex-center">
                <Button
                  onClick={this.siginInWithGoogle}
                  className="capitalize"
                  variant="contained"
                  color="primary"
                >
                  Sign In with Google
                </Button>
                <Button
                  onClick={() => {
                    this.props.history.push("/signin");
                  }}
                  className="capitalize ml-16"
                  variant="contained"
                  color="secondary"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <SimpleSnackbar
          open={snackbar.open}
          message={snackbar.message}
          handleClose={this.handleClose}
        />
      </Fragment>
    );
  }
}

export default Signup;
