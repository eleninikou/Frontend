import React, { Component } from 'react'
import { withRouter } from "react-router-dom"

// Redux
import { connect } from 'react-redux'
import { milestoneCreate } from '../redux/actions/milestones/Actions'
import { getAllProjects } from '../redux/actions/projects/Actions'

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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Styles
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";


class CreateMilestone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      focus: '',
      due_date: '',
      project_id: '',
      selectedDate: '',
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

showNotification(place) {
  var x = [];
  x[place] = true;
  this.setState(x);
  this.alertTimeout = setTimeout(
    function() {
      x[place] = false;
      this.setState(x);
    }.bind(this),
    6000
  );
}

componentWillMount = () => {
  this.props.getAllProjects();
      // If redirected from specific project select project
      if (this.props.location.state ? this.props.location.state.project_id : null) {
        this.setState({ 
          project_id: this.props.location.state.project_id ,
          backToProject: true
        })
      }
}

componentWillUnmount = () => {
  this.setState({ backToProject: false})
}

handleChange = event => {
  const { name, value } = event.target;
  this.setState({ [name]: value });
}

handleDateChange = event => { this.setState({ selectedDate: event.target.value }) }

render() {
  const { classes, allProjects, successMessage } = this.props;
  return (
      <GridContainer>
          <Snackbar
          place="tr"
          color="success"
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
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="project_id">Project</InputLabel>
                        <Select
                          className="my-input"
                          value={this.state.project_id}
                          onChange={this.handleChange}
                          inputProps={{ name: 'project_id', id: 'project_id'}} >
                        {allProjects ? allProjects.map(project => {
                          return  <MenuItem key={project.project_id} value={project.project_id}> {project.project.name} </MenuItem>
                          }): null }
                        </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormControl className={classes.formControl}>
                    <TextField
                        id="date"
                        label="Due date"
                        type="date"
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
            </CardFooter>
            </form> 
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}


const mapDispatchToProps = dispatch => { 
  return { 
      milestoneCreate: milestone => dispatch(milestoneCreate(milestone)),
      getAllProjects: () => dispatch(getAllProjects()) 
    }
}

const mapStateToProps = state => ({ 
    allProjects: state.project.allProjects,
    successMessage: state.milestone.successMessage
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(CreateMilestone)));
  

