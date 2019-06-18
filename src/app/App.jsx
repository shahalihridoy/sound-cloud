import React, { Component } from "react";
import Signup from "./views/SignUp";
import Signin from "./views/SignIn";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";
import firebase from "./authentication/FirebaseConfig";
import "../styles/app.scss";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./common/Theme";
import Pricing from "./views/Pricing";
import { Context } from "./common/Context";

class App extends Component {
  state = {
    snackbar: {
      open: false,
      message: ""
    }
  };

  openSnackbar = message => {
    this.setState({
      snackbar: {
        open: true,
        message: message
      }
    });
  };

  handleSnackbarClose = () => {
    this.setState({
      snackbar: {
        open: false
      }
    });
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
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("uid");
      }
    });
  }

  render() {
    let authenticated = localStorage.getItem("user");
    let { open, message } = this.state;
    return (
      <Context.Provider
        value={{
          ...this.state,
          handleSnackbarClose: this.handleSnackbarClose,
          openSnackbar: this.openSnackbar
        }}
      >
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <AuthenticatedRoute
                component={Dashboard}
                authenticated={authenticated}
                path="/dashboard"
              />
              <Route path="/signup" component={Signup} />
              <Route path="/signin" component={Signin} />
              <Route path="/pricing" component={Pricing} />
              <Route
                exact
                path="/"
                render={props =>
                  authenticated ? <Redirect to="/dashboard" /> : <Home />
                }
              />
            </Switch>
          </Router>
        </ThemeProvider>
      </Context.Provider>
    );
  }
}

export default App;
