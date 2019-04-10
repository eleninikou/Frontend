import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import moment from 'moment';
import Cookies from "universal-cookie";
import axios from "axios";

// Redux
import { connect } from 'react-redux'
import { updateTicket, getTicketTypes, getTicketStatus, deleteTicket } from '../../redux/actions/tickets/Actions'

// Theme components
import CardBody from "../theme/Card/CardBody.jsx";
import GridContainer from "../theme/Grid/GridContainer.jsx";
import GridItem from "../theme/Grid/GridItem.jsx";
import Button from "../theme/CustomButtons/Button.jsx";

// Material UI components
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromHTML, convertToRaw, ContentState } from 'draft-js';

import draftToHtml from 'draftjs-to-html';


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
        selectedDate: moment(this.props.due_date).format('YYYY-MM-DD'),
        editorState: '',
      }
      this.handleChange = this.handleChange.bind(this);
      this.submit = this.submit.bind(this);
  }

  componentDidMount = () => {
    this.props.getTicketTypes();
    this.props.getTicketStatus();
    let html = draftToHtml(this.props.description)
    const blocksFromHTML = convertFromHTML(html);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );

    this.setState({
      editorState: EditorState.createWithContent(state)
    })
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  
  onEditorStateChange = editorState => { this.setState({ editorState }) }

  handleDateChange = event => {this.setState({ selectedDate: event.target.value }) }

  uploadCallback(file) {

    return new Promise((resolve, reject) => {      
        let reader = new FileReader();
        reader.onload = () => {
  
          const cookies = new Cookies()
          var token = cookies.get('token')
  
          const formData = new FormData()
          formData.append('file', file)
  
          return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/image`,  
          formData, { headers: { 
            "X-Requested-With": "XMLHttpRequest",
            'Access-Control-Allow-Origin': '*',
            "Authorization": `Bearer ${token}`
          }}).then((res) => {
            console.log(process.env.REACT_APP_API_BASE_URL+res.data.url )
            resolve({ data: { link: process.env.REACT_APP_API_BASE_URL+res.data.url  }});
          })
  
        };
        reject('error')
        reader.readAsDataURL(file);
        })
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
      description: convertToRaw(this.state.editorState.getCurrentContent()),
      due_date: this.date,
      milestone_id: this.state.milestone_id,
      priority: this.state.priority,
      status_id: this.state.status_id,
      title: this.state.title,
      type_id: this.state.type_id,
      project_id: this.state.project_id
    };
    debugger;

    this.props.updateTicket(ticket, this.props.match.params.id)
    .then(res => { this.setSuccess(res.message) })
  }

  ticketDelete() { 
    this.props.deleteTicket(this.props.match.params.id)
    .then(this.showNotification('tr'))
  }

  setSuccess = successMessage => { this.props.getSuccess(successMessage) }

  render() {
    const { classes, ticketStatus, ticketTypes, team, milestones, creator, user } = this.props;
    const { editorState, assigned_user_id } = this.state;


      return (
            <form onSubmit={this.submit}>
                <CardBody>
                  <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                      <div>
                        <TextField 
                          disabled={ user !== creator ? true : false}
                          name="title" 
                          type="text"
                          label="Title" 
                          className="my-input"
                          value={this.state.title}
                          onChange={this.handleChange}
                          fullWidth />
                        </div>
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
                            disabled={ user !== creator ? true : false}
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
                            return  (
                              <MenuItem 
                                disabled={(user === assigned_user_id) && (status.id !== 3) }
                                key={status.id} 
                                value={status.id}> 
                                {status.status} 
                              </MenuItem>
                              )}
                            ): null }
                            </TextField>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <FormControl className={classes.formControl}>
                            <TextField
                              select
                              disabled={ user !== creator ? true : false}
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
                              disabled={ user !== creator ? true : false}
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
                              disabled={ user !== creator ? true : false}
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
                              disabled={ user !== creator ? true : false}
                              className="my-input"
                              fullWidth
                              variant="outlined"
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
                            toolbar = {{
                              image: {
                                uploadEnabled: true,
                                uploadCallback: this.uploadCallback,
                                urlEnabled: true,
                                previewImage: true,
                                alt: { present: false, mandatory: false},
                                defaultSize: {
                                  height: 'auto',
                                  width: 'auto',
                                },
                              }
                            }}
                          />
                        <Button color="primary" type="submit" style={{ float: 'right'}}> Save </Button>
                      </GridItem>
                  </GridContainer>
                </CardBody>

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
  