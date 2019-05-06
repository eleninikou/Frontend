import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { getAllProjects } from "../redux/actions/projects/Actions";
// Theme components
import Card from "../components/theme/Card/Card";
import Button from "../components/theme/CustomButtons/Button.jsx";
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx";
import GridItem from "../components/theme/Grid/GridItem.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import CardIcon from "../components/theme/Card/CardIcon.jsx";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import CardFooter from "../components/theme/Card/CardFooter.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
// Material UI components
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// Icons
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
// Components
import ProjectsTable from "../components/project/ProjectsTable";
import DashboardSpinner from "../components/spinner/DashboardSpinner";
// Styles
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Cookies from "universal-cookie";
import "../assets/css/main.css";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: "",
      errorMessage: "",
      active: ""
    };
  }

  componentDidMount = () => {
    const cookies = new Cookies();
    var token = cookies.get("token");
    this.props.getAllProjects(token);

    // To prevent errormessage from notification bar
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

  // Show notification
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

  createNewProject() {
    this.props.history.push("/home/create-project/");
  }

  handleChange = event => {
    this.setState({ active: event.target.value });
  };

  render() {
    // https://reactgo.com/removeduplicateobjects/
    function getUnique(arr, comp) {
      const unique = arr
        .map(e => e[comp])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => arr[e])
        .map(e => arr[e]);
      return unique;
    }
    let projects = getUnique(this.props.allProjects, "project_id");

    // Filter projects
    const filtredProjects =
      this.state.active === "0"
        ? projects.filter(project => {
            return project.project.active === 0;
          })
        : this.state.active === "1"
        ? projects.filter(project => {
            return project.project.active === 1;
          })
        : projects;

    const { errorMessage, successMessage } = this.state;

    return (
      <GridContainer>
        {this.state.errorMessage ? (
          <Snackbar
            place="tr"
            color="danger"
            icon={CheckCircleOutline}
            message={errorMessage}
            open={this.state.tr}
            closeNotification={() => this.setState({ tr: false })}
            close
          />
        ) : (
          <Snackbar
            place="tr"
            color="success"
            icon={CheckCircleOutline}
            message={successMessage}
            open={this.state.tr}
            closeNotification={() => this.setState({ tr: false })}
            close
          />
        )}
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer>
            <Card>
              <CardHeader
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  <CardIcon color="success" style={{ display: "flex" }}>
                    <LibraryBooks
                      style={{ color: "white", marginRight: "10px" }}
                    />
                    <h4 className={this.props.classes.cardTitleWhite}>
                      Projects
                    </h4>
                  </CardIcon>
                </div>
                <div>
                  <FormControl
                    component="fieldset"
                    className={this.props.classes.formControl}
                  >
                    <RadioGroup
                      aria-label="active"
                      name="active"
                      className={this.props.classes.group}
                      value={this.state.active}
                      onChange={this.handleChange}
                      style={{ flexDirection: "row" }}
                    >
                      <FormControlLabel
                        value=""
                        control={<Radio />}
                        label="All"
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Active"
                      />
                      <FormControlLabel
                        value="0"
                        control={<Radio />}
                        label="Inactive"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </CardHeader>
              <CardBody>
                {this.props.isFetching ? (
                  <div style={{ width: "100%", textAlign: "center" }}>
                    <DashboardSpinner />
                  </div>
                ) : (
                  <div>
                    <ProjectsTable
                      projects={filtredProjects}
                      isFetching={this.props.isFetching}
                      classes={this.props.classes}
                    />
                  </div>
                )}
                <CardFooter style={{ justifyContent: "flex-end" }}>
                  <Button
                    color="success"
                    onClick={this.createNewProject.bind(this)}
                  >
                    Create new Project
                  </Button>
                </CardFooter>
              </CardBody>
            </Card>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { getAllProjects: token => dispatch(getAllProjects(token)) };
};

const mapStateToProps = state => ({
  allProjects: state.project.allProjects,
  isFetching: state.project.isFetching
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(dashboardStyle)(Projects))
);
