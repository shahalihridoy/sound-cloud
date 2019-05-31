import React, { Component } from "react";
import { Button, Icon } from "@material-ui/core";

class Upload extends Component {
  state = {};
  handleDrag = event => {
    event.persist();
    for (const iterator of event.target.files) {
      console.log(iterator.name);
    }
    return false;
  };
  handleDragOver = event => {
    event.preventDefault();
    return false;
  };
  handleDrop = event => {
    event.preventDefault();
    event.persist();
    // console.log(event.dataTransfer.files);
    console.log("dropped");
    return false;
  };

  handleDragStart = event => {
    console.log("drag started");
  };

  render() {
    return (
      <div className="upload relative">
        <label
          id="test"
          htmlFor="upload-file"
          onDragEnter={this.handleDragStart}
          onDragOver={this.handleDragOver}
          onDrop={this.handleDrop}
        >
          <div className="label text-center h-100 w-100 pointer">
            <Button
              className="upload__button"
              variant="contained"
              color="secondary"
              component="span"
            >
              <Icon className="pr-8">cloud_upload</Icon> Upload
            </Button>
          </div>
        </label>
        <input
          onChange={this.handleDrag}
          id="upload-file"
          type="file"
          multiple
        />
      </div>
    );
  }
}

export default Upload;
