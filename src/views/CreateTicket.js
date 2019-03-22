import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types";

import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import Card from "../components/theme/Card/Card";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import Cookies from 'universal-cookie';
import Button from "../components/theme/CustomButtons/Button.jsx";
// import CustomInput from "../components/theme/CustomInput/CustomInput.jsx";
import CardFooter from "../components/theme/Card/CardFooter.jsx";
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import { ticketCreate, getTicketTypes, getTicketStatus } from '../redux/actions/tickets/Actions'
import { getAllProjects, getProject } from '../redux/actions/projects/Actions'

import { connect } from 'react-redux'


class CreateTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
        token: '',
        creator_id: '',
        title: '',
        description: '',
        type_id: '',
        status_id: '',
        project_id: '',
        priority: '',
        due_date: '',
        assigned_user_id: '',
        milestone_id: '',
    }
    this.handleChange = this.handleChange.bind(this);
}

submit = event => {
  event.preventDefault();
  
  const ticket = {
    creator_id: this.state.creator_id,
    title: this.state.title,
    description: this.state.description,
    type_id: this.state.type_id,
    status_id: this.state.status_id,
    project_id: this.state.project_id,
    priority: this.state.priority,
    due_date: this.state.due_date,
    assigned_user_id: this.state.assigned_user_id,
    milestone_id: this.state.milestone_id,
  };
  debugger;

  this.props.ticketCreate(this.state.token, ticket)
  .then(res => {
    debugger;
    if (!res.error) {
      console.log(res);
    }
  })
}

componentWillMount = () => {
  const cookies = new Cookies()
  var token = cookies.get('token')
  var creator_id = cookies.get('user')
  this.setState({ token, creator_id})
  this.props.getAllProjects(token, creator_id);
  this.props.getTicketTypes(token);
  this.props.getTicketStatus(token);
}

handleChange = event => {
  const { name, value } = event.target;
  this.setState({ [name]: value });
  console.log(value)
  // Fetch project to get available values
  if (event.target.name = "project_id" ) {
    this.props.getProject(this.state.token, value);
  }
}

render() {
  const { classes, allProjects, ticketTypes, ticketStatus, project, team } = this.props;
  {console.log(project)}
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
                          value={this.state.project_name}
                          onChange={this.handleChange}
                          inputProps={{ name: 'project_name', id: 'project_name'}} >
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
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="priority">priority</InputLabel>
                        <Select
                          value={this.state.priority}
                          onChange={this.handleChange}
                          inputProps={{ name: 'priority', id: 'priority'}}>
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                        </Select>
                    </FormControl>
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
                              key={member.id}
                              value={member.id}>
                                {member.name}
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
                      <InputLabel htmlFor="due_date">Due date</InputLabel>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        type="datetime-local"
                        name="due_date"
                        value={this.state.due_date}
                        className={classes.textField}
                        InputLabelProps={{ shrink: true }} />
                    </FormControl>
                  </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" type="submit">Create Ticket</Button>
            </CardFooter>
            </form> 
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}> Your ticket </h4>
            </CardHeader>
            <CardBody>  
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

CreateTicket.propTypes = { classes: PropTypes.object.isRequired };

const mapDispatchToProps = dispatch => { 
  return {  ticketCreate: (token, project) => dispatch(ticketCreate(token, project)),
            getTicketTypes: token => dispatch(getTicketTypes(token)),
            getTicketStatus: token => dispatch(getTicketStatus(token)),
            getAllProjects: (token, id) => dispatch(getAllProjects(token, id)),
            getProject: (token, id) => dispatch(getProject(token, id)) 
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
  

