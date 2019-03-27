import React, { Component } from 'react'
import { withRouter } from "react-router-dom"

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

import { getProject } from '../redux/actions/projects/Actions'
import { connect } from 'react-redux'

class EditMilestone extends Component {
    constructor(props) {
      super(props);
      this.state = {
      }
  
      // this.createNewProject = this.createNewProject.bind(this);
  }
  
    componentWillMount() {
      const cookies = new Cookies()
      var token = cookies.get('token')
      // this.props.getTicket(token, 3);
    }
  
      render() {
          const { classes, project } = this.props;
          return (
            <div>
              {console.log(project)}
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
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Description"
                            id="description"
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                    <CardFooter>
                      <Button color="primary">Create Project</Button>
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


const mapDispatchToProps = dispatch => { 
  return { getProject: (token, id) => dispatch(getProject(token, id)) }
}

const mapStateToProps = state => ({ 
  project: state.project.project,
  isFetching: state.project.isFetching
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(EditMilestone)));
  
