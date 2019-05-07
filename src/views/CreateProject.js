import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { projectCreate } from "../redux/actions/projects/Actions";
// Theme components
import Card from "../components/theme/Card/Card";
import Button from "../components/theme/CustomButtons/Button.jsx";
import GridItem from "../components/theme/Grid/GridItem.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import CardFooter from "../components/theme/Card/CardFooter.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
// Material UI components
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
// Styles
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Cookies from "universal-cookie";

class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      description: null,
      tr: false,
      hasError: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  submit = event => {
    const cookies = new Cookies();
    var token = cookies.get("token");
    event.preventDefault();

    // Error if not filled in
    if (this.state.name && this.state.description) {
      const project = {
        name: this.state.name,
        description: this.state.description
      };

      this.props.projectCreate(project, token).then(res => {
        if (!res.error) {
          if (this.props.successMessage) {
            this.props.history.push({
              pathname: "/home/projects",
              state: { successMessage: this.props.successMessage }
            });
          }
        }
      });
    } else {
      this.setState({ hasError: true });
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { classes } = this.props;
    const { hasError, name, description } = this.state;

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Create new project</h4>
            </CardHeader>
            <form className={classes.form} onSubmit={this.submit}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={8} style={{ margin: "auto" }}>
                  <CardBody>
                    <GridContainer style={{ padding: "30px" }}>
                      <GridItem xs={12} sm={12} md={12}>
                        <FormControl className={classes.formControl}>
                          {hasError && !name && (
                            <FormHelperText id="name">
                              Please select name!
                            </FormHelperText>
                          )}
                          <TextField
                            error={hasError && !this.state.name ? true : false}
                            name="name"
                            type="text"
                            label="Name"
                            value={name}
                            onChange={this.handleChange}
                            fullWidth
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <FormControl className={classes.formControl}>
                          {hasError && !description && (
                            <FormHelperText id="description">
                              Please write a description!
                            </FormHelperText>
                          )}
                          <TextField
                            error={hasError && !description ? true : false}
                            name="description"
                            type="text"
                            label="Description"
                            value={description}
                            onChange={this.handleChange}
                            multiline
                            fullWidth
                          />
                        </FormControl>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </GridItem>
              </GridContainer>
              <CardFooter style={{ justifyContent: "flex-end" }}>
                <Button color="success" type="submit">
                  Create Project
                </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    projectCreate: (project, token) => dispatch(projectCreate(project, token))
  };
};

const mapStateToProps = state => ({
  successMessage: state.project.successMessage
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(dashboardStyle)(CreateProject))
);
