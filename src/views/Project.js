import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import Cookies from 'universal-cookie'
// Redux
import { connect } from 'react-redux'
import { getProject } from '../redux/actions/projects/Actions'
// Theme components
import Card from "../components/theme/Card/Card"
import Button from "../components/theme/CustomButtons/Button.jsx"
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx"
import CardBody from "../components/theme/Card/CardBody.jsx"
import GridItem from "../components/theme/Grid/GridItem.jsx"
import CardFooter from '../components/theme/Card/CardFooter'
import CustomTabs from "../components/theme/CustomTabs/CustomTabs.jsx"
import GridContainer from "../components/theme/Grid/GridContainer.jsx"
// Icons
import Note from "@material-ui/icons/Note"
import Info from "@material-ui/icons/Info"
import Close from "@material-ui/icons/Close"
import People from "@material-ui/icons/People"
import Timeline from "@material-ui/icons/Timeline"
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline"
// Material UI components
import withStyles from "@material-ui/core/styles/withStyles"
import DashboardSpinner from '../components/spinner/DashboardSpinner'
// Style
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx"

import { 
  EditProjectForm, 
  ProjectContent, 
  ProjectMilestones, 
  ProjectTickets, 
  ProjectTeam, 
  DangerDialogWrapped 
}  from '../components'
import { Typography } from '@material-ui/core';



class Project extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user: '',
        name: '',
        description: '',
        client_id: '',
        id: '',
        tr: false,
        page: 0,
        rowsPerPage: 5,
        ticketRowsPerPage: 5,
        milestones: [],
        edit: false,
        successMessage: this.props.successMessage,
        open: false,
      }
  }

  
  componentDidMount = () => {
    const cookies = new Cookies()
    var user = cookies.get('user')
    var token = cookies.get('token')
    this.setState({ user })

    // Fetch project and set to state
    this.props.getProject(this.props.match.params.id, token)
    .then(res => {
      if (res.project) {
        this.setState({ 
          id: res.project.id,
          name: res.project.name,
          description: res.project.description,
          client_id: res.project.client_id,
          milestones: res.project.milestones
         })
      } else {
        this.props.history.push({
          pathname: '/home/projects', 
          state: { errorMessage: 'There is no project with that id' }
        })
      }
    })

    // Snackbar
    var id = window.setTimeout(null, 0)
    while (id--) { window.clearTimeout(id) }

    // If previous create ticket or milestone, show notification with success
    if (this.props.location.state ? this.props.location.state.successMessage : null) {
      this.setState({ successMessage : this.props.location.state.successMessage })
      this.showNotification('tr')
    }
  }

  
  showNotification = place => {
    var x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this), 4000);
    }
    
    
  componentWillUnmount = () => { this.setState({ successMessage: '' })}

  getSuccess = successMessage => {
    this.setState({ successMessage })
    this.showNotification('tr')
    this.props.getProject(this.props.match.params.id)
    .then(res => {
      this.setState({ 
        id: res.project.id,
        name: res.project.name,
        description: res.project.description,
        client_id: res.project.client_id,
        milestones: res.project.milestones
       })
    })
  }

  getEdit = edit => { this.setState({ edit }) }  

  handleClickOpen = () => { this.setState({ open: true }) }

  handleClose = open => { this.setState({ open })}

    
  render() {
      const { classes, team, project, tickets, isFetching } = this.props
      const { edit, successMessage, user, milestones } = this.state

      const admins = team ? team.filter(user => user.role ? user.role.role === 'Admin' : null | user.role_id === 1 ) : null
      const isAdmin = admins ? admins.filter(admin => admin.user_id == user) : null
      const clients = team ? team.filter(user => user.role ? user.role.role === 'Editor' : null) : null
      
      return (
        isFetching ? 
        <div style={{ width: '100%', textAlign: 'center'}}>
          <DashboardSpinner /> 
        </div>
        :
          <div>
              <Snackbar
                place="tr"
                color="success"
                icon={CheckCircleOutline}
                message={successMessage ? successMessage : ''}
                open={this.state.tr}
                closeNotification={() => this.setState({ tr: false })}
                close
                /> 
              {project ?  
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CustomTabs
                    headerColor="success"
                    tabs={[
                      {
                        tabName: `Project | ${project.name}`,
                        tabIcon: Info,
                        tabContent: (
                          edit ?
                          <EditProjectForm 
                            classes={classes} 
                            project={project}
                            getSuccess={this.getSuccess.bind(this)}
                            getEdit={this.getEdit.bind(this)}
                          />
                          :
                          <ProjectContent
                            project={project} 
                            getEdit={this.getEdit.bind(this)}
                            classes={classes}
                            team={team}
                            admins={admins}
                            isAdmin={isAdmin}
                            clients={clients}
                            creator={ project.creator_id === parseInt(user) ? true : false}
                          />
                        ) 
                      },{ 
                        tabName: `Milestones | ${milestones.length}`,
                        tabIcon: Timeline,
                        tabContent: ( 
                          <ProjectMilestones 
                            classes={classes}
                            milestones={milestones}
                            project={project}
                            getSuccess={this.getSuccess.bind(this)}
                            creator={ project.creator_id === parseInt(user) ? true : false}
                          />
                          )
                      },{
                        tabName: `Tickets | ${tickets.length}`,
                        tabIcon: Note,
                        tabContent: (
                          <ProjectTickets 
                            tickets={tickets}
                            classes={classes}
                            project={project}
                            getSuccess={this.getSuccess.bind(this)}
                          />
                        )
                      },{
                        tabName: `Team | ${team.length}`,
                        tabIcon: People,
                        tabContent: (
                          <ProjectTeam 
                            team={team}
                            classes={classes}
                            project={project}
                            user={user}
                            creator= { project.creator_id === parseInt(user) ? true : false }
                          />
                        )
                      },
                      project.creator_id === parseInt(user) || isAdmin.length ?
                      {
                        tabName: "Delete",
                        tabIcon: Close,
                        tabContent: (
                          <CardBody>
                            <CardFooter style={{ justifyContent: 'center', flexDirection: 'column'}}>
                              <Typography style={{ marginBottom: '20px'}}>
                                You can choose to inactivate this project if you're not currently working on it. <br />
                                Deleting it will delete all project history.
                              </Typography>
                              <Button color="success" onClick={this.handleClickOpen}>
                                Delete project
                              </Button>
                            </CardFooter>  
                            <DangerDialogWrapped 
                              type={'project'}
                              title={'Are you sure you want to delete this project?'}
                              id={project.id}
                              open={this.state.open}
                              onClose={this.handleClose}
                            />
                         </CardBody>
                        )
                      }
                      : null
                    ]}/> 
                  </Card>
                </GridItem>
              </GridContainer>
              : null }
            </div>
          );
        }
  }


const mapDispatchToProps = dispatch => { return { getProject: (id, token) => dispatch(getProject(id, token)) }}

const mapStateToProps = state => ({ 
  project: state.project.project,
  team: state.project.team,
  tickets: state.project.tickets,
  isFetching: state.project.isFetching,
  successMessage: state.project.successMessage,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Project)));
  
