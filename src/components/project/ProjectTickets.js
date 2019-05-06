import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";

// Redux
import { connect } from "react-redux";
import {
  getTicketStatus,
  getTicketTypes
} from "../../redux/actions/tickets/Actions";

// Theme components
import Table from "../theme/Table/Table.jsx";
import Button from "../theme/CustomButtons/Button.jsx";
import GridItem from "../theme/Grid/GridItem.jsx";
import CardFooter from "../theme/Card/CardFooter.jsx";
import GridContainer from "../theme/Grid/GridContainer.jsx";

// Material UI components
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import TablePagination from "@material-ui/core/TablePagination";

// Icons
import Warning from "@material-ui/icons/Warning";
import ExitToApp from "@material-ui/icons/ExitToApp";
import BugReport from "@material-ui/icons/BugReport";
import LowPriority from "@material-ui/icons/LowPriority";
import LinearScale from "@material-ui/icons/LinearScale";
import YoutubeSearchedFor from "@material-ui/icons/YoutubeSearchedFor";

class ProjectTickets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type_id: "",
      priority: "",
      status_id: "",
      page: 0,
      rowsPerPage: 5,
      ticketRowsPerPage: 5
    };
  }

  componentWillMount = () => {
    this.props.getTicketStatus();
    this.props.getTicketTypes();
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  goToTicket = id => {
    this.props.history.push({
      pathname: `/home/ticket/${id}`,
      state: { project_id: this.props.project.id }
    });
  };

  // Redirect to create ticket
  createNewTicket = () => {
    this.props.history.push({
      pathname: "/home/create-ticket",
      state: { project_id: this.props.project.id }
    });
  };

  render() {
    const { tickets, classes, ticketStatus, ticketTypes } = this.props;
    const { rowsPerPage, page, status_id, type_id, priority } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, tickets.length - page * rowsPerPage);

    let filteredTickets = tickets
      ? tickets.filter(ticket => {
          return (
            (status_id ? ticket.status_id == status_id : ticket) &&
            (type_id ? ticket.type_id == type_id : ticket) &&
            (priority ? ticket.priority == priority : ticket)
          );
        })
      : tickets;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <GridContainer style={{ padding: "10px 20px 20px" }}>
              <GridItem xs={12} sm={12} md={4}>
                <FormControl className={classes.formControl}>
                  <TextField
                    value={this.state.type_id}
                    select
                    label="Type"
                    onChange={this.handleChange.bind(this)}
                    className="my-select"
                    margin="normal"
                    inputProps={{ name: "type_id", id: "type_id" }}
                  >
                    <MenuItem value={null}>All</MenuItem>
                    {ticketTypes
                      ? ticketTypes.map(type => {
                          return (
                            <MenuItem key={type.id} value={type.id}>
                              {" "}
                              {type.type}{" "}
                            </MenuItem>
                          );
                        })
                      : null}
                  </TextField>
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <FormControl className={classes.formControl}>
                  <TextField
                    value={this.state.status_id}
                    select
                    label="Status"
                    onChange={this.handleChange.bind(this)}
                    className="my-select"
                    margin="normal"
                    inputProps={{ name: "status_id", id: "status_id" }}
                  >
                    <MenuItem value={null}>All</MenuItem>
                    {ticketStatus
                      ? ticketStatus.map(status => {
                          return (
                            <MenuItem key={status.id} value={status.id}>
                              {" "}
                              {status.status}{" "}
                            </MenuItem>
                          );
                        })
                      : null}
                  </TextField>
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <FormControl className={classes.formControl}>
                  <TextField
                    select
                    label="Priority"
                    value={this.state.priority}
                    onChange={this.handleChange.bind(this)}
                    className="my-select"
                    margin="normal"
                    inputProps={{ name: "priority", id: "priority" }}
                  >
                    <MenuItem value={null}>All </MenuItem>
                    <MenuItem value="low"> Low </MenuItem>
                    <MenuItem value="normal"> Normal </MenuItem>
                    <MenuItem value="high"> High</MenuItem>
                  </TextField>
                </FormControl>
              </GridItem>
            </GridContainer>
            <Table
              page={page}
              rowsPerPage={rowsPerPage}
              emptyRows={emptyRows}
              tableHeaderColor="success"
              tableHead={[
                "Title",
                "Type",
                "Priority",
                "Assigned to",
                "Status",
                "Due date",
                "Details"
              ]}
              tableData={[
                filteredTickets.map(ticket => {
                  return [
                    `${ticket.title}`,
                    <Tooltip
                      id="tooltip-top-start"
                      title={ticket.type.type}
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Avatar
                        style={{
                          backgroundColor: "#8e24aa",
                          height: "30px",
                          width: "30px"
                        }}
                      >
                        {ticket.type_id === 1 ? (
                          <BugReport style={{ fontSize: "18px" }} />
                        ) : ticket.type_id === 2 ? (
                          <LowPriority style={{ fontSize: "18px" }} />
                        ) : ticket.type_id === 3 ? (
                          <LinearScale style={{ fontSize: "18px" }} />
                        ) : (
                          <YoutubeSearchedFor style={{ fontSize: "18px" }} />
                        )}
                      </Avatar>
                    </Tooltip>,
                    `${ticket.priority}`,
                    `${
                      ticket.assigned_user
                        ? ticket.assigned_user.name
                        : "No one"
                    }`,
                    `${ticket.status.status}`,
                    `${moment(ticket.due_date).format("YYYY-MM-DD")}`,
                    <Tooltip
                      id="tooltip-top"
                      title="Go to Ticket"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                      onClick={this.goToTicket.bind(this, ticket.id)}
                    >
                      <IconButton
                        aria-label="Go to"
                        className={classes.tableActionButton}
                      >
                        <ExitToApp
                          style={{ color: "#66bb6a" }}
                          className={
                            classes.tableActionButtonIcon + " " + classes.edit
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  ];
                })
              ]}
            />
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={tickets ? tickets.length : null}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{ "aria-label": "Previous Page" }}
              nextIconButtonProps={{ "aria-label": "Next Page" }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
            <CardFooter style={{ justifyContent: "flex-end" }}>
              <Button color="success" onClick={this.createNewTicket.bind(this)}>
                Create new Ticket
              </Button>
            </CardFooter>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTicketStatus: () => dispatch(getTicketStatus()),
    getTicketTypes: () => dispatch(getTicketTypes())
  };
};

const mapStateToProps = state => ({
  successMessage: state.ticket.successMessage,
  ticketStatus: state.ticket.ticketStatus,
  ticketTypes: state.ticket.ticketTypes
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectTickets)
);
