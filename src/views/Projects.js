import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllProjects } from '../redux/actions/projects/Actions'
import Cookies from 'universal-cookie';

// Theme components
import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import Table from "../components/theme/Table/Table.jsx";
import Card from "../components/theme/Card/Card";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import Button from "../components/theme/CustomButtons/Button.jsx";

// Material UI components
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

// Icons
import Edit from "@material-ui/icons/Edit";
import ExitToApp from "@material-ui/icons/ExitToApp";

// Styles
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";


class Projects extends Component {

  constructor(props) {
    super(props);
    this.state = { auth_user_id: '' }
    this.createNewProject = this.createNewProject.bind(this);
    this.goToProject = this.goToProject.bind(this);
}

  createNewProject() {
    this.props.history.push('/home/create-project/')
  }

  goToProject(id) {
    this.props.history.push(`/home/project/${id}`)
  }

  componentWillMount() {
    const cookies = new Cookies()
    var auth_user_id = cookies.get('user')
    this.setState({ auth_user_id })

    this.props.getAllProjects();
  }

    render() {
      const { classes, allProjects } = this.props;
        return (
          <GridContainer> 
            <Button color="primary"  onClick={this.createNewProject}>Create new Project</Button>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Projects</h4>
                  </CardHeader>
                  <CardBody>
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["Name", "Created", "Open Tickets", "Total Tickets", "Last updated", "Edit", "Details" ]}
                      tableData={[
                        allProjects ? allProjects.map(project => {
                          let active_tickets = project.tickets.filter(ticket => (ticket.status_id !== (7 && 4)))
                            return (
                              project.project ? 
                                  project.project.creator_id == this.state.auth_user_id? 
                                      [`${project.project.name}`, `${project.project.created_at}`, (active_tickets).length, `${(project.tickets).length}`, `${project.updated_at}`,
                                        <Tooltip
                                          id="tooltip-top"
                                          title="Edit Project"
                                          placement="top"
                                          classes={{ tooltip: classes.tooltip }}
                                          onClick={this.goToProject.bind(this, project.project.id)}
                                        >
                                          <IconButton aria-label="Edit" className={classes.tableActionButton}>
                                            <Edit className={ classes.tableActionButtonIcon + " " + classes.edit }/>
                                          </IconButton>
                                        </Tooltip>,
                                        <Tooltip
                                          id="tooltip-top"
                                          title="Go to Project"
                                          placement="top"
                                          classes={{ tooltip: classes.tooltip }}
                                          onClick={this.goToProject.bind(this, project.project.id)}
                                        >
                                          <IconButton aria-label="Go to" className={classes.tableActionButton}>
                                            <ExitToApp className={ classes.tableActionButtonIcon + " " + classes.edit }/>
                                          </IconButton>
                                      </Tooltip>,
                                      ]
                                   :  [`${project.project.name}`, `${project.project.created_at}`, (active_tickets).length, `${(project.tickets).length}`, `${project.updated_at}`]  
                               : null
                              )     
                        }) : null
                      ]}/>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
        );
      }
}


const mapDispatchToProps = dispatch => { 
  return { getAllProjects: () => dispatch(getAllProjects()) }
}

const mapStateToProps = state => ({ 
  allProjects: state.project.allProjects,
  isFetching: state.project.isFetching
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Projects)));
  

