import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// Redux
import {
  getProjectsByUser,
  getProject,
  getRoles,
  getTeam,
  invite,
  getInvitations
} from "../redux/actions/projects/Actions";
import { connect } from "react-redux";
// Theme componets
import Card from "../components/theme/Card/Card";
import Table from "../components/theme/Table/Table.jsx";
import Button from "../components/theme/CustomButtons/Button.jsx";
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import CardIcon from "../components/theme/Card/CardIcon.jsx";
import GridItem from "../components/theme/Grid/GridItem.jsx";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import CardFooter from "../components/theme/Card/CardFooter.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
// Material UI components
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
// Components
import StyledSpinner from "../components/spinner/Spinner";
//Icons
import People from "@material-ui/icons/People";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
// Styles
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Cookies from "universal-cookie";

class Invite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_name: "",
      project_role: "",
      project_id: "",
      email: "",
      invitations: [],
      team: "",
      page: 0,
      rowsPerPage: 5,
      backToProject: false,
      isFetching: false,
      hasError: false,
      token: ''
    };
  }

  componentDidMount = () => {
    const cookies = new Cookies();
    var token = cookies.get("token");
    this.setState({ token })

    this.props.getRoles(token);

    // If redirected from a specific project
    if (this.props.match.params.id) {
      this.props.getProject(this.props.match.params.id, token)
      .then(res => {
        if (res.project) {
          this.setState({
            project_id: this.props.project.id,
            team: this.props.team,
            backToProject: true,
            invitations: res.invites
          });
        }
      });
      this.props.getInvitations(this.props.match.params.id, token)
      .then(() => {
        this.setState({ invitations: this.props.invitations });
      });
    } else {
      // From dashboard. Get all projects
      this.props.getProjectsByUser(token)
  
    }
  };

  submit = event => {
    event.preventDefault();

    if (this.state.email && this.state.project_id && this.state.project_role) {
      const invitation = {
        email: this.state.email,
        project_id: this.state.project_id,
        project_role: this.state.project_role
      };

      this.props.invite(invitation, this.state.token)
      .then(res => {
        if (res.message) {
          this.showNotification("tr");
        
          this.props.getInvitations(this.state.project_id, this.state.token)
          .then(res => {
            this.setState({ invitations: res.invitations });
          });
        }
      });
    } else { this.setState({ hasError: true }) }
  };

  goBack = () => {
    this.props.history.push({
      pathname: `/home/project/${this.state.project_id}`
    });
  };

  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);

    this.alertTimeout = setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      4000
    );
  }

  handleChange = event => {
    if (event.target.value == "create") {
      this.props.history.push({ pathname: `/home/create-project` });
    }
    this.setState({ [event.target.name]: event.target.value });

    // Get team and invited emails when selecting projects
    if ([event.target.name] == "project_id") {
      this.props.getTeam(event.target.value, this.state.token)
      .then(res => {
        this.setState({ team: res.team });
      });

      this.props.getInvitations(event.target.value, this.state.token)
      .then(res => {
        this.setState({ invitations: res.invitations });
      });
    }
  };

  render() {
    const { classes, projects, project, roles, successMessage, isFetching } = this.props;
    const { page, team, backToProject, hasError, invitations } = this.state;

    function getUnique(arr, comp) {
      const unique = arr
        .map(e => e[comp])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => arr[e])
        .map(e => arr[e]);
      return unique;
    }

    let yourProjects = projects ? projects.projects ? getUnique(projects.projects, "id") : null : null;

    console.log(invitations)
    return (
      <GridContainer>
        <Snackbar
          place="tr"
          color="success"
          icon={CheckCircleOutline}
          message={successMessage}
          open={this.state.tr}
          closeNotification={() => this.setState({ tr: false })}
          close
        />
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <form className={classes.form} onSubmit={this.submit}>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}> Invite people to join project </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={6} sm={6} md={6}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <FormControl className={classes.formControl}>
                          {hasError && !this.state.project_id && ( <FormHelperText id="project_id"> Please select project! </FormHelperText>)}
                            <TextField
                              select
                              error={ hasError && !this.state.project_id ? true : false }
                              disabled={backToProject ? true : false}
                              label="Project"
                              margin="normal"
                              value={this.state.project_id}
                              onChange={this.handleChange}
                              inputProps={{ name: "project_id", id: "project_id" }}
                            >
                            {project ? 
                              <MenuItem defaultValue key={project.id} value={project.id}>
                                {project.name}
                              </MenuItem>
                            :
                            this.props.match.params.id && !project ? (
                              <MenuItem defaultValue key={""} value={"create"}>
                                You need to create a project first
                              </MenuItem>
                            ) : null}

                            {!project && yourProjects
                              ? yourProjects.map(project => {
                                  return (
                                    <MenuItem key={project.id} value={project.id}>
                                      {project.name}
                                    </MenuItem>
                                  );
                                })
                              : null}
                            </TextField>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <FormControl className={classes.formControl}>
                          {hasError && !this.state.project_role && (<FormHelperText id="project_role"> Please select role in the project! </FormHelperText> )}
                            <TextField
                              disabled={this.state.project_id ? false : true}
                              select
                              error={ hasError && !this.state.project_role ? true : false }
                              label="Role"
                              margin="normal"
                              value={this.state.project_role}
                              onChange={this.handleChange}
                              inputProps={{ name: "project_role", id: "project_role" }}
                            >
                            {roles
                              ? roles.map(role => {
                                  return (
                                    <MenuItem key={role.id} value={role.id}>
                                      {role.role}
                                    </MenuItem>
                                  );
                                })
                              : null}
                            </TextField>
                          </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <FormControl className={classes.formControl}>
                            {hasError && !this.state.email && (
                              <FormHelperText id="project_role">
                                Please fill in email!
                              </FormHelperText>
                            )}
                            <TextField
                              disabled={this.state.project_id ? false : true}
                              type="email"
                              label="Email"
                              error={hasError && !this.state.email ? true : false}
                              id="email"
                              onChange={this.handleChange}
                              name="email"
                              fullWidth
                            />
                          </FormControl>
                         </GridItem>
                        </GridContainer>
                      </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                    <Card>
                      <CardHeader>
                        <CardIcon color="info" style={{ display: "flex" }}>
                          <People style={{ color: 'white'}}/>
                        </CardIcon>
                      </CardHeader>
                      <CardBody>
                        {team ? (
                          <Table
                            page={page}
                            rowsPerPage={team.length}
                            emptyRows={0}
                            tableHeaderColor="info"
                            tableHead={["Name", "Role"]}
                            tableData={[
                              team
                                ? team.map(user => {
                                    return [
                                      `${user.user ? user.user.name : null}`,
                                      `${user.role ? user.role.role : "Admin"}`
                                    ];
                                  })
                                : null
                            ]}
                          />
                          ) : null}
                          <div style={{ margin: "20px", textAlign: "center" }}>
                            {isFetching ? <StyledSpinner /> : null}
                          </div>
                          {invitations ? (
                            invitations.length && !isFetching ? (
                              <Table
                                page={page}
                                rowsPerPage={invitations.length}
                                emptyRows={0}
                                tableHeaderColor="info"
                                tableHead={["Invited"]}
                                tableData={[ invitations ? invitations.map(invitation => { return [`${invitation.email}`] }) : null ]}
                              />
                            ) : null
                          ) : null}
                       </CardBody>
                      </Card>
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter style={{ justifyContent: "flex-end" }}>
                  <Button type="submit" color="info"  disabled={hasError ? true : false} >
                    Invite
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
          {backToProject ? (
          <GridItem xs={12} sm={12} md={8} style={{ textAlign: 'center'}}>
            <Button color="info" style={{ margin: "auto" }} onClick={this.goBack.bind(this)}>
              Back to project
            </Button>
          </GridItem>
        ) : null}
      </GridContainer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProjectsByUser: token => dispatch(getProjectsByUser(token)),
    getProject: (id, token) => dispatch(getProject(id, token)),
    getRoles: (token) => dispatch(getRoles(token)),
    getTeam: (id, token) => dispatch(getTeam(id, token)),
    invite: (invitation, token) => dispatch(invite(invitation, token)),
    getInvitations: (id, token ) => dispatch(getInvitations(id, token))
  };
};

const mapStateToProps = state => ({
  project: state.project.project,
  projects: state.project.projects,
  team: state.project.team,
  isFetching: state.project.isFetching,
  roles: state.project.roles,
  successMessage: state.project.successMessage,
  emails: state.project.emails
});

export default withRouter(connect( mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Invite)));
