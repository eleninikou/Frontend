import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
// Redux
import { getProjectsByUser, getProject, getRoles, getTeam, invite, getEmails } from '../redux/actions/projects/Actions'
import { connect } from 'react-redux'
// Theme componets
import GridItem from "../components/theme/Grid/GridItem.jsx"
import GridContainer from "../components/theme/Grid/GridContainer.jsx"
import Card from "../components/theme/Card/Card"
import CardHeader from "../components/theme/Card/CardHeader.jsx"
import CardBody from "../components/theme/Card/CardBody.jsx"
import Button from "../components/theme/CustomButtons/Button.jsx"
import CardFooter from "../components/theme/Card/CardFooter.jsx"
import Table from "../components/theme/Table/Table.jsx"
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx"
// Material UI components
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import CircularProgress from '@material-ui/core/CircularProgress';

//Icons
import People from "@material-ui/icons/People"
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline"

// Styles
import withStyles from "@material-ui/core/styles/withStyles"
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx"
import '../assets/css/main.css'


class Invite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_name: '',
      project_role: '',
      project_id: '',
      email: '',
      emails: [],
      team: '',
      page: 0,
      rowsPerPage: 5,
      backToProject: false,
      isFetching: false
    }
  }

  componentWillMount = () => {
    // From invite to specific project
    if(this.props.match.params.id) {
      this.props.getProject(this.props.match.params.id)
      .then(() => {  
        this.setState({ 
          project_id: this.props.project.id,
          team: this.props.team,
          backToProject: true
        })
      }) 
      this.props.getEmails(this.props.match.params.id)
      .then(() => {
        this.setState({ emails: this.props.emails }) 
      })
    } else {
      // From dashboard. Get all projects
      this.props.getProjectsByUser()
    }
    this.props.getRoles()
  }

  submit = event => {
    event.preventDefault();
    const invitation = {
      email: this.state.email,
      project_id: this.state.project_id,
      project_role: this.state.project_role,
    }
    this.props.invite(invitation)
    .then(() => { 
      if (this.props.successMessage) { 
        this.showNotification('tr') 
      } 
    })
    this.props.getEmails(this.state.project_id)
    .then(res => {
      this.setState({ emails: res.emails })
    })
  }

  goBack = () => {          
    this.props.history.push({ pathname: `/home/project/${this.state.project_id}`})
  }

  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);

    this.alertTimeout = setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this), 4000);
  }

  handleChange = event => { 
    this.setState({ [event.target.name]: event.target.value }) 

    if([event.target.name] == 'project_id') {
      this.props.getTeam(event.target.value)
      .then(res => {
          this.setState({ team : res.team })
      })

      this.props.getEmails(event.target.value)
      .then(res => {
        this.setState({ emails: res.emails })
      })
    }
  
  }

  render() {
  const { classes, projects, project, roles, successMessage, emails, isFetching } = this.props;
  const { rowsPerPage, page, team, backToProject} = this.state;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, team.length - page * rowsPerPage);

  console.log(isFetching)

  return (
    <form className={classes.form} onSubmit={this.submit}>
      <Snackbar
        place="tr"
        color="success"
        icon={CheckCircleOutline}
        message={successMessage}
        open={this.state.tr}
        closeNotification={() => this.setState({ tr: false })}
        close
      /> 
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Invite people to join this project</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl className={classes.formControl}>                    
                    <TextField
                      select
                      disabled={backToProject ? true : false}
                      label="Project"
                      variant="outlined"
                      margin="normal"
                      className="my-input"
                      value={this.state.project_id}
                      onChange={this.handleChange}
                      inputProps={{
                        name: 'project_id',
                        id: 'project_id',
                      }}>
                      {project ? 
                        <MenuItem defaultValue key={project.id} value={project.id}> 
                          {project.name} 
                        </MenuItem>
                      : null }

                    {projects.projects ? projects.projects.map(project => {
                      return <MenuItem key={project.id} value={project.id}> {project.name} </MenuItem>
                    }) : null
                  }
                    </TextField>
                </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                <FormControl className={classes.formControl}>
                  <TextField
                      select
                      label="Role"
                      variant="outlined"
                      margin="normal"
                      className="my-input"
                      value={this.state.project_role}
                      onChange={this.handleChange}
                      inputProps={{
                        name: 'project_role',
                        id: 'project_role',
                      }}>
                      {roles ? roles.map(role => {
                      return  <MenuItem key={role.id} value={role.id}> {role.role} </MenuItem>
                    }) : null }
                    </TextField>
                </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    type="email"
                    label="email" 
                    className="my-input"
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={this.handleChange}
                    name="email"
                    fullWidth
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button type="submit" color="info">Invite</Button>
              {backToProject ?
              <Button color="info" onClick={this.goBack.bind(this)}>Back to project</Button>
              : null }
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}><People/></h4>
            </CardHeader>
            <CardBody>
              {team ? 
              <div>
                <Table
                  page={page}
                  rowsPerPage={team.length}
                  emptyRows={0}
                  tableHeaderColor="info"
                  tableHead={["Name", "Role", ]}
                  tableData={[
                    team ? team.map(user => {
                      return [
                        `${user.user ? user.user.name : null}`, 
                        `${user.role ? user.role.role : null }`,
                      ] }) : null
                  ]} />
              </div>
              : null}
              <div style={{ margin: '20px', textAlign: 'center'}}>
              {isFetching ? <CircularProgress className="my-spinner" classes={{ colorPrimary:'#26c6da' }} />  : null }

              </div>
              {emails.length && !isFetching ? 
              <div>
                <Table
                  page={page}
                  rowsPerPage={emails.length}
                  emptyRows={0}
                  tableHeaderColor="info"
                  tableHead={["Invited", ]}
                  tableData={[
                    emails ? emails.map(email => {
                      return [
                        `${ email }`,
                      ] }) 
                      : null  
                  ]} />
              </div>
              : null}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </form>
        );
      }
}


const mapDispatchToProps = dispatch => { 
  return { 
    getProjectsByUser: () => dispatch(getProjectsByUser()),
    getProject: id => dispatch(getProject(id)),
    getRoles: () => dispatch(getRoles()),
    getTeam: id => dispatch(getTeam(id)),
    invite: invitation => dispatch(invite(invitation)),
    getEmails: id => dispatch(getEmails(id))
   }
}

const mapStateToProps = state => ({ 
  project: state.project.project,
  projects: state.project.projects, 
  team: state.project.team,
  isFetching: state.project.isFetching,
  roles: state.project.roles,
  successMessage: state.project.successMessage,
  emails: state.project.emails
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Invite)));
  


