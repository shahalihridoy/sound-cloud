import React, { Fragment } from "react";
import { Button, Icon } from "@material-ui/core";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Fragment>
      {/* home topbar */}
      <div className="home__topbar flex flex-middle flex-space-between w-100 py-12">
        <div className="flex flex-middle text-white pl-16">
          <Icon style={{ fontSize: "2rem" }} className="mr-16">
            cloud
          </Icon>
          <span style={{ fontSize: "1.25rem", fontWeight: "500" }}>
            Limelight
          </span>
        </div>
        <div className="pr-16">
          <Link to="/signin" className="mx-8">
            <Button variant="outlined" color="secondary">
              Sign In
            </Button>
          </Link>
          <Link to="/signup" className="mx-8">
            <Button variant="contained" color="secondary">
              Create Account
            </Button>
          </Link>
        </div>
      </div>

      {/* banner */}
      <div className="home__banner text-center relative w-100">
        <div className="home__banner__details">
          <h2 className="m-0">Connect on Sound Cloud</h2>
          <p className="my-0 py-16">
            Discover, stream, and share a constantly expanding mix of music from
            emerging and major artists around the world.
          </p>
          <Link to="/signup">
            <Button size="large" variant="contained" color="secondary">
              Sign Up for Free
            </Button>
          </Link>
        </div>
      </div>

      {/* search option */}
      <div className="flex flex-middle py-32 flex-center w-100">
        <div className="home__search-box light-gray px-16">
          <input className="py-12" type="text" />
          <Icon className="text-middle pointer">search</Icon>
        </div>
        <span className="px-16">or</span>
        <Button color="secondary" variant="contained" size="large">
          Upload your own
        </Button>
      </div>
    </Fragment>
  );
};

export default Home;
