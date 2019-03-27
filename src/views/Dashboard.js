import React, { Component } from 'react'
import PropTypes from "prop-types";
import { withRouter, } from "react-router-dom"

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

import Button from "../components/theme/CustomButtons/Button.jsx";

// core components
import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import Table from "../components/theme/Table/Table.jsx";
import Card from "../components/theme/Card/Card";
import CardBody from "../components/theme/Card/CardBody.jsx";
import Cookies from 'universal-cookie'
import CustomTabs from "../components/theme/CustomTabs/CustomTabs.jsx";
import Note from "@material-ui/icons/Note";
import Today from "@material-ui/icons/Today";

import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";

import { getAllTickets } from '../redux/actions/tickets/Actions'
import { getProjectsByUser, getAllProjects, getActivity } from '../redux/actions/projects/Actions'
import { logout } from '../redux/actions/auth/Actions'

import { connect } from 'react-redux'



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
      console.log(res)
      debugger;
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
        const { allTickets, activity } = this.props;
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
                        tableHead={["Date", " ", "", "Type"]}
                        tableData={[
                            activity ? activity.map(A => {
                              return [
                                `${A.created_at}`,
                                `${A.user.name} ${A.text}`,
                                ` in ${A.project.name}`,
                                `${A.type}`
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
  

