import { createMuiTheme } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";

export const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "rgb(29, 191, 115)",
      contrastText: "#ffffff"
    }
  },
  status: {
    // My business variables
    danger: red[500]
  }
});
