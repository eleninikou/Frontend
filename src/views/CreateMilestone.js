import React, { Component } from 'react'
import { withRouter } from "react-router-dom"

// Redux
import { connect } from 'react-redux'
import { milestoneCreate } from '../redux/actions/milestones/Actions'
import { getAllProjects, getProject } from '../redux/actions/projects/Actions'

// Theme Components
import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import Card from "../components/theme/Card/Card";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import Button from "../components/theme/CustomButtons/Button.jsx";
import CardFooter from "../components/theme/Card/CardFooter.jsx";
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx";

// Material UI Components
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography } from '@material-ui/core';

// Icon
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";

// Styles
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import '../assets/css/main.css'


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
      backToProject: false
    }
    this.handleChange = this.handleChange.bind(this);
}

submit = event => {
  event.preventDefault();
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
      this.showNotification('tr')
    }
  })
}

showNotification = place => {
  var x = [];
  x[place] = true;
  this.setState(x);
  this.alertTimeout = setTimeout(
    function() {
      x[place] = false;
      this.setState(x);
    }.bind(this), 6000);
}

componentWillMount = () => {
  // If redirected from specific project select project
  if (this.props.location.state ? 
      this.props.location.state.project_id && this.props.location.state.project_name 
      : null) {

    this.setState({ 
      project_id: this.props.location.state.project_id,
      project_name: this.props.location.state.project_name,
      backToProject: true
    })

    this.props.getProject(this.props.location.state.project_id);
  } else {
    this.props.getAllProjects();
  }
}

componentWillUnmount = () => { this.setState({ backToProject: false}) }

goBack = () => {          
  this.props.history.push({ pathname: `/home/project/${this.state.project_id}`})
}

handleChange = event => {
  const { name, value } = event.target;
  this.setState({ [name]: value });
}

handleDateChange = event => { this.setState({ selectedDate: event.target.value }) }
createNewProject = () => { this.props.history.push('/home/create-project/') }

render() {
  const { classes, allProjects, successMessage, project  } = this.props;
  const { project_id, project_name, backToProject } = this.state;

  return (
      <GridContainer>
          <Snackbar
          place="tr"
          color="success"
          icon={CheckCircleOutline}
          message={successMessage}
          open={this.state.tr}
          closeNotification={() => this.setState({ tr: false })}
          close
          /> 
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Create new milestone</h4>
            </CardHeader>
            {allProjects.length || project ? 
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
                      fullWidth
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField 
                      name="focus" 
                      type="text"
                      label="Focus" 
                      className="my-input"
                      value={this.state.focus}
                      onChange={this.handleChange}
                      multiline
                      fullWidth
                      />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                      {backToProject ? 
                      <FormControl className={classes.formControl}>
                        <TextField
                          label="Project"
                          variant="outlined"
                          margin="normal"
                          className="my-input"
                          value={project_name}
                          onChange={this.handleChange}
                          inputProps={{ name: 'project_id', id: 'project_id'}} />
                        </FormControl>
                      :
                      <FormControl className={classes.formControl}>
                        <TextField
                          Select
                          label="Project"
                          variant="outlined"
                          margin="normal"
                          className="my-input"
                          value={project_id}
                          onChange={this.handleChange}
                          inputProps={{ name: 'project_id', id: 'project_id'}} >
                          {allProjects.length ? allProjects.map(project => {
                            return  (
                              <MenuItem key={project.project_id} value={project.project_id}> 
                                {project.project.name} 
                              </MenuItem>
                            )
                            }) : null }
                        </TextField> 
                    </FormControl>}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
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
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="warning" type="submit">Create milestone</Button>
                {backToProject ? 
              <Button color="warning" onClick={this.goBack.bind(this)}>Back to {project_name}</Button>
              : null}
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
      </GridContainer>
    );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(CreateMilestone)));
  

