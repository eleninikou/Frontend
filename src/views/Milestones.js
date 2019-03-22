import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
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



class Milestones extends Component {
  constructor(props) {
    super(props);

    this.state = {
        token: '',
        userId: ''
    }

    this.createNewMilestone = this.createNewMilestone.bind(this);
    this.editMilestone = this.editMilestone.bind(this);

}
  createNewMilestone() {
    this.props.history.push('/home/create-milestone')
  }

  editMilestone() {
    this.props.history.push('/home/milestones/edit')
  }

  componentWillMount() {
    const cookies = new Cookies()
    var token = cookies.get('token')
    var userId = cookies.get('user')
    this.setState({ userId })
    this.props.getAllProjects(token, userId);
  }

    render() {
        const { classes, allProjects } = this.props;
        {console.log(allProjects)}
        return (
          <div>
            <GridContainer> 
            <Button color="primary"  onClick={this.createNewMilestone}>Create new Milestone</Button>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Milestones</h4>
                  </CardHeader>
                  <CardBody>
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["Project", "Name", "Open Tickets", "Total Tickets", "Last updated", "Edit" ]}
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
                                  onClick={this.editMilestone}
                                >
                                <IconButton
                                  aria-label="Edit"
                                  className={classes.tableActionButton}
                                >
                                <Edit
                                  className={
                                    classes.tableActionButtonIcon + " " + classes.edit
                                  }
                                />
                                </IconButton>
                              </Tooltip>
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

Milestones.propTypes = { classes: PropTypes.object.isRequired };

const mapDispatchToProps = dispatch => { 
  return { getAllProjects: (token, id) => dispatch(getAllProjects(token, id)) }
}

const mapStateToProps = state => ({ 
  allProjects: state.project.allProjects,
  isFetching: state.project.isFetching
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Milestones)));
  

