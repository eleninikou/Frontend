import React, { Component } from 'react'
import PropTypes from "prop-types";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";


import Button from "../components/theme/CustomButtons/Button.jsx";

// core components
import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import Table from "../components/theme/Table/Table.jsx";
import Card from "../components/theme/Card/Card";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import Cookies from 'universal-cookie'

import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import { getProjectsByUser, getAllProjects } from '../redux/actions/projects/Actions'
import { logout } from '../redux/actions/auth/Actions'

import { connect } from 'react-redux'



class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      token: '',
      userId: '' 
  }
    this.logout = this.logout.bind(this);

}
  logout() {
    this.props.logout(this.state.token).then(res => {
      const cookies = new Cookies()
      cookies.remove('token')
      cookies.remove('user')
      console.log(res)
      debugger;
      if(!res.error) {
        this.props.history.push('/')
      }
    })
  }


  componentWillMount() {
    const cookies = new Cookies()
    var token = cookies.get('token')
    var userId = cookies.get('user')
    this.setState({ 
      token: token,
      userId: userId
    })
    this.props.getProjectsByUser(token, userId);
    this.props.getAllProjects(token, userId);
  }

    render() {
        const { classes, projects, allProjects } = this.props;
        return (
          <div>
            <Button onClick={this.logout}>Logout</Button>
            <GridContainer> 
              <GridItem xs={12} sm={12} md={6}>
                <Card>
                  <CardHeader color="warning">
                    <h4 className={classes.cardTitleWhite}>Projects created by you</h4>
                  </CardHeader>
                  <CardBody>
                    <Table
                      tableHeaderColor="warning"
                      tableHead={["ID", "Name"]}
                      tableData={[
                          projects.projects ? projects.projects.map(project => {
                            return [`${project.id}`, `${project.name}`]
                          }) : '' ]}
                    />
                  </CardBody>
                </Card>
              </GridItem>
              {/* <GridItem xs={12} sm={12} md={6}>
                <Card>
                  <CardHeader color="warning">
                    <h4 className={classes.cardTitleWhite}>Active Projects</h4>
                  </CardHeader>
                  <CardBody>
                    {console.log(allProjects)}
                    <Table
                      tableHeaderColor="warning"
                      tableHead={["ID", "Name", "Description"]}
                      tableData={[
                          allProjects.projects ? allProjects.projects.map(project => {
                            return [`${project.project.id}`, `${project.project.name}`, `${project.project.description}` ]
                            
                          }) : ''
                        // ]}
                      ]}
                    />
                  </CardBody>
                </Card>
              </GridItem> */}
            </GridContainer>
            <GridContainer>
            {/* <GridItem xs={12} sm={12} md={6}>
                <CustomTabs
                  title="Tasks:"
                  headerColor="primary"
                  tabs={[
                    {
                      tabName: "Bugs",
                      tabIcon: BugReport,
                      tabContent: (
                        <Tasks
                          checkedIndexes={[0, 3]}
                          tasksIndexes={[0, 1, 2, 3]}
                          tasks={bugs}
                        />
                      )
                    },
                    {
                      tabName: "Website",
                      tabIcon: Code,
                      tabContent: (
                        <Tasks
                          checkedIndexes={[0]}
                          tasksIndexes={[0, 1]}
                          tasks={website}
                        />
                      )
                    },
                    {
                      tabName: "Server",
                      tabIcon: Cloud,
                      tabContent: (
                        <Tasks
                          checkedIndexes={[1]}
                          tasksIndexes={[0, 1, 2]}
                          tasks={server}
                        />
                      )
                    }
                  ]}
                />
              </GridItem> */}
            </GridContainer>
          </div>
        );
      }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => { 
  return { 
    logout: (token) => dispatch(logout(token)),
    getProjectsByUser: (token, id) => dispatch(getProjectsByUser(token, id)),
    getAllProjects: (token, id) => dispatch(getAllProjects(token, id)),

  }
}

const mapStateToProps = state => ({ 
  projects: state.project.projects, 
  allProjects: state.project.allProjects,
  isFetching: state.project.isFetching
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Dashboard));
  

