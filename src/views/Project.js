import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import Cookies from 'universal-cookie';

// Redux
import { connect } from 'react-redux'
import { getProject, deleteProject } from '../redux/actions/projects/Actions'

// Theme components
import Card from "../components/theme/Card/Card";
import Button from "../components/theme/CustomButtons/Button.jsx";
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import GridItem from "../components/theme/Grid/GridItem.jsx";
import CustomTabs from "../components/theme/CustomTabs/CustomTabs.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";

// Icons
import Note from "@material-ui/icons/Note";
import Info from "@material-ui/icons/Info";
import People from "@material-ui/icons/People";
import Timeline from "@material-ui/icons/Timeline";
import DeleteForever from "@material-ui/icons/DeleteForever";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";

// Styles
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import '../assets/sass/main.sass';

import EditProjectForm from '../components/project/EditProjectForm';
import ProjectContent from '../components/project/ProjectContent';
import ProjectMilestones from '../components/project/ProjectMilestones';
import ProjectTickets from '../components/project/ProjectTickets';
import ProjectTeam from '../components/project/ProjectTeam';


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
        successMessage: this.props.successMessage
      }
  }

  
  componentWillMount = () => {
    const cookies = new Cookies()
    var user = cookies.get('user')
    this.setState({ user })

    // Fetch project and set to state
    this.props.getProject(this.props.match.params.id)
    .then(res => {
      this.setState({ 
        id: res.project.id,
        name: res.project.name,
        description: res.project.description,
        client_id: res.project.client_id,
        milestones: res.project.milestones
       })
    });

    // Snackbar
    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }

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

  // Redirect to projects
  deleteProject = id => { 
    this.props.deleteProject(id)
    .then(() => {
      if(this.props.successMessage) {
        this.props.history.push({
          pathname: '/home/projects', 
          state: { successMessage: this.props.successMessage}
        })
      }
    })
  }

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
    });
  }

  getEdit = edit => { this.setState({ edit }) }  
    
  render() {
      const { classes, team, project, tickets } = this.props;
      const { edit, successMessage, user, milestones } = this.state;

        return (
          project ?
            <div>
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
                <GridItem xs={12} sm={12} md={12}>
                <Card>
                  {project.creator_id == user ?
                  <CustomTabs
                    headerColor="success"
                    tabs={[
                      {
                      tabName: "About",
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
                          />
                        ) 
                      },{ 
                        tabName: "Milestones",
                        tabIcon: Timeline,
                        tabContent: ( 
                          <ProjectMilestones 
                            classes={classes}
                            milestones={milestones}
                            project={project}
                            getSuccess={this.getSuccess.bind(this)}
                            />
                        
                          )
                      },{
                        tabName: "Tickets",
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
                        tabName: "Team",
                        tabIcon: People,
                        tabContent: (
                          <ProjectTeam 
                            team={team}
                            classes={classes}
                            project={project}
                            user={user}
                            />
                        )
                      },{
                        tabName: "Delete",
                        tabIcon: DeleteForever,
                        tabContent: (
                          <CardBody>
                            <Button color="success" onClick={this.deleteProject.bind(this, project.id)}>Delete project</Button>
                         </CardBody>
                          )
                      }
                    ]}/> 
                    : null }   
                  </Card>
                </GridItem>
              </GridContainer>
            </div>
          : null 
          );
        }
  }


const mapDispatchToProps = dispatch => { 
  return { 
    getProject: id => dispatch(getProject(id)),
    deleteProject: id => dispatch(deleteProject(id))
   }
}

const mapStateToProps = state => ({ 
  project: state.project.project,
  team: state.project.team,
  tickets: state.project.tickets,
  isFetching: state.project.isFetching,
  successMessage: state.project.successMessage,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Project)));
  
