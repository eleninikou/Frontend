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
import CustomInput from "../components/theme/CustomInput/CustomInput.jsx";
import CardFooter from "../components/theme/Card/CardFooter.jsx";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import { getProjectsByUser } from '../redux/actions/projects/Actions'
import { connect } from 'react-redux'



class Invite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_name: null,
      email: null,
      token: '',
      userId: ''
    }

}

  componentWillMount() {
    const cookies = new Cookies()
    var token = cookies.get('token')
    var userId = cookies.get('user')
    this.props.getProjectsByUser(token, userId);

    // Fetch projects by user -> dropdown 
    // fetch roles -> dropdown
    // fetch team
  }

  handleChange = event => {
    debugger;
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
  const { classes, projects } = this.props;
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Invite people to join this project</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="project_name">Project</InputLabel>
                    <Select
                      value={this.state.project_name}
                      onChange={this.handleChange}
                      inputProps={{
                        name: 'project_name',
                        id: 'project_name',
                      }}
                    >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {projects.projects ? projects.projects.map(project => {
                      return <MenuItem value={project.name}>{project.name}</MenuItem>
                    }): null}
                    </Select>
                </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Email"
                    id="Email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={this.handleChange}
                    name="Email"
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Invite</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>The team</h4>
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
        );
      }
}

Invite.propTypes = { classes: PropTypes.object.isRequired };

const mapDispatchToProps = dispatch => { 
  return { getProjectsByUser: (token, id) => dispatch(getProjectsByUser(token, id)) }
}

const mapStateToProps = state => ({ 
  projects: state.project.projects, 
  isFetching: state.project.isFetching
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Invite)));
  


