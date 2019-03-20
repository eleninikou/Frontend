import React, { Component } from 'react'
import PropTypes from "prop-types";

import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import Table from "../components/theme/Table/Table.jsx";
import Card from "../components/theme/Card/Card";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import Cookies from 'universal-cookie'

import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";

import { getAllTickets } from '../redux/actions/tickets/Actions'
import { connect } from 'react-redux'



class Tickets extends Component {

  componentWillMount() {
    const cookies = new Cookies()
    var token = cookies.get('token')
    var userId = cookies.get('user')
    this.props.getAllTickets(token, userId);
  }


    render() {
        const { classes, allTickets } = this.props;
        return (
          <div>
            <GridContainer> 
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="warning">
                    <h4 className={classes.cardTitleWhite}>Your tickets</h4>
                  </CardHeader>
                  <CardBody>
                    <Table
                      tableHeaderColor="warning"
                      tableHead={["Project", "Type", "Status", "Priority", "Due Date"]}
                      tableData={[
                          allTickets.tickets ? allTickets.tickets.map(ticket => {
                            return [`${ticket.project.name}`, `${ticket.type.type}`, `${ticket.status.status}`,`${ticket.priority}`, `${ticket.due_date}` ]
                          }) : ''
                      ]}
                      url={'/'}
                    />
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
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
  

