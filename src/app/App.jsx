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

export const Context = React.createContext();

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
            localStorage.setItem("uid",user.uid);
            this.setState({ username: doc.data().username, uid: user.uid });
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
        <Router>
          <Switch>
            <AuthenticatedRoute
              component={Dashboard}
              authenticated={authenticated}
              path="/dashboard"
            />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route
              exact
              path="/"
              render={props =>
                authenticated ? <Redirect to="/dashboard" /> : <Home />
              }
            />
          </Switch>
        </Router>
      </Context.Provider>
    );
  }
}

export default App;
