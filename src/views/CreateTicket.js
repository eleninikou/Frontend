import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { ticketCreate, getTicketTypes, getTicketStatus } from '../redux/actions/tickets/Actions'
import { getAllProjects, getProject } from '../redux/actions/projects/Actions'

// Theme components
import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import Card from "../components/theme/Card/Card";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import Button from "../components/theme/CustomButtons/Button.jsx";
import CardFooter from "../components/theme/Card/CardFooter.jsx";
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

// Styles
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";



class CreateTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
        title: '',
        description: '',
        type_id: '',
        status_id: '',
        project_id: '',
        priority: '',
        due_date: '',
        assigned_user_id: '',
        milestone_id: '',
        selectedDate: '',
        project_name: ''
    }
    this.handleChange = this.handleChange.bind(this);
}

submit = event => {
  event.preventDefault();
  
  const ticket = {
    title: this.state.title,
    description: this.state.description,
    type_id: this.state.type_id,
    status_id: this.state.status_id,
    project_id: this.state.project_id,
    priority: this.state.priority,
    due_date: this.state.selectedDate,
    assigned_user_id: this.state.assigned_user_id,
    milestone_id: this.state.milestone_id,
    project_name: this.state.project_name
  };

  this.props.ticketCreate(ticket)
  .then(res => {
    if (!res.error) {
      this.props.history.push('/home/tickets')
    } else {
      console.log(res)
    }

  })
}

componentWillMount = () => {
  this.props.getAllProjects();
  this.props.getTicketTypes();
  this.props.getTicketStatus();
}

handleChange = event => {
  const { name, value } = event.target;
  this.setState({ [name]: value });

  // Fetch project to get available values
  if (event.target.name === "project_id" ) {
    this.props.getProject(value)
  }
}

handleDateChange = event => {
  this.setState({ selectedDate: event.target.value });
};

render() {
  const { classes, allProjects, ticketTypes, ticketStatus, project, team } = this.props;
  return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Create new ticket</h4>
            </CardHeader>
            <form className={classes.form} onSubmit={this.submit}>
            <CardBody>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField 
                      name="title" 
                      type="text"
                      label="Title" 
                      value={this.state.textFieldValue}
                      onChange={this.handleChange}
                      fullWidth />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField 
                      name="description" 
                      type="text"
                      label="Description" 
                      value={this.state.textFieldValue}
                      onChange={this.handleChange}
                      fullWidth />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="project_id">Project</InputLabel>
                        <Select
                          value={this.state.project_id}
                          onChange={this.handleChange}
                          inputProps={{ 
                            name: 'project_id', 
                            id: 'project_id'}} >
                        <MenuItem > <em>None</em></MenuItem>
                        {allProjects ? allProjects.map(project => {
                          return (
                            <MenuItem 
                              key={project.project.id}
                              value={project.project.id}> 
                                {project.project.name}
                            </MenuItem>) 
                          }): null }
                        </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="type_id">Type</InputLabel>
                        <Select
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
                      className={classes.group}
                      value={this.state.priority}
                      onChange={this.handleChange}>
                      <FormControlLabel value="low" control={<Radio />} label="Low" />
                      <FormControlLabel value="normal" control={<Radio />} label="Normal" />
                      <FormControlLabel value="high" control={<Radio />} label="High" />
                    </RadioGroup>
                  </FormControl>
                    {/* <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="priority">priority</InputLabel>
                        <Select
                          value={this.state.priority}
                          onChange={this.handleChange}
                          inputProps={{ name: 'priority', id: 'priority'}}>
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="normal">Normal</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                        </Select>
                    </FormControl> */}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="assigned_user_id">Assign user</InputLabel>
                        <Select
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
                          value={this.state.milestone_id}
                          onChange={this.handleChange}
                          inputProps={{ name: 'milestone_id', id: 'milestone_id' }} >
                        <MenuItem> <em>None</em></MenuItem>
                          {project ? project.milestones ? project.milestones.map(milestone => {
                            return (
                            <MenuItem 
                              key={milestone.id}
                              value={milestone.id}>
                              {milestone.title}
                            </MenuItem>
                            )
                          }): null : null}
                        </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    {/* <FormControl className={classes.formControl}> */}
                    <TextField
                        id="date"
                        label="Due date"
                        type="datetime"
                        value={this.state.selectedDate}
                        onChange={this.handleDateChange}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    {/* </FormControl> */}
                  </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" type="submit">Create Ticket</Button>
            </CardFooter>
            </form> 
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}


const mapDispatchToProps = dispatch => { 
  return {  ticketCreate: project => dispatch(ticketCreate(project)),
            getTicketTypes: () => dispatch(getTicketTypes()),
            getTicketStatus: () => dispatch(getTicketStatus()),
            getAllProjects: () => dispatch(getAllProjects()),
            getProject: id => dispatch(getProject(id)) 
          }
}

const mapStateToProps = state => ({ 
  project: state.project.project,
  team: state.project.team,
  allProjects: state.project.allProjects,
  isFetching: state.project.isFetching,
  ticketTypes: state.ticket.ticketTypes,
  ticketStatus: state.ticket.ticketStatus
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(CreateTicket)));
  

