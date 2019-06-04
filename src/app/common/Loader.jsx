import React from "react";
import "./_loader.scss";

const Loader = () => {
  return (
    <div id="root">
      <div className="app-loader">
        <div className="spinner">
          <div
            className="double-bounce1 mat-bg-primary"
            style={{ background: "#fcc02e" }}
          />
          <div
            className="double-bounce2 mat-bg-accent"
            style={{ background: "#03a9f4" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
