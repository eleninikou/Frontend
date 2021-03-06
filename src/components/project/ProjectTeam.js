import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { getTeam, getInvitations } from "../../redux/actions/projects/Actions";
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
import Cookies from "universal-cookie";

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
      userId: '',
      token: '',
      invitations: this.props.invitations
    };

    this.invitePeople = this.invitePeople.bind(this);
  }

  componentDidMount = () => {
    const cookies = new Cookies();
    var token = cookies.get("token");
    this.setState({ token })
    if (this.props.team) {
      this.setState({ team: this.props.team });
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickOpen = (userId) => {
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

  setInvitations(invitations) {
    this.setState({ invitations })
  }

  getSuccess = successMessage => {
    this.setState({ successMessage });
    this.showNotification("tr");

    this.props.getTeam(this.props.match.params.id, this.state.token)
    .then(res => {
      this.setState({ team: res.team });
    });
    this.props.getInvitations(this.props.match.params.id, this.state.token)
    .then(res => {
      this.setState({ invitations: res.invitations })
    })
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
    const { classes, creator } = this.props;
    const { rowsPerPage, page, team, successMessage, invitations } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, team ? team.length - page * rowsPerPage : 0);

    return (
      <div>
        <Snackbar
          place="tr"
          color="success"
          icon={CheckCircleOutline}
          message={successMessage ? successMessage : ''}
          open={this.state.tr}
          closeNotification={() => this.setState({ tr: false })}
          close
        />
        <Table
          page={page}
          rowsPerPage={team ? team.length : null}
          emptyRows={emptyRows}
          tableHeaderColor="success"
          tableHead={ creator ? ["", "Name", "Role", "Invitation", "Remove"] : ["", "Name", "Role", "Invitation", ""] }
          tableData={[ 
            team ? team.map(person => {
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
                        'Accepted',
                        person.role_id !== 1 && creator ? (
                          <div>
                            <Tooltip
                              id="tooltip-top-start"
                              title="Remove"
                              placement="top"
                              onClick={() => this.handleClickOpen(person.id, this)}
                              classes={{ tooltip: classes.tooltip }}
                            >
                              <IconButton aria-label="Close" className={classes.tableActionButton} >
                                <Close className={ classes.tableActionButtonIcon + classes.close } />
                              </IconButton>
                            </Tooltip>
                            <DangerDialogWrapped
                              type={"team"}
                              title={"Are you sure you want to remove this user from the team?"}
                              id={person.id}
                              open={this.state.userId == person.id ? this.state.open : false}
                              onClose={this.handleClose.bind(this)}
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
        <Table
          page={page}
          rowsPerPage={invitations ? invitations.length : null}
          emptyRows={emptyRows}
          tableHeaderColor="success"
          tableHead={ creator ? ["Email", "Role", "Invitation", "Remove"] : ["Email", "Role", "Invitation", ""] }
          tableData={[ 
            invitations ? invitations.map(invitation => {
            return [
                `${invitation.email}`,
                `${invitation.role ? invitation.role.role : null}`,
                'Waiting',
                creator ?
                  <div>
                    <Tooltip
                      id="tooltip-top-start"
                      title="Remove invitation"
                      placement="top"
                      onClick={() => this.handleClickOpen(invitation.id, this)}
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton aria-label="Close" className={classes.tableActionButton} >
                      <Close className={ classes.tableActionButtonIcon + classes.close } />
                      </IconButton>
                    </Tooltip>
                    <DangerDialogWrapped
                      type={"invitation"}
                      title={"Are you sure you want to remove this invitation?"}
                      id={invitation.id}
                      open={this.state.userId == invitation.id ? this.state.open : false}
                      onClose={this.handleClose.bind(this)}
                      getSuccess={this.getSuccess.bind(this)}
                      setInvitations={this.setInvitations.bind(this)}
                    />
                  </div>
                  : null
              ]
            }) : null
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

const mapDispatchToProps = dispatch => { return { 
  getTeam: (id, token) => dispatch(getTeam(id, token)),
  getInvitations: (id, token) => dispatch(getInvitations(id, token)),
}
};
const mapStateToProps = state => ({ 
  successMessage: state.project.successMessage,
  invitations: state.project.invitations
 });

export default withRouter(connect( mapStateToProps, mapDispatchToProps )(ProjectTeam));
