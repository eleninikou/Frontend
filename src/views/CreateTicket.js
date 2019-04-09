import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import PropTypes from 'prop-types';
import axios from "axios";
import Cookies from "universal-cookie";

// Redux
import { connect } from 'react-redux'
import { ticketCreate, getTicketTypes, getTicketStatus} from '../redux/actions/tickets/Actions'
import { getAllProjects, getProject } from '../redux/actions/projects/Actions'

// Wysiwyg
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

// Styles
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import '../assets/css/main.css'


class CreateTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
        title: '',
        description: [],
        type_id: '',
        status_id: '',
        project_id: '',
        priority: '',
        due_date: '',
        assigned_user_id: '',
        milestone_id: '',
        selectedDate: '',
        project_name: '',
        editorState: EditorState.createEmpty(),
        image: '',
        success: false,
        error: false,
        imagePreviewUrl: false,
        url: ''
    }
    this.handleChange = this.handleChange.bind(this);
}

onEditorStateChange = editorState => { this.setState({ editorState }) }

submit = event => {
  event.preventDefault()

  const ticket = {
    title: this.state.title,
    description: convertToRaw(this.state.editorState.getCurrentContent()),
    type_id: this.state.type_id,
    status_id: this.state.status_id,
    project_id: this.state.project_id,
    priority: this.state.priority,
    due_date: this.state.selectedDate,
    assigned_user_id: this.state.assigned_user_id,
    milestone_id: this.state.milestone_id,
  }
  
  this.props.ticketCreate(ticket)
  .then(() => {
    if(this.state.backToProject) {
        if(this.props.successMessage) {
          this.props.history.push({
            pathname: `/home/project/${this.state.project_id}`,
            state: { successMessage: this.props.successMessage}
          })
      }
    } else {
      this.showNotification('tr')
    }
  })
}

uploadCallback(file) {

  return new Promise(
    (resolve, reject) => {
      
      let reader = new FileReader();
      reader.onload = () => {
        this.setState({ image: file })
      };
      reader.readAsDataURL(file);
      
      this.fileUpload(file)
      resolve({ url: this.state.url });
      reject('error')
    } 
    )
}

fileUpload = async (file) => {
  const cookies = new Cookies()
  var token = cookies.get('token')

  const formData = new FormData()
  formData.append('file', file)
  
  await axios.post('http://127.0.0.1:8000/api/tickets/image',  
  formData, { headers: { 
    "X-Requested-With": "XMLHttpRequest",
    'Access-Control-Allow-Origin': '*',
    "Authorization": `Bearer ${token}`
  }}).then((res) => {
    this.setState({ url: res.data.url })
  })
  }



