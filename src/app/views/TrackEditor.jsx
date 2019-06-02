import React, { Component } from "react";
import { Card, LinearProgress, Divider, Button } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import BasicInfo from "./BasicInfo";
import Metadata from "./Metadata";

class TrackEditor extends Component {
  state = {
    value: 0,
    title: "",
    genre: "",
    tag: "",
    description: "",
    permission: "public",
    license: "All rights reserved"
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleInputChange = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFormSubmit = () => {};

  componentWillMount() {
    this.setState({ title: this.props.file.name });
  }

  render() {
    let { value } = this.state;
    let { file, handleCancel } = this.props;
    return (
      <Card className="my-16">
        <div className="flex flex-space-between light-gray py-12 px-16">
          <span>{file.name}</span>
          <span>
            0.23MB of {(file.size / 1024 / 1024).toFixed(2)}MB uploaded
          </span>
        </div>
        <LinearProgress color="primary" variant="determinate" value={70} />
        <div className="p-16 relative">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="standard"
          >
            <Tab className="capitalize" label="basic info" />
            <Tab className="capitalize" label="metadata" />
            <Tab className="capitalize" label="permissions" />
          </Tabs>
          <Divider />
          <SwipeableViews index={value}>
            <BasicInfo
              fileName={file.name}
              state={{
                ...this.state,
                handleInputChange: this.handleInputChange,
                handleSubmit: this.handleFormSubmit,
                handleCancel: handleCancel
              }}
            />
            <Metadata
              fileName={file.name}
              state={{
                ...this.state,
                handleInputChange: this.handleInputChange,
                handleSubmit: this.handleFormSubmit,
                handleCancel: handleCancel
              }}
            />
            <div>Item Three</div>
          </SwipeableViews>
        </div>
      </Card>
    );
  }
}

export default TrackEditor;
