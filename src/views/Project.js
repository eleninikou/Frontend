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
import CardFooter from "../components/theme/Card/CardFooter.jsx";
import Table from "../components/theme/Table/Table.jsx";
import CustomTabs from "../components/theme/CustomTabs/CustomTabs.jsx";
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx";
import CardHeader from "../components/theme/Card/CardHeader.jsx";

// Material UI components
import Tooltip from "@material-ui/core/Tooltip";
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from "@material-ui/core/IconButton";
import TablePagination from '@material-ui/core/TablePagination';

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


class Project extends Component {
    constructor(props) {
      super(props);
      this.state = {
        auth_user_id: '',
        name: '',
        description: '',
        client_id: '',
        id: '',
        tr: false,
        page: 0,
        rowsPerPage: 5,
        ticketRowsPerPage: 5
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

    this.props.editProject(project).then(this.showNotification('tr'))
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


    goToTicket(id) { this.props.history.push(`/home/ticket/${id}`) }

    editMilestone(id) { this.props.history.push(`/home/milestone/${id}`) }

    deleteMilestone(id) { this.props.deleteMilestone(id).then(this.showNotification('tr')) }

    deleteProject(id) { this.props.deleteProject(id).then(this.showNotification('tr')) }

    invitePeople() { this.props.history.push(`/home/project-invite/${this.props.match.params.id}`) }

    handleChange = event => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    }

    handleChangePage = (event, page) => { this.setState({ page }) }

    handleChangeRowsPerPage = event => { this.setState({ rowsPerPage: event.target.value }) }
  


    
    render() {
      const { classes, team, project, successMessage, successMessageMilestone, tickets } = this.props;
      const { rowsPerPage, page } = this.state;
      const emptyRows = 0
      const TicketEmptyRows = 0

      if(project.milestones) {
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, project.milestones.length  - page * rowsPerPage);
      } 
      if(tickets) {
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, tickets.length  - page * rowsPerPage);
      }

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
                  {project.creator_id == this.state.auth_user_id ?
                  <CustomTabs
                    headerColor="success"
                    tabs={[
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
                              </GridContainer>
                            </CardBody>
                            <CardFooter>
                              <Button color="success" type="submit">Edit Project</Button>
                            </CardFooter>
                          </form>  
                        ) 
                      },{ 
                      tabName: "Milestones",
                      tabIcon: Timeline,
                      tabContent: (
                        <div>
                            <Table
                              page={page}
                              rowsPerPage={rowsPerPage}
                              emptyRows={emptyRows}
                              tableHeaderColor="success"
                              tableHead={["Title", "Focus", "Last updated", "Edit", "Remove"] }
                              tableData={[
                                project.milestones ? project.milestones.map(milestone => {
                                  return ([
                                    `${milestone.title}`, 
                                    `${milestone.focus}`,
                                    `${milestone.updated_at}`,
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
                                        </Tooltip>
                                      ), 
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
                                      ) 
                                    ])
                                }) : null
                              ]} />   
                              <TablePagination
                              rowsPerPageOptions={[5, 10, 20]}
                              component="div"
                              count={project.milestones ? project.milestones.length : null}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                              nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                              onChangePage={this.handleChangePage}
                              onChangeRowsPerPage={this.handleChangeRowsPerPage} /> 
                          </div>    
                        )
                    },{
                      tabName: "Tickets",
                      tabIcon: Note,
                      tabContent: (
                        <div>
                            <Table
                              page={page}
                              rowsPerPage={rowsPerPage}
                              emptyRows={TicketEmptyRows}
                              tableHeaderColor="success"
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
                    : 
                    <Card>
                    <CardHeader color="primary">
                       <h4 className={classes.cardTitleWhite}>Ticket</h4>
                    </CardHeader>
                    <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={8} md={9}>
                          {/* <Typography variant="h6" className="ticket-title">
                            {show_ticket.title} created by {show_ticket.creator ? show_ticket.creator.name : null} | {show_ticket.created_at}
                          </Typography>                          
                            {description.blocks ? 
                          <Typography className="my-ticket-time">
                            <div dangerouslySetInnerHTML={{ __html: this.convertFromJSONToHTML(description) }} />
                          </Typography> : <CircularProgress className="my-spinner" color="primary" />
                          } */}
                      </GridItem> 
                      <GridItem xs={12} sm={4} md={3}>
                        <div className={classes.demo}>
                          {/* <List className="my-ticket-list">
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar> <DateRange /> </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary={moment(show_ticket.due_date).format('YYYY-MM-DD')} />
                            </ListItem>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar> <LinearScale /> </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary={show_ticket.status ? show_ticket.status.status : null} />
                            </ListItem>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar> 
                                  {show_ticket.type_id == 1 ?
                                    <BugReport /> 
                                    : show_ticket.type_id == 2 ?
                                    <LowPriority />
                                    : show_ticket.type_id == 3 ?
                                    <LinearScale />
                                    : 
                                    <YoutubeSearchedFor /> }
                                
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary={show_ticket.type ? show_ticket.type.type : null} />
                            </ListItem>
                            <ListItem>
                              <ListItemAvatar>                         
                              {
                                show_ticket.priority == 'low' ?
                                  <Avatar style={{backgroundColor: '#ff9800'}}> 
                                    <Warning /> 
                                  </Avatar>
                                : show_ticket.priority == 'normal' ?
                                  <Avatar style={{backgroundColor: '#4caf50'}}> 
                                    <Warning /> 
                                  </Avatar>
                                : 
                                  <Avatar style={{backgroundColor: '#f44336'}}> 
                                    <Warning /> 
                                  </Avatar>
                              }
                              </ListItemAvatar>
                              <ListItemText primary={show_ticket.priority} />
                            </ListItem>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar> <Timeline /> </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary={show_ticket.milestone ? show_ticket.milestone.title : null} />
                            </ListItem>
                          </List> */}
                        </div>
                      </GridItem> 
                    </GridContainer>
                  </CardBody> 
                  <CardFooter>
                    {/* <Button color="primary" onClick={this.showForm}>{ButtonText}</Button> */}
                  </CardFooter>
                </Card>
                }   
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Project)));
  
