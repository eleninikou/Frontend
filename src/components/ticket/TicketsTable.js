import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
// Theme components
import Table from "../theme/Table/Table.jsx";
import TablePagination from "@material-ui/core/TablePagination";
// Material UI components
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
// Icons
import Warning from "@material-ui/icons/Warning";
import ExitToApp from "@material-ui/icons/ExitToApp";
import BugReport from "@material-ui/icons/BugReport";
import LowPriority from "@material-ui/icons/LowPriority";
import LinearScale from "@material-ui/icons/LinearScale";
import YoutubeSearchedFor from "@material-ui/icons/YoutubeSearchedFor";
import DashboardSpinner from "../spinner/DashboardSpinner";

class TicketsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 5,
      ticketRowsPerPage: 5
    };
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  goToTicket(id) {
    this.props.history.push(`/home/ticket/${id}`);
  }

  render() {
    const { classes, tickets } = this.props;
    const { rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, tickets ? tickets.length : 0 - page * rowsPerPage);

    return tickets.length ? (
      <div>
        <Table
          page={page}
          rowsPerPage={rowsPerPage}
          emptyRows={emptyRows}
          tableHeaderColor="primary"
          tableHead={[
            "Title",
            "Project",
            "Type",
            "Status",
            "Priority",
            "Milestone",
            "Due Date",
            "Details"
          ]}
          tableData={[
            tickets
              ? tickets.map(ticket => {
                  return [
                    `${ticket.title}`,
                    `${ticket.project.name}`,
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
                          width: "30px",
                          marginRight: "20px"
                        }}
                      >
                        {ticket.type ? ticket.type.type == 'Bug' ? (
                          <BugReport style={{ fontSize: "18px" }} />
                        ) : ticket.type.type == 'Future request' ? (
                          <LowPriority style={{ fontSize: "18px" }} />
                        ) : ticket.type.type == 'Idea' ? (
                          <LinearScale style={{ fontSize: "18px" }} />
                        ) : (
                          <YoutubeSearchedFor style={{ fontSize: "18px" }} />
                        ): null }
                      </Avatar>
                    </Tooltip>,
                    `${ticket.status.status}`,
                    `${ticket.priority}`,
                    `${ticket.milestone ? ticket.milestone.title : "-"}`,
                    `${moment(ticket.due_date).format("YYYY-MM-DD")}`,
                    <Tooltip
                      id="tooltip-top"
                      title="Go To Ticket"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                      onClick={this.goToTicket.bind(this, ticket.id)}
                    >
                      <IconButton
                        aria-label="Edit"
                        className={classes.tableActionButton}
                      >
                        <ExitToApp
                          style={{ color: "#ab47bc" }}
                          className={
                            classes.tableActionButtonIcon + " " + classes.edit
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  ];
                })
              : null
          ]}
        />
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={tickets ? tickets.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{ "aria-label": "Previous Page" }}
          nextIconButtonProps={{ "aria-label": "Next Page" }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    ) : null;
  }
}

export default withRouter(TicketsTable);
