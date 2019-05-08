import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { getTeam } from "../../redux/actions/projects/Actions";

// Theme components
import Table from "../theme/Table/Table.jsx";
import Button from "../theme/CustomButtons/Button.jsx";
import CardFooter from "../theme/Card/CardFooter.jsx";
import Snackbar from "../theme/Snackbar/Snackbar.jsx";
import Avatar from "@material-ui/core/Avatar";

// Material UI components
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Person from "@material-ui/icons/Person";

// Icons
import Close from "@material-ui/icons/Close";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import { DangerDialogWrapped } from "../../components";

class ProjectTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.project.id,
      name: this.props.project.name,
      page: 0,
      rowsPerPage: 5,
      ticketRowsPerPage: 5,
      open: false,
      userId: ''
    };
    this.invitePeople = this.invitePeople.bind(this);
  }
  componentWillMount = () => {
    if (this.props.team) {
      this.setState({ team: this.props.team });
    }
  };

  handleClickOpen = (userId) => {
    debugger;
    this.setState({ 
      open: true, 
      userId
    });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  invitePeople = () => {
    this.props.history.push({
      pathname: `/home/project-invite/${this.props.match.params.id}`,
      state: { project_id: this.props.project.id }
    });
  };

  getSuccess = successMessage => {
    this.setState({ successMessage });
    this.showNotification("tr");
    this.props.getTeam(this.props.match.params.id).then(res => {
      debugger;
      this.setState({ team: res.team });
    });
  };

  showNotification = place => {
    var x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      4000
    );
  };

  render() {
    const { classes, creator, successMessage } = this.props;
    const { rowsPerPage, page, team } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, team.length - page * rowsPerPage);

    return (
      <div>
        <Snackbar
          place="tr"
          color="success"
          icon={CheckCircleOutline}
          message={successMessage}
          open={this.state.tr}
          closeNotification={() => this.setState({ tr: false })}
          close
        />
        <Table
          page={page}
          rowsPerPage={team ? team.length : null}
          emptyRows={emptyRows}
          tableHeaderColor="success"
          tableHead={
            creator ? ["", "Name", "Role", "Remove"] : ["", "Name", "Role", ""]
          }
          tableData={[
            team
              ? team.map(person => {
                  return person.user
                    ? [
                        person.user.avatar ? (
                          <img
                            src={person.user.avatar}
                            alt="user"
                            style={{
                              display: "block",
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%"
                            }}
                          />
                        ) : (
                          <Avatar stye={{ width: "30px", height: "30px" }}>
                            <Person />
                          </Avatar>
                        ),
                        `${person.user.name}`,
                        `${
                          person.role
                            ? person.role.role
                            : person.role_id
                            ? "Creator/Admin"
                            : null
                        }`,
                        person.role_id !== 1 && creator ? (
                          <div>
                            <Tooltip
                              id="tooltip-top-start"
                              title="Remove"
                              placement="top"
                              onClick={() => this.handleClickOpen(person.id, this)}
                              classes={{ tooltip: classes.tooltip }}
                            >
                              <IconButton
                                aria-label="Close"
                                className={classes.tableActionButton}
                              >
                                <Close
                                  className={
                                    classes.tableActionButtonIcon +
                                    " " +
                                    classes.close
                                  }
                                />
                              </IconButton>
                            </Tooltip>
                            <DangerDialogWrapped
                              type={"team"}
                              title={
                                "Are you sure you want to remove this user from the team?"
                              }
                              id={person.id}
                              open={this.state.userId == person.id ? this.state.open : false}
                              onClose={this.handleClose}
                              getSuccess={this.getSuccess.bind(this)}
                            />
                          </div>
                        ) : null
                      ]
                    : null;
                })
              : null
          ]}
        />
        {creator ? (
          <CardFooter style={{ justifyContent: "flex-end" }}>
            <Button color="success" onClick={this.invitePeople}>
              Invite people
            </Button>
          </CardFooter>
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { getTeam: id => dispatch(getTeam(id)) };
};
const mapStateToProps = state => ({
  successMessage: state.project.successMessage
});

export default withRouter(connect( mapStateToProps, mapDispatchToProps )(ProjectTeam));
