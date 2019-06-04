import React, { Component } from "react";
import { Card, IconButton, Icon } from "@material-ui/core";

class Tracks extends Component {
  state = {};
  render() {
    return (
      <div className="container my-16">
        {[1, 3].map(data => (
          <Card className="track-card flex flex-middle flex-space-between p-16">
            <div className="flex">
              <div className="mr-16 h-100">
                <img src="/assets/images/bg-1.jpg" alt="fsdf" />
              </div>
              <div className="flex-column flex-space-between">
                <p className="m-0">
                  <strong>[Visit Doridro.net Tomra Ja Bolo Ta</strong>
                  <br />
                  <span className="pt-8 text-muted">Shah Ali Hridoy</span>
                </p>
                <div className="text-muted flex flex-middle">
                  <Icon fontSize="small">favorite</Icon>
                  <span className="pr-8">2</span>
                  <Icon fontSize="small">message</Icon>
                  <span>1</span>
                </div>
              </div>
            </div>
            <div className="track-options">
              <IconButton fontSize="small">
                <Icon fontSize="small">favorite</Icon>
              </IconButton>
              <IconButton fontSize="small">
                <Icon fontSize="small">edit</Icon>
              </IconButton>
              <IconButton fontSize="small">
                <Icon fontSize="small">delete</Icon>
              </IconButton>
              <IconButton fontSize="small">
                <Icon fontSize="small">more_hor</Icon>
              </IconButton>
            </div>
            <div>9th may 2019</div>
          </Card>
        ))}
      </div>
    );
  }
}

export default Tracks;
