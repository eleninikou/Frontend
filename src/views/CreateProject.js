import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types";
import { projectCreate } from '../redux/actions/projects/Actions'
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

import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";


class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      name: null,
      description: null,
      creator_id: null
    }
    this.handleChange = this.handleChange.bind(this);
}

submit = event => {
  event.preventDefault();
  const project = {
    creator_id: this.state.creator_id,
    name: this.state.name,
    description: this.state.description
  };

  this.props.projectCreate(this.state.token, project)
  .then(res => {
    if (!res.error) {
      this.props.history.push('/home/invite')
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
}

handleChange = event => {
  const { name, value } = event.target;
  this.setState({ [name]: value });
}

render() {
  const { classes } = this.props;
  return (
      <GridContainer>
        {console.log(this.props)}
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Create new project</h4>
            </CardHeader>
            <form className={classes.form} onSubmit={this.submit}>
            <CardBody>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField 
                      name="name" 
                      type="text"
                      label="Name" 
                      value={this.state.name}
                      onChange={this.handleChange}
                      fullWidth
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField 
                      name="description" 
                      type="text"
                      label="Description" 
                      value={this.state.description}
                      onChange={this.handleChange}
                      multiline
                      fullWidth
                      />
                  </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" type="submit">Create Project</Button>
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

CreateProject.propTypes = { classes: PropTypes.object.isRequired };

const mapDispatchToProps = dispatch => { 
  return { projectCreate: (token, project) => dispatch(projectCreate(token, project)) }
}

const mapStateToProps = state => ({ 

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(CreateProject)));
  

