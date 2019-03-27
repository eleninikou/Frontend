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
    this.props.getActivity(token);

  }

    render() {
        const { classes, projects, allProjects, allTickets, activity } = this.props;
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
                        tableHead={["Date", "Title", "Priority", "Due Date"]}
                        tableData={[
                            activity ? activity.map(A => {
                              return [`${A.created_at}`,
                            ]
                            }) : ''
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
                            }) : ''
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
    logout: (token) => dispatch(logout(token)),
    getProjectsByUser: (token, id) => dispatch(getProjectsByUser(token, id)),
    getAllProjects: (token, id) => dispatch(getAllProjects(token, id)),
    getAllTickets: (token, id) => dispatch(getAllTickets(token, id)),
    getActivity: (token) => dispatch(getActivity(token))
  }
}

const mapStateToProps = state => ({ 
  projects: state.project.projects, 
  allProjects: state.project.allProjects,
  allTickets: state.ticket.allTickets, 
  activity: state.project.activity,
  isFetching: state.project.isFetching
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Dashboard));
  

