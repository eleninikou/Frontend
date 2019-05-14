import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoginSpinner = withStyles({
  colorPrimary: {
    color: "#d81b60"
  }
})(CircularProgress);

export default LoginSpinner;
