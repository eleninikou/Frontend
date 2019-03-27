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

  editMilestone(id) {
    this.props.history.push(`/home/edit-milestones/${id}`)
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
        return (
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
                        tableHead={["Project", "Name", "Focus", "Last updated", "Edit" ]}
                        tableData={
                          allProjects ? allProjects.map(project => {
                            return (
                              project.milestones ? project.milestones.map(milestone => {
                                  return ([
                                  `${project.project.name}`, 
                                  `${milestone.title}`, 
                                  `${milestone.focus}`,
                                  `${milestone.updated_at}`,
                                    project.role_id === 1 ?  
                                      <Tooltip
                                        id="tooltip-top"
                                        title="Edit Project"
                                        placement="top"
                                        classes={{ tooltip: classes.tooltip }}
                                        onClick={this.editMilestone.bind(this, milestone.id)} >
                                        <IconButton
                                            aria-label="Edit"
                                            className={classes.tableActionButton}>
                                          <Edit className={classes.tableActionButtonIcon + " " + classes.edit} />
                                        </IconButton>
                                      </Tooltip>
                                    : null 
                                  ])
                                  }) : null  
                            ) }) : null 
                            } 
                      /> 
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
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
  

