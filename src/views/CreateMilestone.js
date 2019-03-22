import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types";
import { milestoneCreate } from '../redux/actions/milestones/Action'
import { connect } from 'react-redux'

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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { getAllProjects } from '../redux/actions/projects/Actions'


class CreateMilestone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
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
    project_id: this.state.project_id
  };
  this.props.milestoneCreate(this.state.token, milestone)
  .then(res => {
    if (!res.error) {
        console.log(res)
    } else {
      console.log(res)
    }
  })
}

componentWillMount = () => {
  const cookies = new Cookies()
  var token = cookies.get('token')
  var creator_id = cookies.get('user')
  this.setState({ token, creator_id})
  this.props.getAllProjects(token, creator_id);
}

handleChange = event => {
  const { name, value } = event.target;
  this.setState({ [name]: value });
  console.log(value)
}

handleDateChange = event => {
    this.setState({ selectedDate: event.target.value });
  };

render() {
  const { classes, allProjects } = this.props;
  return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Create new milestone</h4>
            </CardHeader>
            <form className={classes.form} onSubmit={this.submit}>
            <CardBody>
              <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="project_id">Project</InputLabel>
                        <Select
                          value={this.state.project_name}
                          onChange={this.handleChange}
                          inputProps={{ name: 'project_id', id: 'project_id'}} >
                        <MenuItem > <em>None</em></MenuItem>
                        {allProjects ? allProjects.map(project => {
                          return (
                            <MenuItem 
                              key={project.project_id}
                              value={project.project_id}> 
                                {project.project.name}
                            </MenuItem>) 
                          }): null }
                        </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField 
                      name="title" 
                      type="text"
                      label="Title" 
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
                      value={this.state.focus}
                      onChange={this.handleChange}
                      multiline
                      fullWidth
                      />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                      <InputLabel htmlFor="due_date">Due date</InputLabel>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl className={classes.formControl}>
                    <TextField
                        id="date"
                        label="Due date"
                        type="date"
                        value={this.state.selectedDate}
                        onChange={this.handleDateChange}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </FormControl>
                  </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" type="submit">Create milestone</Button>
            </CardFooter>
            </form> 
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Info</h4>
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

CreateMilestone.propTypes = { classes: PropTypes.object.isRequired };

const mapDispatchToProps = dispatch => { 
  return { 
      milestoneCreate: (token, milestone) => dispatch(milestoneCreate(token, milestone)),
      getAllProjects: (token, id) => dispatch(getAllProjects(token, id)) 

    }
}

const mapStateToProps = state => ({ 
    allProjects: state.project.allProjects,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(CreateMilestone)));
  

