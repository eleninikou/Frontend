import React, { Component } from 'react'
import { withRouter } from "react-router-dom"

// Redux
import { connect } from 'react-redux'
import { getTicket, updateTicket, getTicketTypes, getTicketStatus, deleteTicket } from '../redux/actions/tickets/Actions'

// Theme components
import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import Card from "../components/theme/Card/Card";
import CardBody from "../components/theme/Card/CardBody.jsx";
import Button from "../components/theme/CustomButtons/Button.jsx";
import CardFooter from "../components/theme/Card/CardFooter.jsx";
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx";
import CustomTabs from "../components/theme/CustomTabs/CustomTabs.jsx";

// Material UI components
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import withStyles from "@material-ui/core/styles/withStyles";

// Icons
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import DeleteForever from "@material-ui/icons/DeleteForever";
import Message from "@material-ui/icons/Message";

// Styles
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";


class EditTicket extends Component {
    constructor(props) {
      super(props);
      this.state = {
        assigned_user_id: '',
        description: '',
        due_date: '',
        milestone_id: '',
        priority: '',
        status_id: '',
        title: '',
        type_id: '',
        project_name: '',
        project_id: '',
        selectedDate: ''
      }

      this.ticketDelete = this.ticketDelete.bind(this);

  }

  submit = event => {
    event.preventDefault();

    let date = '';
    if (this.state.selectedDate === '') {
      this.date = this.state.due_date
    } else {
      this.date = this.state.selectedDate
    }

    const ticket = {
      assigned_user_id: this.state.assigned_user_id,
      description: this.state.description,
      due_date: this.date,
      milestone_id: this.state.milestone_id,
      priority: this.state.priority,
      status_id: this.state.status_id,
      title: this.state.title,
      type_id: this.state.type_id,
      project_id: this.state.project_id
    };

    this.props.updateTicket(ticket, this.props.match.params.id)
    .then(this.showNotification('tr'))
  }
  