componentWillMount = () => {
    // If redirected from specific project select project
    if (this.props.location.state ? this.props.location.state.project_id || this.props.location.state.backToProject : null) {
      this.setState({ 
        backToProject: true, 
        project_id: this.props.location.state.project_id 
      })
      this.props.getProject(this.props.location.state.project_id)
    } else {
      this.props.getAllProjects();
    }
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

goBack = () => {          
  this.props.history.push({ pathname: `/home/project/${this.state.project_id}`})
}

handleDateChange = event => {this.setState({ selectedDate: event.target.value }) }

render() {
  const { classes, allProjects, ticketTypes, ticketStatus, project, team } = this.props;
  const { editorState, backToProject } = this.state

  // https://reactgo.com/removeduplicateobjects/
  function getUnique(arr, comp) {
    const unique = arr.map(e => e[comp])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => arr[e]).map(e => arr[e]);
     return unique;
  }
  
  let projects = getUnique(allProjects,'project_id')
  let team_members = getUnique(team,'user_id')
  console.log(backToProject)

  return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Create new ticket</h4>
            </CardHeader>
            <form className={classes.form} onSubmit={this.submit}>
            <CardBody>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl className={classes.formControl}>                    
                      <TextField 
                        name="title" 
                        type="text"
                        label="Title" 
                        className="my-input"
                        value={this.state.title}
                        onChange={this.handleChange}
                        fullWidth
                        aria-describedby="component-error-text"
                      />
                    </FormControl> 
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <FormControl className={classes.formControl}>                    
                        <TextField
                          select
                          disabled={ backToProject ? true : false}
                          label="Project"
                          variant="outlined"
                          margin="normal"
                          value={this.state.project_id}
                          onChange={this.handleChange}
                          className="my-input"
                          inputProps={{  name: 'project_id',  id: 'project_id'}} >
                        {project ?  <MenuItem  key={project.id} value={project.id}> {project.name} </MenuItem>
                        : projects ? projects.map(project => {
                          return  <MenuItem  key={project.project.id} value={project.project.id}>  {project.project.name} </MenuItem>
                          }): null }
                        </TextField>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <FormControl className={classes.formControl}>
                        <TextField
                          select
                          label="Type"
                          variant="outlined"
                          margin="normal"
                          value={this.state.type_id}
                          onChange={this.handleChange}
                          className="my-input"
                          inputProps={{ name: 'type_id', id: 'type_id'}} >
                        {ticketTypes ? ticketTypes.map(type => {
                          return <MenuItem key={type.id} value={type.id}> {type.type} </MenuItem>
                        }): null}
                        </TextField>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <FormControl className={classes.formControl}>
                        <TextField
                          select
                          label="Status"
                          variant="outlined"
                          margin="normal"
                          value={this.state.status_id}
                          onChange={this.handleChange}
                          className="my-input"
                          inputProps={{ name: 'status_id', id: 'status_id', }} >
                        {ticketStatus ? ticketStatus.map(status => {
                          return <MenuItem key={status.id} value={status.id}> {status.status} </MenuItem>
                        }): null}
                        </TextField>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                  <FormControl component="fieldset" className={classes.formControl}>
                          <TextField
                            select
                            label="Priority"
                            variant="outlined"
                            margin="normal"
                            className="my-input"
                            value={this.state.priority}
                            onChange={this.handleChange}
                            inputProps={{ name: 'priority', id: 'priority' }} >
                              <MenuItem value="low"> low </MenuItem>
                              <MenuItem value="normal"> normal </MenuItem>
                              <MenuItem value="high"> high </MenuItem>
                          </TextField>
                      </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <FormControl className={classes.formControl}>
                        <TextField
                          select
                          label="Assign user"
                          variant="outlined"
                          margin="normal"
                          value={this.state.assigned_user_id}
                          onChange={this.handleChange}
                          className="my-input"
                          inputProps={{ name: 'assigned_user_id', id: 'assigned_user_id'}}>
                        {team_members ? team_members.map(member => {
                          return <MenuItem key={member.user.id} value={member.user.id}> {member.user.name} </MenuItem>
                        }): null }
                        </TextField>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <FormControl className={classes.formControl}>
                        <TextField
                          select
                          label="milestone"
                          variant="outlined"
                          margin="normal"
                          value={this.state.milestone_id}
                          onChange={this.handleChange}
                          className="my-input"
                          inputProps={{ name: 'milestone_id', id: 'milestone_id' }} >
                          {project ? project.milestones ? project.milestones.map(milestone => {
                            return  <MenuItem key={milestone.id} value={milestone.id}> {milestone.title}</MenuItem>
                          }): null : null}
                        </TextField>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <FormControl className={classes.formControl}>
                    <TextField
                        id="date"
                        label="Due date"
                        type="date"
                        variant="outlined"
                        margin="normal"
                        className="my-input"
                        value={this.state.selectedDate}
                        onChange={this.handleDateChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
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
                              uploadCallback: this.uploadCallback.bind(this),
                              urlEnabled: false
                            }
                          }}
                        />
                  </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" type="submit">Create Ticket</Button>
              {backToProject ? 
              <Button color="primary" onClick={this.goBack.bind(this)}>Back to project</Button>
              : null}
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
            getProject: id => dispatch(getProject(id)),
          }
}

const mapStateToProps = state => ({ 
  project: state.project.project,
  team: state.project.team,
  allProjects: state.project.allProjects,
  isFetching: state.project.isFetching,
  ticketTypes: state.ticket.ticketTypes,
  ticketStatus: state.ticket.ticketStatus,
  successMessage: state.ticket.successMessage,
  url: state.ticket.url
})

TextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(CreateTicket)));
  

