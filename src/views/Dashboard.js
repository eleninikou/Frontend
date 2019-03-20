import React, { Component } from 'react'
import PropTypes from "prop-types";
import ChartistGraph from "react-chartist";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";

import Button from "../components/theme/CustomButtons/Button.jsx";

// core components
import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import Table from "../components/theme/Table/Table.jsx";
import Tasks from "../components/theme/Tasks/Tasks.jsx";
import CustomTabs from "../components/theme/CustomTabs/CustomTabs.jsx";
import Danger from "../components/theme/Typography/Danger.jsx";
import Card from "../components/theme/Card/Card";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import CardIcon from "../components/theme/Card/CardIcon.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import CardFooter from "../components/theme/Card/CardFooter.jsx";
import Cookies from 'universal-cookie'

import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { bugs, website, server } from "../variables/general.jsx";

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
  