  componentWillMount = () => {
    this.props.getTicket(this.props.match.params.id)
    .then(res => {
      if(res.ticket) {
        this.setState({ 
          assigned_user_id: res.ticket.assigned_user_id,
          description: res.ticket.description,
          due_date: res.ticket.due_date,
          milestone_id: res.ticket.milestone_id,
          priority: res.ticket.priority,
          status_id: res.ticket.status_id,
          title: res.ticket.title,
          type_id: res.ticket.type_id,
          project_name: res.ticket.project.name,
          project_id: res.ticket.project_id,
          creator: res.ticket.project.creator_id
         })
      } else {
        this.props.history.push(`/home `)
      }})

    this.props.getTicketTypes();
    this.props.getTicketStatus();

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

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  ticketDelete() { 
    this.props.deleteTicket(this.props.match.params.id)
    .then(this.showNotification('tr'))
  }
  

  render() {
    const { classes, ticketStatus, ticketTypes, team, milestones, successMessage } = this.props;
    return (
      <div>
        <Snackbar
          place="tr"
          color="success"
          message={successMessage}
          open={this.state.tr}
          closeNotification={() => this.setState({ tr: false })}
          close
        /> 
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
            <CustomTabs
                    headerColor="primary"
                    tabs={[
                      this.state.creator_id === this.state.auth_user_id ?
                      {
                      tabName: "Info",
                      tabIcon: LibraryBooks,
                      tabContent: (
                        <form className={classes.form} onSubmit={this.submit}>
                          <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                  <TextField 
                                    name="title" 
                                    type="text"
                                    label="Title" 
                                    className="my-input"
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                    fullWidth />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                  <TextField 
                                    name="description" 
                                    type="text"
                                    label="Description" 
                                    className="my-input"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    fullWidth />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                  <TextField 
                                    disabled
                                    name="project" 
                                    type="text"
                                    label="Project" 
                                    className="my-input"
                                    value={this.state.project_name}
                                    fullWidth />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="type_id">Type</InputLabel>
                                      <Select
                                        className="my-input"
                                        value={this.state.type_id}
                                        onChange={this.handleChange}
                                        inputProps={{ name: 'type_id', id: 'type_id'}} >
                                      <MenuItem> <em>None</em> </MenuItem>
                                      {ticketTypes ? ticketTypes.map(type => {
                                        return (
                                        <MenuItem 
                                          key={type.id}
                                          value={type.id}>
                                          {type.type}
                                        </MenuItem>
                                        )
                                      }): null}
                                      </Select>
                                  </FormControl>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="status_id">Status</InputLabel>
                                      <Select
                                        className="my-input"
                                        value={this.state.status_id}
                                        onChange={this.handleChange}
                                        inputProps={{
                                          name: 'status_id',
                                          id: 'status_id',
                                        }}
                                      >
                                      <MenuItem value=""> <em>None</em> </MenuItem>
                                      {ticketStatus ? ticketStatus.map(status => {
                                        return (
                                        <MenuItem 
                                          key={status.id}
                                          value={status.id}>
                                            {status.status}
                                        </MenuItem>)
                                      }): null}
                                      </Select>
                                  </FormControl>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                <FormControl component="fieldset" className={classes.formControl}>
                                  <FormLabel component="legend">Priority</FormLabel>
                                  <RadioGroup
                                    aria-label="Priority"
                                    name="priority"
                                    className="my-input"
                                    // className={classes.group}
                                    value={this.state.priority}
                                    onChange={this.handleChange}>
                                    <FormControlLabel value="low" control={<Radio />} label="Low" />
                                    <FormControlLabel value="normal" control={<Radio />} label="Normal" />
                                    <FormControlLabel value="high" control={<Radio />} label="High" />
                                  </RadioGroup>
                                </FormControl>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="assigned_user_id">Assign user</InputLabel>
                                      <Select
                                        className="my-input"
                                        value={this.state.assigned_user_id}
                                        onChange={this.handleChange}
                                        inputProps={{ name: 'assigned_user_id', id: 'assigned_user_id'}}>
                                      <MenuItem><em>None</em></MenuItem>
                                      {team ? team.map(member => {
                                        return (
                                          <MenuItem 
                                            key={member.user.id}
                                            value={member.user.id}>
                                              {member.user.name}
                                          </MenuItem>
                                        )
                                      }): null }
                                      </Select>
                                  </FormControl>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="milestone_id">Milestone</InputLabel>
                                      <Select
                                        className="my-input"
                                        value={this.state.milestone_id}
                                        onChange={this.handleChange}
                                        inputProps={{ name: 'milestone_id', id: 'milestone_id' }} >
                                      <MenuItem> <em>None</em></MenuItem>
                                        {milestones ? milestones.map(milestone => {
                                          return (
                                          <MenuItem 
                                            key={milestone.id}
                                            value={milestone.id}>
                                            {milestone.title}
                                          </MenuItem>
                                          )
                                        }): null }
                                      </Select>
                                  </FormControl>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                  <TextField
                                      id="date"
                                      label="Due date"
                                      type="date"
                                      className="my-input"
                                      defaultValue={this.state.due_date}
                                      value={this.state.selectedDate}
                                      onChange={this.handleDateChange}
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                    />
                                </GridItem>
                            </GridContainer>
                          </CardBody>
                          <CardFooter>
                            <Button color="primary" type="submit">Edit Ticket</Button>
                          </CardFooter>
                          </form> 
                      )
                    } : null, 
                    {
                      tabName: "Comments",
                      tabIcon: Message,
                      tabContent: (

                        'Comment form'
                      )
                    },
                    this.state.creator_id === this.state.auth_user_id ? {
                        tabName: "Delete",
                        tabIcon: DeleteForever,
                        tabContent: (
                          <CardBody>
                            <Button color="primary" onClick={this.ticketDelete}>Delete ticket</Button>
                          </CardBody>
                        )

                      } 
                      : null,
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
    getTicket: id => dispatch(getTicket(id)),
    updateTicket: (ticket, id) => dispatch(updateTicket(ticket, id)),
    deleteTicket: id => dispatch(deleteTicket(id)),
    getTicketTypes: () => dispatch(getTicketTypes()),
    getTicketStatus: () => dispatch(getTicketStatus()),
  }
}

const mapStateToProps = state => ({ 
  ticket: state.ticket.ticket,
  team: state.ticket.team,
  milestones: state.ticket.milestones,
  isFetching: state.ticket.ticket,
  successMessage: state.ticket.successMessage,
  ticketTypes: state.ticket.ticketTypes,
  ticketStatus: state.ticket.ticketStatus
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(EditTicket)));
  
