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


import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import { projectCreate } from '../redux/actions/projects/Actions'
import { connect } from 'react-redux'


class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this);

}

// CreateProject action --> invite page
CreateNewProject(event) {
  event.preventDefault();
  const cookies = new Cookies()
  var token = cookies.get('token')
  const project = {
    name: this.state.name,
    description: this.state.description
  };
  this.props.projectCreate(token, project)
  .then(res => {
    console.log(res)
    debugger;
    this.props.history.push('/home/invite')

  })
}

  componentWillMount() {
    const cookies = new Cookies()
    var token = cookies.get('token')
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    debugger;
  }

  render() {
  const { classes } = this.props;
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Create new project</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Name"
                    id="name"
                    name="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={this.handleChange}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Description"
                    id="description"
                    name="description"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={this.handleChange}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={this.CreateNewProject}>Create Project</Button>
            </CardFooter>
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
    </div>
        );
      }
}

CreateProject.propTypes = { classes: PropTypes.object.isRequired };

const mapDispatchToProps = dispatch => { 
  return { projectCreate: (token, project) => dispatch(projectCreate(token, project)) }
}

const mapStateToProps = state => ({ 

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(CreateProject)));
  

