import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";

import { Icon } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
}));

const SimpleSnackbar = props => {
  const classes = useStyles();
  let { handleClose, open, message } = props;
  // const [open, openSnackbar] = React.useState(true);

  // const handleClose = () => {
  //   openSnackbar(false);
  // };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={<span id="message-id">{message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={handleClose}
        >
          <Icon>close</Icon>
        </IconButton>
      ]}
    />
  );
};

export default SimpleSnackbar;
