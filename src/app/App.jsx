import React, { Component } from "react";
import "../styles/app.scss";
import Signup from "./views/SignUp";
import Signin from "./views/SignIn";
import Dashboard from "./Dashboard";
import Home from "./views/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";

export const AppContext = React.createContext();

class App extends Component {
  state = {
    user: null,
    authenticated: true
  };

  updateState = (user, authenticated) => {
    this.setState({
      user,
      authenticated
    });
  };

  render() {
    let { authenticated } = this.state;
    return (
      <AppContext.Provider
        value={{ ...this.state, updateState: this.updateState }}
      >
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
              render={props => (authenticated ? <Dashboard /> : <Home />)}
            />
          </Switch>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;
