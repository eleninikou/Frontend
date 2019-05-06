import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoginSpinner = withStyles({
  colorPrimary: {
    color: "#66bb6a"
  }
})(CircularProgress);

export default LoginSpinner;
