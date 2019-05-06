import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const StyledSpinner = withStyles({
  colorPrimary: {
    color: "#26c6da"
  }
})(CircularProgress);

export default StyledSpinner;
