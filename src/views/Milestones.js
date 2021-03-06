import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { getAllProjects } from "../redux/actions/projects/Actions";
// Theme components
import Card from "../components/theme/Card/Card";
import Button from "../components/theme/CustomButtons/Button.jsx";
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx";
import CardIcon from "../components/theme/Card/CardIcon.jsx";
import GridItem from "../components/theme/Grid/GridItem.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import CardFooter from "../components/theme/Card/CardFooter.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
// Material UI
import Timeline from "@material-ui/icons/Timeline";
import withStyles from "@material-ui/core/styles/withStyles";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
// Components
import MilestonesTable from "../components/milestone/MilestonesTable";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
// Styles
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Cookies from "universal-cookie";

class Milestones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      successMessage: ""
    };
  }

  componentDidMount = () => {
    const cookies = new Cookies();
    var token = cookies.get("token");
    this.props.getAllProjects(token);

    // To prevent error message frmo notification bar
    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }

    // If redirected from create project display Success message
    if (
      this.props.location.state
        ? this.props.location.state.successMessage ||
          this.props.location.state.errorMessage
        : null
    ) {
      this.setState({
        successMessage: this.props.location.state.successMessage,
        errorMessage: this.props.location.state.errorMessage
      });
      this.showNotification("tr");
    }
  };

  // Display notification
  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      6000
    );
  }

  createNewMilestone = () => {
    this.props.history.push("/home/create-milestone");
  };

  render() {
    const milestones = this.props.milestones.flatMap(milestone => milestone);
    const {isFetching } = this.props
    return (
      <GridContainer>
        {this.state.errorMessage ? (
          <Snackbar
            place="tr"
            color="danger"
            icon={CheckCircleOutline}
            message={this.state.errorMessage}
            open={this.state.tr}
            closeNotification={() => this.setState({ tr: false })}
            close
          />
        ) : (
          <Snackbar
            place="tr"
            color="success"
            icon={CheckCircleOutline}
            message={this.state.successMessage}
            open={this.state.tr}
            closeNotification={() => this.setState({ tr: false })}
            close
          />
        )}

      {isFetching ? (
          <LoadingSpinner text={'Fetching Milestones'}/>
              ) : (
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader>
              <CardIcon color="warning" style={{ display: "flex" }}>
                <Timeline style={{ color: "white", marginRight: "10px" }} />
                <h4 className={this.props.classes.cardTitleWhite}>
                  Milestones
                </h4>
              </CardIcon>
            </CardHeader>
            <CardBody>
                <MilestonesTable
                  milestones={milestones ? milestones : null}
                  classes={this.props.classes}
                />
              <CardFooter style={{ justifyContent: "flex-end" }}>
                <Button
                  color="warning"
                  onClick={this.createNewMilestone.bind(this)}
                  >
                  Create new Milestone
                </Button>
              </CardFooter>
            </CardBody>
          </Card>
        </GridItem>
        )}
      </GridContainer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { getAllProjects: (token, id) => dispatch(getAllProjects(token, id)) };
};
const mapStateToProps = state => ({
  milestones: state.project.milestones,
  isFetching: state.project.isFetching
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(dashboardStyle)(Milestones))
);
