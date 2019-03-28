import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { getProject, editProject, deleteProject } from '../redux/actions/projects/Actions'
import { deleteMilestone } from '../redux/actions/milestones/Actions'
import Cookies from 'universal-cookie';

// Theme components
import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import Card from "../components/theme/Card/Card";
import CardBody from "../components/theme/Card/CardBody.jsx";
import Button from "../components/theme/CustomButtons/Button.jsx";
import CustomInput from "../components/theme/CustomInput/CustomInput.jsx";
import CardFooter from "../components/theme/Card/CardFooter.jsx";
import Table from "../components/theme/Table/Table.jsx";
import CustomTabs from "../components/theme/CustomTabs/CustomTabs.jsx";
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx";

// Material UI components
import Tooltip from "@material-ui/core/Tooltip";
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from "@material-ui/core/IconButton";

// Icons
import Edit from "@material-ui/icons/Edit";
import Note from "@material-ui/icons/Note";
import Close from "@material-ui/icons/Close";
import People from "@material-ui/icons/People";
import Timeline from "@material-ui/icons/Timeline";
import ExitToApp from "@material-ui/icons/ExitToApp";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import DeleteForever from "@material-ui/icons/DeleteForever";

// Styles
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import '../assets/sass/main.sass';



class EditProject extends Component {
    constructor(props) {
      super(props);
      this.state = {
        auth_user_id: '',
        name: '',
        description: '',
        client_id: '',
        id: '',
        tr: false
      }
  
      this.editMilestone = this.editMilestone.bind(this);
      this.deleteMilestone = this.deleteMilestone.bind(this);
      this.invitePeople = this.invitePeople.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  submit = event => {
    event.preventDefault();
    const project = {
      id: this.state.id,
      client_id: this.state.client_id,
      name: this.state.name,
      description: this.state.description,
    };

    this.props.editProject(project)
    .then(this.showNotification('tr'))
  }
  
    componentWillMount() {
      const cookies = new Cookies()
      var auth_user_id = cookies.get('user')
      this.setState( {auth_user_id })

      this.props.getProject(this.props.match.params.id)
      .then(res => {
        this.setState({ 
          id: res.project.id,
          name: res.project.name,
          description: res.project.description,
          client_id: res.project.client_id
         })
      });

      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
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


    goToTicket(id) {
      this.props.history.push(`/home/ticket/${id}`)
    }

    editMilestone(id) {
      this.props.history.push(`/home/milestone/${id}`)
    }

    deleteMilestone(id) {
      this.props.deleteMilestone(id).then(this.showNotification('tr'))
    }

    deleteProject(id) {
        this.props.deleteProject(id).then(this.showNotification('tr'))
    }

    invitePeople() {
      const id = this.props.match.params.id
      this.props.history.push(`/home/project-invite/${id}`)
    }

    handleChange = event => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    }

    
    render() {
      const { classes, team, project, successMessage, successMessageMilestone, tickets } = this.props;
          return (
          project ?
            <div>
            {successMessage || successMessageMilestone ? 
              <Snackbar
                place="tr"
                color="success"
                message={successMessage || successMessageMilestone}
                open={this.state.tr}
                closeNotification={() => this.setState({ tr: false })}
                close
              /> : null }
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CustomTabs
                    headerColor="primary"
                    tabs={[
                      project.creator_id === this.state.auth_user_id ?
                      {
                      tabName: "Info",
                      tabIcon: LibraryBooks,
                      tabContent: (
                          <form className={classes.form} onSubmit={this.submit}>
                            <CardBody>
                              <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                  <InputLabel>Name</InputLabel>
                                  <TextField 
                                      name="name" 
                                      type="text"
                                      value={this.state.name}
                                      onChange={this.handleChange}
                                      fullWidth
                                      className="my-input"
                                  />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                  <InputLabel>Description</InputLabel>
                                  <TextField 
                                      name="description" 
                                      type="text"
                                      value={this.state.description}
                                      onChange={this.handleChange}
                                      fullWidth
                                      className="my-input"
                                    />
                                </GridItem>
                                {project.client ? 
                                  <GridItem xs={12} sm={12} md={12}>
                                      <CustomInput
                                        name="client_id"
                                        id="client_id"
                                        className="my-input"
                                        value={this.state.client_id}
                                        formControlProps={{
                                          fullWidth: true
                                        }}/>
                                  </GridItem>
                                : null }
                              </GridContainer>
                            </CardBody>
                            <CardFooter>
                              <Button color="primary" type="submit">Edit Info</Button>
                            </CardFooter>
                          </form>  
                        ) 
                      } : {
                        tabName: "Info",
                        tabIcon: LibraryBooks,
                        tabContent: ( 
                          <h4>Name: {project.name}, Description: {project.description}, Created: {project.created_at}, 
                          Tickets: {project.tickets ? (project.tickets).length : null}</h4>

                          // <Table
                          //   tableHeaderColor="primary"
                          //   tableHead={["Name", "Description", "Created", "Tickets", "Last updated"]}
                          //   tableData={[
                          //     project ?
                          //       [`${project.name}`, 
                          //       `${project.description}`,
                          //       `${project.created_at}`,
                          //       `${project.tickets ? (project.tickets).length : null}`,

                          //   ]
                          //     : null  
                          //   ]} 
                          //  /> 
                        )
                    },{
                      tabName: "Milestones",
                      tabIcon: Timeline,
                      tabContent: (
                        project.milestones ? 
                            <Table
                              tableHeaderColor="primary"
                              tableHead={
                                project.creator_id == this.state.auth_user_id ?
                                  ["Name", "Focus", "Last updated", "Edit", "Remove"]
                                : ["Name", "Focus", "Last updated"]
                              }
                              tableData={[
                                project.milestones.map(milestone => {
                                return [
                                    `${milestone.title}`, 
                                    `${milestone.focus}`,
                                    `${milestone.updated_at}`,
                                      project.creator_id == this.state.auth_user_id ?
                                      (
                                      <Tooltip
                                        id="tooltip-top"
                                        title="Edit Milestone"
                                        placement="top"
                                        classes={{ tooltip: classes.tooltip }}
                                        onClick={this.editMilestone.bind(this, milestone.id)}>
                                        <IconButton
                                          aria-label="Edit"
                                          className={classes.tableActionButton}>
                                          <Edit className={ classes.tableActionButtonIcon + " " + classes.edit}/>
                                        </IconButton>
                                      </Tooltip>) : null, 
                                      project.creator_id == this.state.auth_user_id ?
                                      (
                                        <Tooltip
                                          id="tooltip-top-start"
                                          title="Delete milestone"
                                          placement="top"
                                          onClick={this.deleteMilestone.bind(this, milestone.id)}
                                          classes={{ tooltip: classes.tooltip }}>
                                          <IconButton
                                            aria-label="Close"
                                            className={classes.tableActionButton}>
                                            <Close className={ classes.tableActionButtonIcon + " " + classes.close}/>
                                          </IconButton>
                                        </Tooltip>
                                      ) : null
                                    ]
                                })
                              ]} 
                            />    
                         : null 
                      )
                    },
                    {
                      tabName: "Tickets",
                      tabIcon: Note,
                      tabContent: (
                        tickets ? 
                            <Table
                              tableHeaderColor="primary"
                              tableHead={["Priority", "Type", "Title", "Assigned to", "Status", "Due date", "Edit", "Details"]}
                              tableData={[
                                tickets.map(ticket => {
                                return [
                                    `${ticket.priority}`,
                                    `${ticket.type.type}`, 
                                    `${ticket.title}`, 
                                    `${ticket.assigned_user.name}`,
                                    `${ticket.status.status}`,
                                    `${ticket.due_date}`,
                                      (this.state.auth_user_id == ticket.creator_id) || (this.state.auth_user_id == ticket.assigned_user_id) ?
                                      <Tooltip
                                        id="tooltip-top"
                                        title="Edit Ticket"
                                        placement="top"
                                        classes={{ tooltip: classes.tooltip }}
                                        onClick={this.goToTicket.bind(this, ticket.id)}>
                                        <IconButton
                                          aria-label="Edit"
                                          className={classes.tableActionButton}>
                                          <Edit className={ classes.tableActionButtonIcon + " " + classes.edit}/>
                                        </IconButton>
                                      </Tooltip>
                                      : null,
                                      <Tooltip
                                        id="tooltip-top"
                                        title="Go to Ticket"
                                        placement="top"
                                        classes={{ tooltip: classes.tooltip }}
                                        onClick={this.goToTicket.bind(this, ticket.id)}
                                    >
                                      <IconButton aria-label="Go to" className={classes.tableActionButton}>
                                        <ExitToApp className={ classes.tableActionButtonIcon + " " + classes.edit }/>
                                      </IconButton>
                                    </Tooltip>
                                    ]
                                })
                              ]} 
                            />    
                         : null 
                      )
                    },
                    {
                      tabName: "Team",
                      tabIcon: People,
                      tabContent: (
                        <div>
                          {team ? team.map(person => {
                          return (
                            <Table
                              tableHeaderColor="primary"
                              tableHead={
                                person.role ? person.role.id == 1 ?
                                  ["Name", "Role", "Remove" ]
                                : ["Name", "Role"] : null
                                }
                              tableData={[
                                team.map(person => {
                                  return ([
                                      `${person.user.name}`, 
                                      `${person.role ? person.role.role : null }`,
                                          person.role ? person.role.id !== 1 ?
                                            <Tooltip
                                              id="tooltip-top-start"
                                              title="Remove"
                                              placement="top"
                                              classes={{ tooltip: classes.tooltip }}>
                                              <IconButton
                                                aria-label="Close"
                                                className={classes.tableActionButton}>
                                                <Close className={ classes.tableActionButtonIcon + " " + classes.close}/>
                                              </IconButton>
                                            </Tooltip>
                                          : null : null
                                      ]) 
                                    })
                                  ]} 
                             />) 
                            }) : null }
                            
                            <CardFooter>
                              {project.creator_id == this.state.auth_user_id ?
                                <Button 
                                  color="primary" 
                                  onClick={this.invitePeople}>
                                    Invite people
                                </Button>
                              : null}
                            </CardFooter>
                        </div> 
                      )
                    },
                    project.creator_id == this.state.auth_user_id ?
                      {
                        tabName: "Delete",
                        tabIcon: DeleteForever,
                        tabContent: (
                          <CardBody>
                            <Button color="primary" onClick={this.deleteProject.bind(this, project.id)}>Delete project</Button>
                         </CardBody>
                        )
                      }
                   : null
                  ]}/>
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
    deleteMilestone: id => dispatch(deleteMilestone(id)),
    editProject: id => dispatch(editProject(id)),
    deleteProject: id => dispatch(deleteProject(id))
   }
}

const mapStateToProps = state => ({ 
  project: state.project.project,
  team: state.project.team,
  tickets: state.project.tickets,
  isFetching: state.project.isFetching,
  successMessage: state.project.successMessage,
  successMessageMilestone: state.milestone.successMessage
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(EditProject)));
  
