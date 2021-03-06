import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// Redux
import {
  getAllTickets,
  getTicketStatus,
  getTicketTypes
} from "../redux/actions/tickets/Actions";
import { getAllProjects } from "../redux/actions/projects/Actions";
import { connect } from "react-redux";
// Theme components
import Card from "../components/theme/Card/Card";
import Button from "../components/theme/CustomButtons/Button.jsx";
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import CardIcon from "../components/theme/Card/CardIcon.jsx";
import GridItem from "../components/theme/Grid/GridItem.jsx";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import CardFooter from "../components/theme/Card/CardFooter.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
// Material UI components
import Note from "@material-ui/icons/Note";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
//Components
import TicketsTable from "../components/ticket/TicketsTable";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
// Styles
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Cookies from "universal-cookie";

class Tickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 5,
      tickets: [],
      filtredTickets: [],
      type_id: "",
      priority: "",
      status_id: "",
      project_id: "",
      errorMessage: ""
    };
    this.createNewTicket = this.createNewTicket.bind(this);
  }

  componentDidMount() {
    const cookies = new Cookies();
    var token = cookies.get("token");
    this.setState({ token })

    this.props.getAllTickets(token).then(res => {
      if (res.tickets) {
        this.setState({ tickets: res.tickets });
      }
    });
    this.props.getTicketStatus(token);
    this.props.getTicketTypes(token);
    this.props.getAllProjects(token);

    if (
      this.props.location.state ? this.props.location.state.errorMessage : null
    ) {
      this.setState({
        errorMessage: this.props.location.state.errorMessage
      });
      this.showNotification("tr");
    }
  }

  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      6000
    );
  }

  createNewTicket() {
    this.props.history.push("/home/create-ticket");
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { classes, ticketStatus, ticketTypes, allProjects, text, isFetching } = this.props;
    const {
      status_id,
      type_id,
      priority,
      project_id,
      tickets,
      errorMessage
    } = this.state;

    let filteredTickets = tickets
      ? tickets.filter(ticket => {
          return (
            (status_id
              ? parseInt(ticket.status_id) === parseInt(status_id)
              : ticket) &&
            (type_id
              ? parseInt(ticket.type_id) === parseInt(type_id)
              : ticket) &&
            (priority ? ticket.priority === priority : ticket) &&
            (project_id
              ? parseInt(ticket.project_id) === parseInt(project_id)
              : ticket)
          );
        })
      : tickets;

    return (
        isFetching ? (
            <LoadingSpinner text={text}/>
          ) : (
      <GridContainer>
        <Snackbar
          place="tr"
          color="danger"
          icon={CheckCircleOutline}
          message={errorMessage}
          open={this.state.tr}
          closeNotification={() => this.setState({ tr: false })}
          close
        />
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "flex-start"
              }}
            >
              <CardIcon color="primary" style={{ display: "flex" }}>
                <Note style={{ color: "white", marginRight: "10px" }} />
                <h4 className={this.props.classes.cardTitleWhite}>Tickets</h4>
              </CardIcon>
              <GridItem xs={12} sm={12} md={12}>
                <GridContainer style={{ padding: "0px 20px 20px" }}>
                  <GridItem xs={12} sm={12} md={3}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        value={this.state.type_id}
                        select
                        label="Type"
                        onChange={this.handleChange}
                        margin="normal"
                        inputProps={{ name: "type_id", id: "type_id" }}
                      >
                        <MenuItem value={null}>All</MenuItem>
                        {ticketTypes
                          ? ticketTypes.map(type => {
                              return (
                                <MenuItem
                                  key={type.id}
                                  value={type.id}
                                  style={{
                                    display: "flex",
                                    alignItems: "center"
                                  }}
                                >
                                  {type.type}
                                </MenuItem>
                              );
                            })
                          : null}
                      </TextField>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        value={this.state.status_id}
                        select
                        label="Status"
                        onChange={this.handleChange}
                        margin="normal"
                        inputProps={{ name: "status_id", id: "status_id" }}
                      >
                        <MenuItem value={null}>All</MenuItem>
                        {ticketStatus
                          ? ticketStatus.map(status => {
                              return (
                                <MenuItem key={status.id} value={status.id}>
                                  {status.status}
                                </MenuItem>
                              );
                            })
                          : null}
                      </TextField>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        select
                        label="Priority"
                        value={this.state.priority}
                        onChange={this.handleChange}
                        margin="normal"
                        inputProps={{ name: "priority", id: "priority" }}
                      >
                        <MenuItem value={null}>All</MenuItem>
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="normal">Normal</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                      </TextField>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        select
                        label="Project"
                        value={this.state.project_id}
                        onChange={this.handleChange}
                        margin="normal"
                        inputProps={{ name: "project_id", id: "project_id" }}
                      >
                        <MenuItem value={null}>All</MenuItem>
                        {allProjects
                          ? allProjects.map(project => {
                              return (
                                <MenuItem
                                  key={project.project_id}
                                  value={project.project_id}
                                >
                                  {project.project.name}
                                </MenuItem>
                              );
                            })
                          : null}
                      </TextField>
                    </FormControl>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </CardHeader>
            <CardBody>
              <TicketsTable tickets={filteredTickets} classes={classes} />
            </CardBody>
            <CardFooter style={{ justifyContent: "flex-end" }}>
              <Button color="primary" onClick={this.createNewTicket}>
                Create new Ticket
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      )
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllTickets: token => dispatch(getAllTickets(token)),
    getTicketStatus: token => dispatch(getTicketStatus(token)),
    getTicketTypes: token => dispatch(getTicketTypes(token)),
    getAllProjects: token => dispatch(getAllProjects(token))
  };
};

const mapStateToProps = state => ({
  allTickets: state.ticket.allTickets,
  ticketStatus: state.ticket.ticketStatus,
  ticketTypes: state.ticket.ticketTypes,
  allProjects: state.project.allProjects,
  isFetching: state.ticket.isFetching,
  text: state.ticket.text
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(dashboardStyle)(Tickets))
);
