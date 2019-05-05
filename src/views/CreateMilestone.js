import React, { Component } from 'react'
import { withRouter } from "react-router-dom"

// Redux
import { connect } from 'react-redux'
import { milestoneCreate } from '../redux/actions/milestones/Actions'
import { getAllProjects, getProject } from '../redux/actions/projects/Actions'

// Theme Components
import Card from "../components/theme/Card/Card"
import Button from "../components/theme/CustomButtons/Button.jsx"
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx"
import CardBody from "../components/theme/Card/CardBody.jsx"
import GridItem from "../components/theme/Grid/GridItem.jsx"
import CardHeader from "../components/theme/Card/CardHeader.jsx"
import CardFooter from "../components/theme/Card/CardFooter.jsx"
import GridContainer from "../components/theme/Grid/GridContainer.jsx"

// Material UI Components
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import withStyles from "@material-ui/core/styles/withStyles"
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import { Typography } from '@material-ui/core'

// Icon
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline"

// Styles
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx"


class CreateMilestone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      focus: '',
      due_date: '',
      project_id: '',
      selectedDate: '',
      project_name: '',
      backToProject: false,
      hasError: false,
      errorMessage: '',
    }
    this.handleChange = this.handleChange.bind(this)
}

submit = event => {
  event.preventDefault()

  if (
    this.state.title &&
    this.state.focus &&
    this.state.selectedDate &&
    this.state.project_id
  ) {
    const milestone = {
      title: this.state.title,
      focus: this.state.focus,
      due_date: this.state.selectedDate,
      project_id: this.state.project_id,
      backToProject: false
    };


    this.props.milestoneCreate(milestone)
    .then(() => {
      if(this.state.backToProject) {
          if(this.props.successMessage) {
            this.props.history.push({
              pathname: `/home/project/${this.state.project_id}`,
              state: { successMessage: this.props.successMessage}
            })
        }
      } else {
        if(this.props.successMessage) {
          this.props.history.push({
            pathname: '/home/milestones',
            state: { successMessage: this.props.successMessage}
          })
        }
      }
    })
  } else { this.setState({ hasError : true }) }
}

showNotification = place => {
  var x = []
  x[place] = true
  this.setState(x)
  this.alertTimeout = setTimeout(
    function() {
      x[place] = false
      this.setState(x)
    }.bind(this), 6000)
}


componentDidMount = () => {

  // If redirected from specific project preselect project
  if (this.props.location.state ? 
        this.props.location.state.project_id || 
        this.props.location.state.project_name ||
        this.props.location.state.errorMessage : null ) {

        this.setState({ 
          project_id: this.props.location.state.project_id,
          project_name: this.props.location.state.project_name,
          backToProject: true,
          errorMessage: this.props.location.state.errorMessage
        })
        this.showNotification('tr')
        this.props.getProject(this.props.location.state.project_id)

  } else { this.props.getAllProjects() }
}

componentWillUnmount = () => { this.setState({ backToProject: false, successMessage: '' }) }

goBack = () => { this.props.history.push({ pathname: `/home/project/${this.state.project_id}`}) }

handleDateChange = event => { this.setState({ selectedDate: event.target.value }) }

createNewProject = () => { this.props.history.push('/home/create-project/') }

handleChange = event => {
  const { name, value } = event.target
  this.setState({ [name]: value })
}


render() {
  const { classes, allProjects, successMessage, project  } = this.props
  const { project_id, project_name, backToProject, hasError, errorMessage } = this.state
  const projects = allProjects.length ? allProjects.filter(project => project.role_id === 1) : null

  return (
      <GridContainer>
        {errorMessage || successMessage ?
        <Snackbar
          place="tr"
          color="success"
          icon={CheckCircleOutline}
          message={successMessage || errorMessage}
          open={this.state.tr}
          closeNotification={() => this.setState({ tr: false })}
          close
          /> : null}
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Create new milestone</h4>
            </CardHeader>
            {allProjects.length || project ? 
            <form className={classes.form} onSubmit={this.submit}>
            <CardBody>
            <GridContainer>
            <GridItem xs={12} sm={12} md={8} style={{ margin: 'auto'}}>

              <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormControl className={classes.formControl} >                    
                      {hasError && !this.state.title && <FormHelperText id="title">Please select title!</FormHelperText>}
                      <TextField 
                        error={hasError && !this.state.title ? true : false}
                        name="title" 
                        type="text"
                        label="Title" 
                        id="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        fullWidth
                      />
                    </FormControl> 
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                  <FormControl className={classes.formControl} >   
                    {hasError && !this.state.focus && <FormHelperText id="focus">Please select focus!</FormHelperText>}
                    <TextField 
                      error={hasError && !this.state.focus ? true : false}
                      name="focus" 
                      type="text"
                      label="Focus" 
                      id="focus"
                      value={this.state.focus}
                      onChange={this.handleChange}
                      multiline
                      fullWidth
                      />
                    </FormControl> 
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                      <FormControl className={classes.formControl}>
                        {hasError && !project_id && <FormHelperText id="project_id">Please select project!</FormHelperText>}
                        <TextField
                          error={hasError && !project_id ? true : false}
                          select
                          disabled={ backToProject ? true : false}
                          label="Project"
                          margin="normal"
                          value={project_id}
                          onChange={this.handleChange}
                          inputProps={{ name: 'project_id', id: 'project_id'}} >
                          
                          {projects ? projects.map(project => {
                            return  (
                              <MenuItem key={project.project_id} value={project.project_id}> 
                                {project.project.name} 
                              </MenuItem>
                            ) 
                          }) : 
                          <MenuItem key={project.id} value={project.id}> 
                            {project.name} 
                          </MenuItem>
                          }
                        </TextField> 
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormControl className={classes.formControl}>
                    {hasError && !this.state.selectedDate && <FormHelperText id="date">Please select due date!</FormHelperText>}
                    <TextField
                        error={hasError && !this.state.selectedDate ? true : false}
                        id="date"
                        label="Due date"
                        type="date"
                        margin="normal"
                        value={this.state.selectedDate}
                        onChange={this.handleDateChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </FormControl>
                  </GridItem>
              </GridContainer>
              </GridItem>
              </GridContainer>
            </CardBody>

            <CardFooter style={{ justifyContent: 'flex-end'}}>
              <Button color="warning" type="submit">Create milestone</Button>
            </CardFooter>
            </form> 
            : 
            <CardBody>
              <Typography>
                You don't have any active projects yet
              </Typography>
              <GridContainer>
                <GridItem xs={12} sm={2} md={2}>
                  <Button color="warning" onClick={this.createNewProject.bind(this)}>Create new Project</Button>
                </GridItem>
              </GridContainer>
            </CardBody>
          }
          </Card>
        </GridItem>
          {backToProject ? 
              <Button style={{ margin: 'auto'}} color="warning" onClick={this.goBack.bind(this)}>Back to {project_name}</Button>
              : null} 
      </GridContainer>
    )
  }
}


const mapDispatchToProps = dispatch => { 
  return { 
      milestoneCreate: milestone => dispatch(milestoneCreate(milestone)),
      getProject: id => dispatch(getProject(id)),
      getAllProjects: () => dispatch(getAllProjects()) 
    }
}

const mapStateToProps = state => ({ 
    allProjects: state.project.allProjects,
    project: state.project.project,
    successMessage: state.milestone.successMessage
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(CreateMilestone)))
  

