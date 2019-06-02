import firebase from "../authentication/FirebaseConfig";
import React, { Component, Fragment } from "react";

class LoadContent extends Component {
  state = {
    authenticated: false
  };

  componentWillMount() {
    // firebase.auth().onAuthStateChanged(user => {
    //   user
    //     ? this.setState({ authenticated: true })
    //     : this.setState({ authenticated: false });
    // });
  }
  componentDidMount() {}

  render() {
    return (
      <Fragment>
        {this.props.children({
          ...this.props,
          ...this.state
        })}
      </Fragment>
    );
  }
}

export default LoadContent;
