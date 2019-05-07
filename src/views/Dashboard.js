import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { getAllTickets } from "../redux/actions/tickets/Actions";
import { getActivity, clearDashboard } from "../redux/actions/projects/Actions";
import { logout } from "../redux/actions/auth/Actions";
// Theme components
import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import Table from "../components/theme/Table/Table.jsx";
import Card from "../components/theme/Card/Card";
import CustomTabs from "../components/theme/CustomTabs/CustomTabs.jsx";
import TicketsTable from "../components/ticket/TicketsTable";
// Material UI components
import IconButton from "@material-ui/core/IconButton";
import TablePagination from "@material-ui/core/TablePagination";
// Icons
import Note from "@material-ui/icons/Note";
import Today from "@material-ui/icons/Today";
import Timeline from "@material-ui/icons/Timeline";
import Comment from "@material-ui/icons/Comment";
// Styles
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
// Components
import DashboardSpinner from "../components/spinner/DashboardSpinner";
import Cookies from "universal-cookie";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 5,
      activity: this.props.activity,
      allTickets: this.props.tickets
    };
  }

  componentDidMount() {
    const cookies = new Cookies();
    var token = cookies.get("token");

    this.props.getActivity(token).then(res => {
      if (res.activity) {
        const activities = res.activity.flatMap(activity => activity);
        this.setState({ activity: activities });
      }
    });
    this.props.getAllTickets(token).then(res => {
      if(res.tickets) {
        this.setState({ allTickets: res.tickets })
      }
    });
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.activity !== nextProps.activity) {
      this.setState({ activity: nextProps.activity });
    }
    return true;
  }

  componentWillUnmount() {
    this.setState({ activity: [] });
  }

  goToTicket(id) {
    this.props.history.push(`/home/ticket/${id}`);
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  getSuccess = successMessage => {
    this.setState({ successMessage });
    this.showNotification("tr");
    this.props.getActivity();
  };

  render() {
    const { classes, isFetching } = this.props;
    const { rowsPerPage, page, activity, allTickets } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, activity.length - page * rowsPerPage);

    return isFetching ? (
      <div style={{ width: "100%", textAlign: "center" }}>
        <DashboardSpinner />
      </div>
    ) : (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CustomTabs
                headerColor="primary"
                tabs={[
                  {
                    tabName: "Activity",
                    tabIcon: Today,
                    tabContent: (
                      <div>
                        <Table
                          page={page}
                          rowsPerPage={rowsPerPage}
                          emptyRows={emptyRows}
                          tableHeaderColor="primary"
                          tableHead={[
                            "",
                            "User",
                            "Activity",
                            "Project",
                            "Date",
                            "Type"
                          ]}
                          tableData={[
                            activity
                              ? activity.map(A => {
                                  const icon = "";
                                  switch (A.type) {
                                    case "milestone":
                                      this.icon = (
                                        <Timeline
                                          style={{ color: "#ffa726" }}
                                          className={
                                            classes.tableActionButtonIcon +
                                            " " +
                                            classes.edit
                                          }
                                        />
                                      );
                                      break;
                                    case "ticket":
                                      this.icon = (
                                        <Note
                                          style={{ color: "#ab47bc" }}
                                          className={
                                            classes.tableActionButtonIcon +
                                            " " +
                                            classes.edit
                                          }
                                        />
                                      );
                                      break;
                                    case "comment":
                                      this.icon = (
                                        <Comment
                                          style={{ color: "#00acc1" }}
                                          className={
                                            classes.tableActionButtonIcon +
                                            " " +
                                            classes.edit
                                          }
                                        />
                                      );
                                      break;
                                    default:
                                      return "";
                                  }

                                  return [
                                    <img
                                      src={A.user.avatar}
                                      alt="user"
                                      style={{
                                        display: "block",
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "50%"
                                      }}
                                    />,
                                    `${A.user.name}`,
                                    `${A.text}`,
                                    `${A.project.name}`,
                                    `${A.created_at}`,
                                    <IconButton
                                      aria-label="Go to"
                                      className={classes.tableActionButton}
                                    >
                                      {this.icon}
                                    </IconButton>
                                  ];
                                })
                              : null
                          ]}
                        />
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 20]}
                          component="div"
                          count={activity.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          backIconButtonProps={{
                            "aria-label": "Previous Page"
                          }}
                          nextIconButtonProps={{
                            "aria-label": "Next Page"
                          }}
                          onChangePage={this.handleChangePage}
                          onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                      </div>
                    )
                  },
                  {
                    tabName: " My Tickets",
                    tabIcon: Note,
                    tabContent: (
                      <TicketsTable
                        tickets={allTickets}
                        classes={classes}
                        getSuccess={this.getSuccess.bind(this)}
                      />
                    )
                  }
                ]}
              />
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = { classes: PropTypes.object.isRequired };

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    getAllTickets: token => dispatch(getAllTickets(token)),
    getActivity: token => dispatch(getActivity(token)),
    clearDashboard: () => dispatch(clearDashboard())
  };
};

const mapStateToProps = state => ({
  allTickets: state.ticket.allTickets,
  activity: state.project.activity,
  isFetching: state.project.isFetching
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(dashboardStyle)(Dashboard))
);
