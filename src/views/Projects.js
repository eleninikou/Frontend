import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
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

    this.state = { userId: null}

    this.createNewProject = this.createNewProject.bind(this);
    this.editProject = this.editProject.bind(this);

}
  createNewProject() {
    this.props.history.push('/home/create-project/')
  }

  editProject(id) {
    this.props.history.push(`/home/edit-project/${id}`)
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
          <div>
            <GridContainer> 
            {console.log(this.props)}
            <Button color="primary"  onClick={this.createNewProject}>Create new Project</Button>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Projects</h4>
                  </CardHeader>
                  <CardBody>
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["Name", "Created", "Open Tickets", "Total Tickets", "Last updated", "Edit" ]}
                      tableData={[
                        allProjects ? allProjects.map(project => {
                          let active_tickets = project.tickets.filter(ticket => (ticket.status_id !== 7) && (ticket.status_id !== 4))
                          return (
                              project.project ? 
                                  project.project.creator_id == this.state.userId ? 
                                      [`${project.project.name}`, `${project.project.created_at}`, (active_tickets).length, `${(project.tickets).length}`, `${project.updated_at}`,
                                        <Tooltip
                                          id="tooltip-top"
                                          title="Edit Project"
                                          placement="top"
                                          classes={{ tooltip: classes.tooltip }}
                                          onClick={this.editProject.bind(this, project.project.id)}
                                        >
                                          <IconButton aria-label="Edit" className={classes.tableActionButton}>
                                            <Edit className={ classes.tableActionButtonIcon + " " + classes.edit }/>
                                          </IconButton>
                                        </Tooltip>,
                                        // `/home/show-project/${project.project.id}` 
                                      ]
                                   :  [`${project.project.name}`, `${project.project.created_at}`, (active_tickets).length, `${(project.tickets).length}`, `${project.updated_at}`]  
                               : null)     
                        }) : null
                      ]}/>
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
  

