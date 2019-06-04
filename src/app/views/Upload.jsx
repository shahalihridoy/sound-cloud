import React, { Component } from "react";
import { Button, Icon, Card } from "@material-ui/core";
import TrackEditor from "./TrackEditor";

class Upload extends Component {
  timer;
  state = {
    elevation: 2,
    files: []
  };

  heldleAudioSelection = event => {
    event.persist();
    this.setState({
      fileNumber: event.target.files.length,
      files: [...event.target.files]
    });
    return false;
  };
  handleDragOver = event => {
    event.preventDefault();
  };
  handleDrop = event => {
    event.preventDefault();
    event.persist();
    for (const iterator of event.dataTransfer.files) {
      console.log(iterator);
    }
    this.setState({
      elevation: 1,
      fileNumber: event.dataTransfer.files.length,
      files: [...event.dataTransfer.files]
    });
    return false;
  };

  handleDragStart = event => {
    this.setState({ elevation: 10 });
  };

  handleCancel = file => {
    let files = this.state.files.filter(f => file !== f);
    this.setState({ files: [...files] });
  };

  componentDidUpdate() {
    window.scrollTo({ behavior: "smooth" });
    window.scrollTo(0, 600);
  }

  render() {
    let { elevation, files } = this.state;
    return (
      <div className="upload container my-16">
        <Card
          elevation={elevation}
          className={
            elevation > 2
              ? "flex-column flex-center text-center h-500 w-100 dotted-border"
              : "flex-column flex-center text-center h-500 w-100"
          }
          onDragEnter={this.handleDragStart}
          onDragOver={this.handleDragOver}
          onDrop={this.handleDrop}
        >
          <div>
            {files.length ? (
              <h2>Uploading {files.length} file...</h2>
            ) : (
              <h2>Drop your files here...</h2>
            )}
            <label htmlFor="upload-file">
              <Button
                className="mt-16"
                variant="contained"
                color="secondary"
                component="span"
              >
                <Icon className="pr-8">cloud_upload</Icon> Upload
              </Button>
            </label>
          </div>
        </Card>
        <input
          accept="audio/*"
          onChange={this.heldleAudioSelection}
          id="upload-file"
          type="file"
          multiple
        />
        {files.map((file, index) => (
          <TrackEditor
            key={index}
            handleCancel={() => this.handleCancel(file)}
            file={file}
          />
        ))}
      </div>
    );
  }
}

export default Upload;
