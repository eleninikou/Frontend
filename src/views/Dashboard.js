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
import IconButton from "@material-ui/core/IconButton";

// Icons
import Note from "@material-ui/icons/Note";
import Today from "@material-ui/icons/Today";
import Edit from "@material-ui/icons/Edit";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Message from "@material-ui/icons/Message";
import Person from "@material-ui/icons/Person";
import Timeline from "@material-ui/icons/Timeline";

// Styles
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";



class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
}

  logout() {
    this.props.logout().then(res => {
      const cookies = new Cookies()
      cookies.remove('token')
      cookies.remove('user')
      if(!res.error) {
        this.props.history.push('/')
      }
    })
  }


  componentWillMount() {
    this.props.getProjectsByUser();
    this.props.getAllProjects();
    this.props.getActivity();
  }

    render() {
      const { classes, allTickets, activity } = this.props;
        return (
          <div>
            {console.log(activity)}
            <Button onClick={this.logout}>Logout</Button>
            <GridContainer> 
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardBody>
                  <CustomTabs
                  headerColor="primary"
                  tabs={[
                    {
                      tabName: "Feed",
                      tabIcon: Today,
                      tabContent: (
                        <Table
                        tableHeaderColor="primary"
                        tableHead={["Date", " ", "Project", ""]}
                        tableData={[
                            activity ? activity.map(A => {
                              const icon = '';
                              switch(A.type) {
                                case 'milestone':
                                  this.icon = <Timeline style={{color:'#ffa726'}} className={ classes.tableActionButtonIcon + " " + classes.edit }/>
                                  break;
                                case 'ticket':
                                  this.icon = <Note style={{color:'#ab47bc'}} className={ classes.tableActionButtonIcon + " " + classes.edit }/>
                                  break;
                                default:
                                  return '';
                              }

                              return [
                                `${A.created_at}`,
                                `${A.user.name} ${A.text}`,
                                `${A.project.name}`,
                                <IconButton aria-label="Go to" className={classes.tableActionButton}>
                                  {this.icon}
                                </IconButton>
                            ]
                            }) : null
                        ]}
                        />
                      )
                    },{
                      tabName: "Tickets",
                      tabIcon: Note,
                      tabContent: (
                        <Table
                        tableHeaderColor="primary"
                        tableHead={["Status", "Title", "Priority", "Due Date"]}
                        tableData={[
                            allTickets.tickets ? allTickets.tickets.map(ticket => {
                              return [`${ticket.status.status}`, `${ticket.title}`, `${ticket.priority}`, `${ticket.due_date}`,
                            ]
                            }) : null
                        ]}
                        />
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
  

