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
import { getAllTickets } from '../redux/actions/tickets/Actions'
import { connect } from 'react-redux'



class Tickets extends Component {

  componentWillMount() {
    const cookies = new Cookies()
    var token = cookies.get('token')
    this.props.getAllTickets(token, 3);
  }

  componentWillUnmount() {

  }

    render() {
        const { classes, allTickets } = this.props;
        return (
          <div>
            {/* <GridContainer> 
              <GridItem xs={12} sm={12} md={6}>
                <Card>
                  <CardHeader color="warning">
                    <h4 className={classes.cardTitleWhite}>Your tickets</h4>
                  </CardHeader>
                  <CardBody>
                    <Table
                      tableHeaderColor="warning"
                      tableHead={["ID", "Projects", "Priority"]}
                      tableData={[
                          allTickets.tickets ? allTickets.tickets.map(ticket => {
                            return [`${ticket.id}`, `${ticket.project.name}`, `${ticket.priority}` ]
                          }) : ''
                      ]}
                    />
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer> */}
          </div>
        );
      }
}

Tickets.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => { 
  return { 
    getAllTickets: (token, id) => dispatch(getAllTickets(token, id)),

  }
}

const mapStateToProps = state => ({ 
  allTickets: state.ticket.allTickets, 
  isFetching: state.ticket.isFetching
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Tickets));
  

