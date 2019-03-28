import React, { Component } from 'react'
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom"

import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import Table from "../components/theme/Table/Table.jsx";
import Card from "../components/theme/Card/Card";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import Cookies from 'universal-cookie'
import Button from "../components/theme/CustomButtons/Button.jsx";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";

import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";

import { getAllTickets } from '../redux/actions/tickets/Actions'
import { connect } from 'react-redux'



class Tickets extends Component {
  constructor(props) {
    super(props);

    this.state = {}
    this.createNewTicket = this.createNewTicket.bind(this);
}

  componentWillMount() {
    this.props.getAllTickets();
  }

  createNewTicket() {
    this.props.history.push('/home/create-ticket')
  }

  goToTicket(id) {
    this.props.history.push(`/home/ticket/${id}`)
  }

    render() {
      const { classes, allTickets } = this.props;
        return (
            <GridContainer> 
            <Button color="primary" onClick={this.createNewTicket}>Create new Ticket</Button>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Your tickets</h4>
                  </CardHeader>
                  <CardBody>
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["Title", "Project", "Type", "Status", "Priority", "Due Date", "Edit"]}
                      tableData={[
                          allTickets.tickets ? allTickets.tickets.map(ticket => {
                            return [`${ticket.title}`,`${ticket.project.name}`, `${ticket.type.type}`, `${ticket.status.status}`,`${ticket.priority}`, `${ticket.due_date}`,
                            <Tooltip
                            id="tooltip-top"
                            title="Go To Ticket"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}
                            onClick={this.goToTicket.bind(this, ticket.id)}
                          >
                            <IconButton aria-label="Edit" className={classes.tableActionButton}>
                              <Edit style={{color:'#ab47bc'}} className={ classes.tableActionButtonIcon + " " + classes.edit }/>
                            </IconButton>
                          </Tooltip>,
                          ]
                          }) : null
                      ]}
                      />
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
        );
      }
}

Tickets.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => { 
  return { getAllTickets: () => dispatch(getAllTickets()) }
}

const mapStateToProps = state => ({ 
  allTickets: state.ticket.allTickets, 
  isFetching: state.ticket.isFetching
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Tickets)));
  

