import React, { Component } from "react";
import "../styles/app.scss";
import Signup from "./views/SignUp";
import Signin from "./views/SignIn";
import Dashboard from "./Dashboard";
import Home from "./views/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";

class App extends Component {
  componentDidMount() {
    // firebase.auth().onAuthStateChanged(user => {
    //   user
    //     ? localStorage.setItem("user", "true")
    //     : localStorage.removeItem("user");
    // });
  }
  render() {
    let authenticated = localStorage.getItem("user");
    return (
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
    );
  }
}

export default App;
