import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const DashboardSpinner = withStyles({
  colorPrimary: {
      color: '#D4D4D4'
  },
})(CircularProgress);

export default DashboardSpinner;
