import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
// Redux
import { connect } from 'react-redux'
import { updateTicket, getTicketTypes, getTicketStatus, deleteTicket } from '../../redux/actions/tickets/Actions'

import CardHeader from "../theme/Card/CardHeader.jsx";
import CardBody from "../theme/Card/CardBody.jsx";
import CardFooter from "../theme/Card/CardFooter.jsx";
import GridContainer from "../theme/Grid/GridContainer.jsx";
import GridItem from "../theme/Grid/GridItem.jsx";
import Button from "../theme/CustomButtons/Button.jsx";

import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

import { Editor } from 'react-draft-wysiwyg';


class EditTicketForm extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        assigned_user_id: this.props.assigned_user_id,
        description: this.props.description,
        due_date: this.props.due_date,
        milestone_id: this.props.milestone_id,
        priority: this.props.priority,
        status_id: this.props.status_id,
        title: this.props.title,
        type_id: this.props.type_id,
        project_id: this.props.project_id,
        project_name: this.props.project_name,
        selectedDate: '',
        editorState: '',
      }
      this.handleChange = this.handleChange.bind(this);
      this.submit = this.submit.bind(this);
      // this.deleteTicket = this.deleteTicket.bind(this);
  }

  componentWillMount = () => {
    this.props.getTicketTypes();
    this.props.getTicketStatus();
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleDateChange = event => {this.setState({ selectedDate: event.target.value }) }

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
    .then(res => { this.setSuccess(res.message) })
  }

  ticketDelete() { 
    this.props.deleteTicket(this.props.match.params.id)
    .then(this.showNotification('tr'))
  }

  setSuccess = successMessage => { this.props.getSuccess(successMessage) }

  render() {
    const { classes, ticketStatus, ticketTypes, team, milestones,  description } = this.props;
    const { editorState } = this.state;

      return (
            <form onSubmit={this.submit}>
              <CardHeader color="primary"> <h4 className={classes.cardTitleWhite}>Edit ticket</h4> </CardHeader>
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
                          disabled
                          name="project" 
                          type="text"
                          label="Project" 
                          className="my-input"
                          value={this.state.project_name}
                          fullWidth />
                      </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                        <FormControl className={classes.formControl}>
                          <TextField
                            select
                            label="Type"
                            variant="outlined"
                            margin="normal"
                            className="my-input"
                            value={this.state.type_id}
                            onChange={this.handleChange}
                            inputProps={{ name: 'type_id', id: 'type_id'}} 
                          >
                            {ticketTypes ? ticketTypes.map(type => {
                              return  <MenuItem key={type.id} value={type.id}> {type.type} </MenuItem>
                            }): null }
                         </TextField>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <FormControl className={classes.formControl}>
                            <TextField
                              select
                              label="Status"
                              variant="outlined"
                              margin="normal"
                              className="my-input"
                              value={this.state.status_id}
                              onChange={this.handleChange}
                              inputProps={{ name: 'status_id', id: 'status_id', }}
                            >
                            {ticketStatus ? ticketStatus.map(status => {
                              return  <MenuItem key={status.id} value={status.id}> {status.status} </MenuItem>}): null}
                            </TextField>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <FormControl className={classes.formControl}>
                            <TextField
                              select
                              label="Milestone"
                              variant="outlined"
                              margin="normal"
                              className="my-input"
                              value={this.state.milestone_id}
                              onChange={this.handleChange}
                              inputProps={{ name: 'milestone_id', id: 'milestone_id' }} 
                            >
                              {milestones ? milestones.map(milestone => {
                                return  <MenuItem key={milestone.id} value={milestone.id}> {milestone.title} </MenuItem>
                              }) : null }
                            </TextField>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                      <FormControl className={classes.formControl}>
                            <TextField
                              select
                              label="Priority"
                              variant="outlined"
                              margin="normal"
                              className="my-input"
                              value={this.state.priority}
                              onChange={this.handleChange}
                              inputProps={{ name: 'priority', id: 'priority' }} 
                              >
                            <MenuItem value="low"> low </MenuItem>
                            <MenuItem value="normal"> normal </MenuItem>
                            <MenuItem value="high"> high </MenuItem>
                            </TextField>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                          <FormControl className={classes.formControl}>
                            <TextField
                              select
                              label="Assinged user"
                              variant="outlined"
                              margin="normal"
                              className="my-input"
                              fullWidth
                              value={this.state.assigned_user_id}
                              onChange={this.handleChange}
                              inputProps={{ name: 'assigned_user_id', id: 'assigned_user_id'}}>
                            {team ? team.map(member => {
                              return  <MenuItem key={member.user.id} value={member.user.id}> {member.user.name} </MenuItem>
                            }): null }
                            </TextField>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <FormControl className={classes.formControl}>
                          <TextField
                              id="date"
                              label="Due date"
                              type="date"
                              className="my-input"
                              fullWidth
                              variant="outlined"
                              defaultValue={this.state.due_date}
                              value={this.state.selectedDate}
                              onChange={this.handleDateChange}
                              InputLabelProps={{ shrink: true }}
                            />
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={this.onEditorStateChange}
                          />
                      </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button color="primary" type="submit"> Save</Button>
                </CardFooter>
                <Button color="danger" onClick={this.deleteTicket} className="my-add-comment-button">Delete ticket</Button>
              </form> 
      )
  }
}


  const mapDispatchToProps = dispatch => { return { 
    updateTicket: (ticket, id) => dispatch(updateTicket(ticket, id)),
    deleteTicket: id => dispatch(deleteTicket(id)),
    getTicketTypes: () => dispatch(getTicketTypes()),
    getTicketStatus: () => dispatch(getTicketStatus()),
   } }

  const mapStateToProps = state => ({
    successMessage: state.ticket.successMessage,
    ticketTypes: state.ticket.ticketTypes,
    ticketStatus: state.ticket.ticketStatus
  });
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditTicketForm))
  