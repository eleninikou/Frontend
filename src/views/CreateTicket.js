import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import PropTypes from 'prop-types'
import axios from "axios"
import Cookies from "universal-cookie"

// Redux
import { connect } from 'react-redux'
import { ticketCreate, getTicketTypes, getTicketStatus} from '../redux/actions/tickets/Actions'
import { getAllProjects, getProject } from '../redux/actions/projects/Actions'

// Wysiwyg
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// Theme components
import Card from "../components/theme/Card/Card"
import Button from "../components/theme/CustomButtons/Button.jsx"
import GridItem from "../components/theme/Grid/GridItem.jsx"
import CardBody from "../components/theme/Card/CardBody.jsx"
import CardHeader from "../components/theme/Card/CardHeader.jsx"
import CardFooter from "../components/theme/Card/CardFooter.jsx"
import GridContainer from "../components/theme/Grid/GridContainer.jsx"


// Material UI components
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import CircularProgress from '@material-ui/core/CircularProgress'

// Styles
import withStyles from "@material-ui/core/styles/withStyles"
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx"


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
        url: '',
        editorContent: '',
        submitted: false,
        hasError: false,
        user: ''
    }
    this.handleChange = this.handleChange.bind(this);
}

onEditorStateChange = editorState => { this.setState({ editorState }) }

goBack = () => { this.props.history.push({ pathname: `/home/project/${this.state.project_id}`}) }

handleDateChange = event => { this.setState({ selectedDate: event.target.value }) }

submit = event => {
  event.preventDefault()

  // Check that everything is filled in
  if (
    this.state.title && 
    this.state.description &&
    this.state.type_id &&
    this.state.status_id &&
    this.state.project_id &&
    this.state.priority &&
    this.state.selectedDate &&
    this.state.assigned_user_id &&
    this.state.milestone_id
    ) {
  
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
    
    // Create ticket. Redirect back to project
    this.props.ticketCreate(ticket)
    .then(() => {
      if(this.props.successMessage) {
        this.props.history.push({
          pathname: `/home/project/${this.state.project_id}`,
          state: { successMessage: this.props.successMessage}
        })
    }})
  } else { this.setState({ hasError: true }) }
}


// Save img and get url
uploadCallback(file) {
  return new Promise((resolve, reject) => {      
      
    let reader = new FileReader()
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
        const url = process.env.REACT_APP_API_BASE_URL+res.data.url
        resolve({ data: { link: url }})
      })
    }
    reader.readAsDataURL(file)
  })
}



