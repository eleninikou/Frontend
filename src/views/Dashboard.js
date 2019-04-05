import React, { Component } from 'react'
import PropTypes from "prop-types";
import { withRouter, } from "react-router-dom"
import Cookies from 'universal-cookie'

// Redux
import { connect } from 'react-redux'
import { getAllTickets } from '../redux/actions/tickets/Actions'
import { getProjectsByUser, getAllProjects, getActivity } from '../redux/actions/projects/Actions'
import { logout } from '../redux/actions/auth/Actions'


// Theme components
import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import Table from "../components/theme/Table/Table.jsx";
import Card from "../components/theme/Card/Card";
import CardBody from "../components/theme/Card/CardBody.jsx";
import CustomTabs from "../components/theme/CustomTabs/CustomTabs.jsx";
import Button from "../components/theme/CustomButtons/Button.jsx";

// Material UI components
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import TablePagination from '@material-ui/core/TablePagination';

// Icons
import Note from "@material-ui/icons/Note";
import Today from "@material-ui/icons/Today";
import Timeline from "@material-ui/icons/Timeline";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Comment from "@material-ui/icons/Comment";

// Styles
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import '../assets/css/main.css'



class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 5,
    }
  }



  componentWillMount() {
    this.props.getProjectsByUser();
    this.props.getAllProjects();
    this.props.getActivity();
    this.props.getAllTickets();
  }

  goToTicket(id) { this.props.history.push(`/home/ticket/${id}`) }

  handleChangePage = (event, page) => { this.setState({ page }) }

  handleChangeRowsPerPage = event => { this.setState({ rowsPerPage: event.target.value }) }


  render() {
      const { classes, allTickets, activity } = this.props;
      const { rowsPerPage, page } = this.state;
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, activity.length - page * rowsPerPage);

        return (
          <div>
            <GridContainer> 
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardBody>
                  <CustomTabs
                  headerColor="primary"
                  tabs={[
                    {
                      tabName: "Activity",
                      tabIcon: Today,
                      tabContent: (
                        <CardBody>
                          <Table
                            page={page}
                            rowsPerPage={rowsPerPage}
                            emptyRows={emptyRows}
                            tableHeaderColor="primary"
                            tableHead={[" ", "Project", "Type", "Date"]}
                            tableData={[ activity ? activity.map(A => {

                                  const icon = '';
                                  switch(A.type) {
                                    case 'milestone':
                                      this.icon = <Timeline style={{color:'#ffa726'}} className={ classes.tableActionButtonIcon + " " + classes.edit }/>
                                      break;
                                    case 'ticket':
                                      this.icon = <Note style={{color:'#ab47bc'}} className={ classes.tableActionButtonIcon + " " + classes.edit }/>
                                      break;
                                    case 'comment':
                                      this.icon = <Comment style={{color:'#00acc1'}} className={ classes.tableActionButtonIcon + " " + classes.edit }/>
                                      break;  
                                    default:
                                      return '';
                                  }
                        
                                  return [
                                    `${A.user.name} ${A.text}`,
                                    `${A.project.name}`,
                                    <IconButton aria-label="Go to" className={classes.tableActionButton}>
                                      {this.icon}
                                    </IconButton>,
                                    `${A.created_at}`,
                                  ]
                                }) : null
                            ]}
                          />
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 20]}
                            component="div"
                            count={activity.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{
                              'aria-label': 'Previous Page',
                            }}
                            nextIconButtonProps={{
                              'aria-label': 'Next Page',
                            }}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                          />
                        </CardBody>
                      )
                    },{
                      tabName: "Tickets",
                      tabIcon: Note,
                      tabContent: (
                        <div>
                          <Table
                            // page={page}
                            // rowsPerPage={rowsPerPage}
                            // emptyRows={emptyRows}
                            tableHeaderColor="primary"
                            tableHead={["Status", "Title", "Priority", "Due Date", "Details"]}
                            tableData={[
                                allTickets ? allTickets.map(ticket => {
                                  return [
                                    `${ticket.status ? ticket.status.status: null}`, 
                                    `${ticket.title}`, 
                                    `${ticket.priority}`, 
                                    `${ticket.due_date}`, 
                                    <Tooltip
                                    id="tooltip-top"
                                    title="Go to Ticket"
                                    placement="top"
                                    classes={{ tooltip: classes.tooltip }}
                                    onClick={this.goToTicket.bind(this, ticket.id)}
                                    >
                                    {console.log(ticket)}
                                      <IconButton aria-label="Go to" className={classes.tableActionButton}>
                                        <ExitToApp 
                                          className={ classes.tableActionButtonIcon + " " + classes.edit }
                                          style={{color:'#ab47bc'}}
                                        />
                                      </IconButton>
                                    </Tooltip>
                                ] }) : 'hej'
                            ]} />
                            {/* <TablePagination
                              rowsPerPageOptions={[5, 10, 20]}
                              component="div"
                              count={allTickets.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              backIconButtonProps={{
                                'aria-label': 'Previous Page',
                              }}
                              nextIconButtonProps={{
                                'aria-label': 'Next Page',
                              }}
                              onChangePage={this.handleChangePage}
                              onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            /> */}
                        </div>
                      )
                    },
                  ]}/>
                  </CardBody>
                </Card>
              </GridItem>
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
    logout: () => dispatch(logout()),
    getProjectsByUser: () => dispatch(getProjectsByUser()),
    getAllProjects: () => dispatch(getAllProjects()),
    getAllTickets: () => dispatch(getAllTickets()),
    getActivity: () => dispatch(getActivity())
  }
}

const mapStateToProps = state => ({ 
  projects: state.project.projects, 
  allProjects: state.project.allProjects,
  allTickets: state.ticket.allTickets, 
  activity: state.project.activity,
  isFetching: state.project.isFetching
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Dashboard)));
  

