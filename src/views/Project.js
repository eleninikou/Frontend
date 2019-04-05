import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import Cookies from 'universal-cookie';
import moment from 'moment';

// Redux
import { connect } from 'react-redux'
import { getProject, deleteProject } from '../redux/actions/projects/Actions'
import { getTicketStatus, getTicketTypes } from '../redux/actions/tickets/Actions'

// Theme components
import Card from "../components/theme/Card/Card";
import Table from "../components/theme/Table/Table.jsx";
import Button from "../components/theme/CustomButtons/Button.jsx";
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import GridItem from "../components/theme/Grid/GridItem.jsx";
import CardFooter from "../components/theme/Card/CardFooter.jsx";
import CustomTabs from "../components/theme/CustomTabs/CustomTabs.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";

// Material UI components
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField'
import IconButton from "@material-ui/core/IconButton";
import TablePagination from '@material-ui/core/TablePagination';

// Icons
import Note from "@material-ui/icons/Note";
import Info from "@material-ui/icons/Info";
import Close from "@material-ui/icons/Close";
import People from "@material-ui/icons/People";
import Timeline from "@material-ui/icons/Timeline";
import ExitToApp from "@material-ui/icons/ExitToApp";
import DeleteForever from "@material-ui/icons/DeleteForever";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";

// Styles
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import '../assets/sass/main.sass';