componentWillMount = () => {

    const cookies = new Cookies()
    var user = cookies.get('user')
    this.setState({ user })

    // If redirected from specific project preselect project 
    if (this.props.location.state ? 
        this.props.location.state.project_id || this.props.location.state.backToProject 
      : null
      ) {
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

  // Fetch project to get team, milestones
  if (event.target.name === "project_id" ) {
    this.props.getProject(value)
  }
}


render() {
  const { classes, allProjects, ticketTypes, ticketStatus, project, team } = this.props;
  const { editorState, backToProject, hasError, user } = this.state

  // https://reactgo.com/removeduplicateobjects/
  function getUnique(arr, comp) {
    const unique = arr.map(e => e[comp])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => arr[e]).map(e => arr[e]);
     return unique;
  }
  
  let projects = getUnique(allProjects,'project_id') 
  let team_members = getUnique(team,'user_id')

  let me_and_admin = team_members.filter(member => {
    return member.role_id === 1|| member.user_id === parseInt(user) })


  // Styles to input
  const styles = {
    input: {
      marginBottom: '25px',
      minWidth: '100%'
    }
  }

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
                    <FormControl className={classes.formControl} >                    
                      {hasError && !this.state.title && <FormHelperText id="title">Please select title!</FormHelperText>}
                      <TextField 
                        error={hasError && !this.state.title ? true : false}
                        id="title"
                        name="title" 
                        type="text"
                        label="Title" 
                        style={styles.input}  
                        value={this.state.title}
                        onChange={this.handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        aria-describedby="component-error-text"
                      />
                    </FormControl> 
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                  {projects || project ?
                    <FormControl className={classes.formControl}>                    
                        {hasError && !this.state.project_id && <FormHelperText>Please select project!</FormHelperText>}
                        <TextField
                          error={hasError && !this.state.project_id ? true : false}
                          style={styles.input}
                          select
                          disabled={ backToProject ? true : false}
                          label="Project"
                          variant="outlined"
                          margin="normal"
                          value={this.state.project_id}
                          onChange={this.handleChange}
                          inputProps={{  name: 'project_id',  id: 'project_id' }} >
                            {backToProject ?  
                              <MenuItem  key={project.id} value={project.id}> 
                                {project.name} 
                              </MenuItem>
                          : projects ? projects.map(project => {
                            return  (
                              <MenuItem  key={project.project.id} value={project.project.id}>  
                                {project.project.name} 
                              </MenuItem>
                              )
                            }) : null }
                        </TextField>
                    </FormControl>  
                    : <CircularProgress className="my-spinner" color="primary" /> }
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl className={classes.formControl}>
                      {hasError && !this.state.type_id && <FormHelperText>Please select ticket type!</FormHelperText>}
                        <TextField
                          error={hasError && !this.state.type_id ? true : false}
                          classes={classes}
                          select
                          label="Type"
                          variant="outlined"
                          margin="normal"
                          value={this.state.type_id}
                          onChange={this.handleChange}
                          style={styles.input}
                          inputProps={{ name: 'type_id', id: 'type_id'}} >
                        {ticketTypes ? ticketTypes.map(type => {
                          return <MenuItem key={type.id} value={type.id}> {type.type} </MenuItem>
                        }) : null}
                        </TextField>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl className={classes.formControl}>
                    {hasError && !this.state.status_id && <FormHelperText>Please select ticket status!</FormHelperText>}
                      <TextField
                        error={hasError && !this.state.status_id ? true : false}
                        select
                        label="Status"
                        variant="outlined"
                        margin="normal"
                        value={this.state.status_id}
                        onChange={this.handleChange}
                        style={styles.input}
                        inputProps={{ name: 'status_id', id: 'status_id', }} >
                      {ticketStatus ? ticketStatus.map(status => {
                        return <MenuItem key={status.id} value={status.id}> {status.status} </MenuItem>
                      }) : null}
                      </TextField>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl className={classes.formControl}>
                    {hasError && !this.state.priority && <FormHelperText>Please select priority!</FormHelperText>}
                        <TextField
                          error={hasError && !this.state.priority ? true : false}
                          select
                          label="Priority"
                          variant="outlined"
                          margin="normal"
                          style={styles.input}
                          value={this.state.priority}
                          onChange={this.handleChange}
                          inputProps={{ name: 'priority', id: 'priority' }} >
                            <MenuItem value="low"> low </MenuItem>
                            <MenuItem value="normal"> normal </MenuItem>
                            <MenuItem value="high"> high </MenuItem>
                        </TextField>
                      </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl className={classes.formControl}>
                      {hasError && !this.state.assigned_user_id && <FormHelperText>Assign the ticket to a team member!</FormHelperText>}
                        <TextField
                          error={hasError && !this.state.assigned_user_id ? true : false}
                          select
                          label="Assign user"
                          variant="outlined"
                          margin="normal"
                          style={styles.input}
                          value={this.state.assigned_user_id}
                          onChange={this.handleChange}
                          inputProps={{ name: 'assigned_user_id', id: 'assigned_user_id'}}>
                        
                          {// If admin -> choose from all members
                          project.creator_id === parseInt(user) ? (
                            team_members ? team_members.map(member => {
                              return (
                                <MenuItem key={member.user.id} value={member.user.id}> 
                                  {member.user.name} 
                                </MenuItem>
                              )
                            }) : null
                          ) : (
                            // Choose admin or self
                            me_and_admin ? me_and_admin.map(member => {
                              return (
                                  <MenuItem key={member.user.id} value={member.user.id}> 
                                    {member.user.name} 
                                  </MenuItem>
                              )
                            }) : null
                          )}
                        </TextField>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl className={classes.formControl}>
                      {hasError && !this.state.milestone_id && <FormHelperText>Please select milestone!</FormHelperText>}
                        <TextField
                          error={hasError && !this.state.milestone_id ? true : false}
                          select
                          label="milestone"
                          variant="outlined"
                          margin="normal"
                          style={styles.input}
                          value={this.state.milestone_id}
                          onChange={this.handleChange}
                          inputProps={{ name: 'milestone_id', id: 'milestone_id' }} >
                          {project ? project.milestones ? project.milestones.map(milestone => {
                            return  <MenuItem key={milestone.id} value={milestone.id}> {milestone.title}</MenuItem>
                          }) : null : null}
                        </TextField>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl className={classes.formControl}>
                    {hasError && !this.state.due_date && <FormHelperText>Please select due date!</FormHelperText>}                      
                    <TextField
                        error={hasError && !this.state.selectedDate? true : false}
                        id="date"
                        label="Due date"
                        type="date"
                        variant="outlined"
                        margin="normal"
                        style={styles.input}
                        value={this.state.selectedDate}
                        onChange={this.handleDateChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                  <FormControl className={classes.formControl}>
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
                    </FormControl>
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

TextField.propTypes = { classes: PropTypes.object }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(CreateTicket)))
  

