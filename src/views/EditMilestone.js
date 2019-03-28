import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import Cookies from 'universal-cookie';

// Redux
import { connect } from 'react-redux'
import { getMilestone, milestoneEdit } from '../redux/actions/milestones/Actions'

// Theme components
import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import Card from "../components/theme/Card/Card";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import Button from "../components/theme/CustomButtons/Button.jsx";
import CardFooter from "../components/theme/Card/CardFooter.jsx";
import CustomTabs from "../components/theme/CustomTabs/CustomTabs.jsx";
import Table from "../components/theme/Table/Table.jsx";
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
import Timeline from "@material-ui/icons/Timeline";
import ExitToApp from "@material-ui/icons/ExitToApp";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import DeleteForever from "@material-ui/icons/DeleteForever";

// Styles
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";


class EditMilestone extends Component {
    constructor(props) {
      super(props);
      this.state = {
        auth_user_id: '',
        title: '',
        focus: '',
        project: '',
        project_id: '',
        selectedDate: '',
        due_date: ''
      }
  }
  
  componentWillMount() {
    const cookies = new Cookies()
    var auth_user_id = cookies.get('user')
    this.setState( {auth_user_id })

    // this.props.getMilestone(this.props.match.params.id)
    this.props.getMilestone(1)
    .then(res => {
      this.setState({ 
        title: res.milestone.title,
        focus: res.milestone.focus,
        project: res.milestone.project.name,
        project_id: res.milestone.project.id,
        due_date: res.milestone.due_date
       })
    });

    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }


  submit = event => {
    event.preventDefault();
    const date = null;
    if (this.state.selectedDate === '') {
      this.date = this.state.due_date
    } else {
      this.date = this.state.selectedDate
    }
    const milestone = {
      project_id: this.state.project_id,
      title: this.state.title,
      focus: this.state.focus,
      due_date: this.date
    };
    this.props.milestoneEdit(milestone, this.props.match.params.id)
    .then(this.showNotification('tr'))
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

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleDateChange = event => {
    this.setState({ selectedDate: event.target.value });
  };

  render() {
    const { classes, tickets, successMessage } = this.props;
      return (
        <div>        
          {successMessage ? 
            <Snackbar
              place="tr"
              color="success"
              message={successMessage}
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
                      {
                        tabName: "Info",
                        tabIcon: LibraryBooks,
                        tabContent: (
                          <form className={classes.form} onSubmit={this.submit}>
                            <CardBody>
                              <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                  <InputLabel>Title</InputLabel>
                                  <TextField 
                                      name="title" 
                                      type="text"
                                      value={this.state.title}
                                      onChange={this.handleChange}
                                      fullWidth
                                      className="my-input"
                                  />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                  <InputLabel>Focus</InputLabel>
                                  <TextField 
                                      name="focus" 
                                      type="text"
                                      value={this.state.focus}
                                      onChange={this.handleChange}
                                      fullWidth
                                      className="my-input"
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                  <InputLabel>Project</InputLabel>
                                  <TextField 
                                      disabled
                                      name="project" 
                                      type="text"
                                      value={this.state.project}
                                      fullWidth
                                      className="my-input"
                                    />
                                </GridItem>
                                <GridItem>
                                  <TextField
                                      id="date"
                                      label="Due date"
                                      type="datetime-local"
                                      defaultValue={this.state.due_date}
                                      value={this.state.selectedDate}
                                      onChange={this.handleDateChange}
                                      className="my-input"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                    />
                                </GridItem>
                              </GridContainer>
                            </CardBody>
                            <CardFooter>
                              <Button color="primary" type="submit">Edit Info</Button>
                            </CardFooter>
                          </form>  
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
                                      (this.state.auth_user_id == ticket.creator_id) && (this.state.auth_user_id == ticket.assigned_user_id) ?
                                      <Tooltip
                                        id="tooltip-top"
                                        title="Edit Ticket"
                                        placement="top"
                                        classes={{ tooltip: classes.tooltip }}
                                        onClick={this.goToTicket.bind(this, ticket.id)}
                                        >
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
                    this.state.auth_user_id ?
                      {
                        tabName: "Delete",
                        tabIcon: DeleteForever,
                        tabContent: (
                          <CardBody>
                            {/* <Button color="primary" onClick={this.deleteProject.bind(this, project.id)}>Delete project</Button> */}
                         </CardBody>
                        )
                      }
                   : null
                  ]}/>
                  </Card>
                </GridItem>
              </GridContainer>
            </div>
          );
        }
  }


const mapDispatchToProps = dispatch => { 
  return { 
    getMilestone: id => dispatch(getMilestone(id)),
    milestoneEdit: (milestone, id) => dispatch(milestoneEdit(milestone, id))
  }
}

const mapStateToProps = state => ({ 
  milestone: state.milestone.milestone,
  isFetching: state.milestone.isFetching,
  tickets: state.milestone.tickets,
  successMessage: state.milestone.successMessage
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(EditMilestone)));
  