import EditProjectForm from '../components/project/EditProjectForm';
import ProjectContent from '../components/project/ProjectContent';
import ProjectMilestones from '../components/project/ProjectMilestones';


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
        milestones: [],
        type_id: '',
        priority: '',
        status_id: '',
        page: 0,
        rowsPerPage: 5,
        ticketRowsPerPage: 5,
        edit: false,
        successMessage: this.props.successMessage
      }
      this.invitePeople = this.invitePeople.bind(this);
  }

  
  componentWillMount = () => {
    const cookies = new Cookies()
    var user = cookies.get('user')
    this.setState({ user })
    this.props.getTicketStatus()
    this.props.getTicketTypes()

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

  goToTicket = id => { this.props.history.push(`/home/ticket/${id}`) }


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

  // Redirect to create ticket
  createNewTicket = () => { 
    this.props.history.push({
      pathname: '/home/create-ticket', 
      state: { project_id: this.state.id }
    }) 
  }

  invitePeople = () => { this.props.history.push(`/home/project-invite/${this.props.match.params.id}`) }

  handleChangePage = (event, page) => { this.setState({ page }) }

  handleChangeRowsPerPage = event => { this.setState({ rowsPerPage: event.target.value }) }

  handleChange = event => { const { name, value } = event.target; }

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
      const { classes, team, project, tickets, ticketStatus, ticketTypes, } = this.props;
      const { rowsPerPage, page, edit, successMessage, user, milestones, status_id, type_id, priority } = this.state;
      const emptyRows = 0
      const TicketEmptyRows = 0

      if(tickets) {
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, tickets.length  - page * rowsPerPage);
      }

      let filteredTickets = tickets ? tickets.filter(ticket => {
        return (
          (status_id ? ticket.status_id == status_id : ticket) &&
          (type_id ? ticket.type_id == type_id : ticket) &&
          (priority ? ticket.priority == priority : ticket) 
        )
      }) : tickets

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
                            ticket={tickets}
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
                        <div>
                          <GridContainer>              
                            <GridItem xs={12} sm={12} md={12}>        
                              <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                  <TextField
                                    value={this.state.type_id}
                                    select
                                    label="Type"
                                    onChange={this.handleChange.bind(this)}
                                    className="my-select"
                                    variant="outlined"
                                    margin="normal"
                                    inputProps={{ name: 'type_id', id: 'type_id' }} >
                                    <MenuItem value={null}>All</MenuItem>
                                        {ticketTypes ? ticketTypes.map(type => {
                                          return <MenuItem key={type.id} value={type.id}> {type.type} </MenuItem>    
                                      }): null}
                                  </TextField>   
                                </GridItem>   
                                <GridItem xs={12} sm={12} md={4}>
                                    <TextField
                                      value={this.state.status_id}
                                      select
                                      label="Status"
                                      onChange={this.handleChange.bind(this)}
                                      className="my-select"
                                      variant="outlined"
                                      margin="normal"
                                      inputProps={{ name: 'status_id', id: 'status_id' }} >
                                        <MenuItem value={null}>All</MenuItem>
                                        {ticketStatus ? ticketStatus.map(status => {
                                          return <MenuItem  key={status.id} value={status.id}> {status.status} </MenuItem> 
                                        }): null}
                                    </TextField> 
                                </GridItem> 
                                <GridItem xs={12} sm={12} md={4}>
                                  <TextField
                                    select
                                    label="Priority"
                                    value={this.state.priority}
                                    onChange={this.handleChange.bind(this)}
                                    className="my-select"
                                    variant="outlined"
                                    margin="normal"
                                    inputProps={{ name: 'priority', id: 'priority' }} >
                                      <MenuItem value={null}>All</MenuItem>
                                      <MenuItem value='low'>Low</MenuItem>
                                      <MenuItem value='normal'>Normal</MenuItem>
                                      <MenuItem value='high'>High</MenuItem>
                                  </TextField> 
                                </GridItem>  
                              </GridContainer> 
                              <Table
                                page={page}
                                rowsPerPage={rowsPerPage}
                                emptyRows={TicketEmptyRows}
                                tableHeaderColor="success"
                                tableHead={["Priority", "Type", "Title", "Assigned to", "Status", "Due date", "Details"]}
                                tableData={[
                                  tickets.map(ticket => {
                                  return [
                                      `${ticket.priority}`,
                                      `${ticket.type.type}`, 
                                      `${ticket.title}`, 
                                      `${ticket.assigned_user.name}`,
                                      `${ticket.status.status}`,
                                      `${moment(ticket.due_date).format('YYYY-MM-DD')}`,
                                        <Tooltip
                                          id="tooltip-top"
                                          title="Go to Ticket"
                                          placement="top"
                                          classes={{ tooltip: classes.tooltip }}
                                          onClick={this.goToTicket.bind(this, ticket.id)}
                                      >
                                        <IconButton aria-label="Go to" className={classes.tableActionButton}>
                                          <ExitToApp style={{color:'#66bb6a'}} className={ classes.tableActionButtonIcon + " " + classes.edit }/>
                                        </IconButton>
                                      </Tooltip>
                                      ]
                                  })
                                ]} 
                              />  
                              <TablePagination
                                rowsPerPageOptions={[5, 10, 20]}
                                component="div"
                                count={tickets ? tickets.length : null}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                                nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage} 
                              />   
                              <GridContainer>
                                <GridItem xs={12} sm={2} md={2}>
                                  <Button color="success"  onClick={this.createNewTicket.bind(this)}>Create new Ticket</Button>
                                </GridItem>
                              </GridContainer>
                            </GridItem>
                          </GridContainer>
                         </div>
                      )
                    },{
                      tabName: "Team",
                      tabIcon: People,
                      tabContent: (
                        <div>
                          <Table
                            page={page}
                            rowsPerPage={rowsPerPage}
                            emptyRows={TicketEmptyRows}
                            tableHeaderColor="success"
                            tableHead={["Name", "Role", "Remove" ]}
                            tableData={[
                              team ? team.map(person => {
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
                                  }) : null
                                ]} 
                           />
                          <CardFooter>
                              {project.creator_id == this.state.auth_user_id ?
                                <Button 
                                  color="success" 
                                  onClick={this.invitePeople}>
                                    Invite people
                                </Button>
                              : null}
                            </CardFooter>
                          </div>
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
    deleteProject: id => dispatch(deleteProject(id)),
    getTicketStatus: () => dispatch(getTicketStatus()),
    getTicketTypes: () => dispatch(getTicketTypes()),
   }
}

const mapStateToProps = state => ({ 
  project: state.project.project,
  team: state.project.team,
  tickets: state.project.tickets,
  isFetching: state.project.isFetching,
  successMessage: state.project.successMessage,
  ticketStatus: state.ticket.ticketStatus,
  ticketTypes: state.ticket.ticketTypes,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Project)));
  
