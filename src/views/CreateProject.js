import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
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
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx";

import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";


class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      description: null,
      tr: false
    }
    this.handleChange = this.handleChange.bind(this);
}

submit = event => {
  event.preventDefault();
  const project = {
    name: this.state.name,
    description: this.state.description
  };

  this.props.projectCreate(project)
  .then(res => {
    if (!res.error) {
      console.log(res)
      this.showNotification('tr');
      // this.props.history.push('/home/invite')
    } else {
      console.log(res)
    }
  })
}

componentWillMount = () => {
  const cookies = new Cookies()
  var creator_id = cookies.get('user')
  this.setState({ creator_id})
  var id = window.setTimeout(null, 0);
  while (id--) {
    window.clearTimeout(id);
  }
}

handleChange = event => {
  const { name, value } = event.target;
  this.setState({ [name]: value });
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

render() {
  const { classes, successMessage } = this.props;
  return (
      <GridContainer>
        {successMessage ? 
          <Snackbar
            place="tr"
            color="success"
            message={successMessage}
            open={this.state.tr}
            closeNotification={() => this.setState({ tr: false })}
            close
          />
          : null}
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success">
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
                      className="my-input"
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
                      className="my-input"
                      value={this.state.description}
                      onChange={this.handleChange}
                      multiline
                      fullWidth
                      />
                  </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="success" type="submit">Create Project</Button>
            </CardFooter>
            </form> 
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}


const mapDispatchToProps = dispatch => { 
  return { projectCreate: project => dispatch(projectCreate(project)) }
}

const mapStateToProps = state => ({ 
  successMessage: state.project.successMessage,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(CreateProject)));
  

