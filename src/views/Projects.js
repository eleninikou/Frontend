import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import PropTypes from "prop-types";

import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import Table from "../components/theme/Table/Table.jsx";
import Card from "../components/theme/Card/Card";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import Cookies from 'universal-cookie';
import Button from "../components/theme/CustomButtons/Button.jsx";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import Edit from "@material-ui/icons/Edit";

import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import { getAllProjects } from '../redux/actions/projects/Actions'
import { connect } from 'react-redux'



class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {}

    this.createNewProject = this.createNewProject.bind(this);
    this.editProject = this.editProject.bind(this);

}
  createNewProject() {
    this.props.history.push('/home/create-project')
  }

  editProject() {
    this.props.history.push('/home/edit-project/1')
  }

  componentWillMount() {
    const cookies = new Cookies()
    var token = cookies.get('token')
    var userId = cookies.get('user')
    this.props.getAllProjects(token, userId);
  }

    render() {
        const { classes, allProjects } = this.props;
        return (
          <div>
            <Button onClick={this.createNewProject}>Create new Project</Button>
            <GridContainer> 
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="warning">
                    <h4 className={classes.cardTitleWhite}>Projects</h4>
                  </CardHeader>
                  <CardBody>
                    <Table
                      tableHeaderColor="warning"
                      tableHead={["Name", "Created", "Open Tickets", "Total Tickets", "Last updated", "Edit" ]}
                      tableData={[
                        allProjects.projects ? allProjects.projects.map(project => {
                          if(project.project.creator_id === 4) {
                              return [
                                `${project.project.name}`, 
                                `${project.project.created_at}`, 
                                `${project.project.tickets}`, 
                                `${project.project.tickets}`, 
                                `${project.project.updated_at}`,
                                <Tooltip
                                  id="tooltip-top"
                                  title="Edit Project"
                                  placement="top"
                                  classes={{ tooltip: classes.tooltip }}
                                  onClick={this.editProject}
                                >
                                  <IconButton aria-label="Edit" className={classes.tableActionButton}>
                                    <Edit className={ classes.tableActionButtonIcon + " " + classes.edit }/>
                                  </IconButton>
                                </Tooltip>,
                                // `/home/show-project/${project.project.id}` 
                              ]    
                            } else {
                              return [
                                `${project.project.name}`, 
                                `${project.project.created_at}`, 
                                `${project.project.tickets}`, 
                                `${project.project.tickets}`, 
                                `${project.project.updated_at}`,
                              ]    
                            }
                          }) : '']}
                    />
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        );
      }
}

Projects.propTypes = { classes: PropTypes.object.isRequired };

const mapDispatchToProps = dispatch => { 
  return { getAllProjects: (token, id) => dispatch(getAllProjects(token, id)) }
}

const mapStateToProps = state => ({ 
  allProjects: state.project.allProjects,
  isFetching: state.project.isFetching
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Projects)));
  

