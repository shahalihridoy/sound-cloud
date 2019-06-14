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
    username: "",
    uid: ""
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then(doc => {
            localStorage.setItem("user", "true");
            localStorage.setItem("uid", user.uid);
            this.setState({ ...doc.data() });
          });
      } else {
        localStorage.removeItem("user");
      }
    });
  }

  render() {
    let authenticated = localStorage.getItem("user");
    return (
      <Context.Provider value={{ ...this.state }}>
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
