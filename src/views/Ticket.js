import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import ImageGallery from "react-image-gallery";
// Redux
import { connect } from "react-redux";
import { getTicket } from "../redux/actions/tickets/Actions";
import { getUser } from "../redux/actions/auth/Actions";
// Theme components
import Card from "../components/theme/Card/Card";
import Button from "../components/theme/CustomButtons/Button.jsx";
import CardIcon from "../components/theme/Card/CardIcon.jsx";
import GridItem from "../components/theme/Grid/GridItem.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx";
import CardFooter from "../components/theme/Card/CardFooter.jsx";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
// Material UI components
import withStyles from "@material-ui/core/styles/withStyles";
// Components
import {
  TicketIconList,
  TicketContent,
  EditTicketForm,
  TicketComments,
  AddComment
} from "../components";
import DashboardSpinner from "../components/spinner/DashboardSpinner";
// Icon
import Edit from "@material-ui/icons/Edit";
import Comment from "@material-ui/icons/Comment";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
// Styles
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import "react-image-gallery/styles/css/image-gallery.css";
import { Typography } from "@material-ui/core";

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: "",
      user: "",
      edit: "",
      ButtonText: "Update Ticket",
      editorState: "",
      addComment: false,
      ButtonTextComment: "Add Comment",
      CommentText: "Show Comments",
      showComments: true,
      successMessage: "",
      description: ""
    };
  }

  componentDidMount = () => {
    const cookies = new Cookies();
    var token = cookies.get("token");

    // Fetch ticket and set to state
    this.props.getTicket(this.props.match.params.id, token).then(res => {
      if (!res.ticket)
        // If no ticket, redirect with notification message
        this.props.history.push({
          pathname: "/home/tickets",
          state: { errorMessage: "There is no ticket with that id" }
        });
    });

    // Notification bar
    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }

    // Get loged in user for comments
    const user = cookies.get("user");
    this.props.getUser(user);

    this.setState({ edit: false });
  };

  // Show notification bar
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

  // Toggle editform and button text
  showForm = event => {
    this.state.edit
      ? this.setState({ edit: false, ButtonText: "Edit Ticket" })
      : this.setState({ edit: true, ButtonText: "Close edit" });

    if (this.state.showComments || this.state.addComment) {
      this.setState({
        showComments: false,
        CommentText: "Show Comments",
        addComment: false,
        ButtonTextComment: "Add Comment"
      });
    }
  };

  // Toggle comments and button text
  showComments = event => {
    this.state.showComments
      ? this.setState({ showComments: false, CommentText: "Show Comments" })
      : this.setState({
          showComments: true,
          CommentText: "Hide Comments",
          edit: false,
          ButtonText: "Update Ticket"
        });
  };

  // Toogle comment form and button text
  showCommentForm = event => {
    this.state.addComment
      ? this.setState({ addComment: false, ButtonTextComment: "Add Comment" })
      : this.setState({
          addComment: true,
          ButtonTextComment: "Close",
          edit: false,
          ButtonText: "Update Ticket"
        });
  };

  hideForm = hide => {
    this.setState({ addComment: hide, ButtonTextComment: "Add Comment" });
    this.setState({ showComments: true, CommentText: "Hide Comments" });
  };

  // show notification and update component
  getSuccess = successMessage => {
    const cookies = new Cookies();
    var token = cookies.get("token");

    this.setState({ successMessage });
    this.showNotification("tr");
    this.props.getTicket(this.props.match.params.id, token).then(res => {
      if (res.ticket) {
        this.setState({
          assigned_user_id: res.ticket.assigned_user_id,
          description: res.ticket.description,
          due_date: res.ticket.due_date,
          milestone_id: res.ticket.milestone_id,
          priority: res.ticket.priority,
          status_id: res.ticket.status_id,
          title: res.ticket.title,
          type_id: res.ticket.type_id,
          project_name: res.ticket.project.name,
          project_id: res.ticket.project_id,
          creator: res.ticket.project.creator_id,
          ticket: res.ticket,
          comment: null,
          edit: false,
          ButtonText: "Edit Ticket"
        });
      }
    });
  };

  render() {
    const {
      classes,
      team,
      milestones,
      isFetching,
      comments,
      ticket,
      description,
      user,
      images
    } = this.props;

    const {
      edit,
      ButtonText,
      addComment,
      ButtonTextComment,
      successMessage,
      CommentText,
      showComments
    } = this.state;

    // To display lightgallery images
    var galleryImages = [
      images
        ? images.map(image => {
            return { original: image.attachment, thumbnail: image.attachment };
          })
        : null
    ];

    return (
      <div>
        {/* Display Success message */}
        <Snackbar
          place="tr"
          color="success"
          icon={CheckCircleOutline}
          message={successMessage}
          open={this.state.tr}
          closeNotification={() => this.setState({ tr: false })}
          close
        />

        {isFetching ? (
          <div style={{ width: "100%", textAlign: "center" }}>
            <DashboardSpinner />
          </div>
        ) : (
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                {ticket ? (
                  <div>
                    <CardHeader color="primary">
                      <h4
                        className={classes.cardTitleWhite}
                        style={{ fontSize: "2em" }}
                      >
                        {" "}
                        Ticket | {ticket.title}{" "}
                      </h4>
                      <h4 className={classes.cardTitleWhite}>
                        {ticket.type ? ticket.type.type : null}
                      </h4>
                    </CardHeader>
                    <CardBody>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={5}>
                          {ticket ? (
                            <TicketIconList ticket={ticket} classes={classes} />
                          ) : (
                            <div style={{ width: "100%", textAlign: "center" }}>
                              <DashboardSpinner />
                            </div>
                          )}
                        </GridItem>
                        <GridItem xs={12} sm={12} md={7}>
                          {description ? (
                            <TicketContent description={description} />
                          ) : (
                            <div style={{ width: "100%", textAlign: "center" }}>
                              <DashboardSpinner />
                            </div>
                          )}
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          {images.length ? (
                            <Card>
                              <ImageGallery items={galleryImages[0]} />
                            </Card>
                          ) : null}
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                    <CardFooter style={{ justifyContent: "flex-end" }}>
                      {!addComment && !showComments ? (
                        <Button
                          color="primary"
                          onClick={this.showComments}
                          style={{ minWidth: "163px" }}
                        >
                          {CommentText}
                        </Button>
                      ) : null}
                    </CardFooter>
                    <CardFooter style={{ justifyContent: "flex-end" }}>
                      {ticket.creator_id === parseInt(user.id) ||
                      ticket.assigned_user_id === parseInt(user.id) ? (
                        <Button
                          color="primary"
                          onClick={this.showForm}
                          style={{ minWidth: "163px" }}
                        >
                          {ButtonText}
                        </Button>
                      ) : null}
                    </CardFooter>
                  </div>
                ) : (
                  <div style={{ width: "100%", textAlign: "center" }}>
                    <DashboardSpinner />
                  </div>
                )}
              </Card>
            </GridItem>
          </GridContainer>
        )}

        {/* Edit Ticket if authorized */}
        {(ticket.creator_id === parseInt(user.id) ||
          ticket.assigned_user_id === parseInt(user.id)) &&
        edit ? (
          <Card>
            <CardHeader>
              <CardIcon color="primary">
                <Edit style={{ color: "white" }} />
              </CardIcon>
              <h4 className={classes.cardTitleWhite}> Update ticket</h4>
            </CardHeader>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <EditTicketForm
                  images={images}
                  creator={ticket.creator_id}
                  user={user.id}
                  classes={classes}
                  team={team}
                  admin={ticket.project ? ticket.project.creator_id : null}
                  milestones={milestones}
                  description={description}
                  assigned_user_id={ticket.assigned_user_id}
                  due_date={ticket.due_date}
                  milestone_id={ticket.milestone_id}
                  priority={ticket.priority}
                  status_id={ticket.status_id}
                  title={ticket.title}
                  type_id={ticket.type_id}
                  project_id={ticket.project_id}
                  project_name={ticket.project ? ticket.project.name : null}
                  getSuccess={this.getSuccess.bind(this)}
                />
              </GridItem>
            </GridContainer>
          </Card>
        ) : null}

        {/* Display Comments */}
        {showComments || addComment ? (
          <Card>
            <CardHeader
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start"
              }}
            >
              <CardIcon color="info">
                <div style={{ display: "flex" }}>
                  <Comment style={{ color: "white", marginRight: "5px" }} />
                  <Typography style={{ color: "white" }}>
                    {ticket.comments ? ticket.comments.length : 0}
                  </Typography>
                </div>
              </CardIcon>
              <Button onClick={this.showCommentForm} color="info">
                <Comment style={{ color: "white" }} />
                {ButtonTextComment}
              </Button>
            </CardHeader>
            <CardBody>
              {addComment ? (
                <AddComment
                  classes={this.props.classes}
                  ticket_id={ticket.id}
                  getSuccess={this.getSuccess.bind(this)}
                  hideForm={this.hideForm.bind(this)}
                />
              ) : null}
              <TicketComments
                comments={comments}
                user={user}
                classes={classes}
                getSuccess={this.getSuccess.bind(this)}
              />
            </CardBody>
          </Card>
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTicket: (id, token) => dispatch(getTicket(id, token)),
    getUser: id => dispatch(getUser(id))
  };
};

const mapStateToProps = state => ({
  ticket: state.ticket.ticket,
  team: state.ticket.team,
  milestones: state.ticket.milestones,
  isFetching: state.ticket.isFetching,
  user: state.auth.user,
  comments: state.ticket.comments,
  description: state.ticket.description,
  successMessage: state.comment.successMessage,
  images: state.ticket.images
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(dashboardStyle)(Ticket))
);
