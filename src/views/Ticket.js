import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import Cookies from 'universal-cookie'
import moment from 'moment';

// Redux
import { connect } from 'react-redux'
import { getTicket } from '../redux/actions/tickets/Actions'
import { commentDelete } from '../redux/actions/comments/Actions'
import { getUser } from '../redux/actions/auth/Actions'

// Theme components
import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import Card from "../components/theme/Card/Card";
import CardBody from "../components/theme/Card/CardBody.jsx";
import Button from "../components/theme/CustomButtons/Button.jsx";
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx";
import CardHeader from "../components/theme/Card/CardHeader.jsx";

// Material UI components
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from '@material-ui/core/CircularProgress';

// Styles
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

// import { TicketIconList, TicketContent, EditTicketForm, TicketComments, AddComment } from '../components/ticket'

import TicketIconList from '../components/ticket/TicketIconList'
import TicketContent from '../components/ticket/TicketContent'
import EditTicketForm from '../components/ticket/EditTicketForm'
import TicketComments from '../components/ticket/TicketComments'
import AddComment from '../components/ticket/AddComment';

class Ticket extends Component {
    constructor(props) {
      super(props);
      this.state = {
        assigned_user_id: '',
        description: '',
        due_date: '',
        milestone_id: '',
        priority: '',
        status_id: '',
        title: '',
        type_id: '',
        project_name: '',
        project_id: '',
        show_ticket: '',
        name: '',
        user: '',
        edit: '',
        ButtonText: 'Edit Ticket',
        editorState: '',
        addComment: false,
        ButtonTextComment: 'Add Comment',
        CommentText: 'Show Comments',
        showComments: false
      }
  }
  
  componentWillMount = () => {
    // Fetch ticket and set to state
    this.props.getTicket(this.props.match.params.id)
    .then(res => {
      if(res.ticket) {
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
          show_ticket: res.ticket,
          edit: false,
         })
      } else {
        this.props.history.push(`/home `)
      }})

    // Notification bar
    var id = window.setTimeout(null, 0)
    while (id--) { window.clearTimeout(id) }

    // Get loged in user for comments
    const cookies = new Cookies()
    const user = cookies.get('user')
    this.props.getUser(user).then(res => {
      this.setState({ 
        name: res.user.name,
        user })
    })
  }

  // Show notification bar
  showNotification = place => {
    var x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this), 4000);
  }

  showForm = event => {
    this.state.edit ?  
      this.setState({ edit: false, ButtonText: 'Edit Ticket' }) 
    : this.setState({ edit: true, ButtonText: 'Hide edit view' })
    
    if(this.state.showComments) {
      this.setState({ showComments: false, CommentText: 'Show Comments' }) 
    }
  }

  showComments = event => {
    this.state.showComments ?  
      this.setState({ showComments: false, CommentText: 'Show Comments' }) 
    : this.setState({ showComments: true, CommentText: 'Hide Comments' })

      if(this.state.edit) {
        this.setState({ edit: false, ButtonText: 'Edit Ticket' }) 
      }
  }

  showCommentForm = event => {
    this.state.addComment ?  
      this.setState({ addComment: false, ButtonTextComment: 'Add Comment'}) 
    : this.setState({ addComment: true, ButtonTextComment: 'Close'})
  }

  deleteComment = id => { 
    this.props.commentDelete(id)
    .then(() => {
      if (this.props.successMessage) {
        this.getSuccess(this.props.successMessage)
      }
    })
  }


  getSuccess = successMessage => {
    this.setState({ successMessage })
    this.showNotification('tr')
    this.props.getTicket(this.props.match.params.id).then(res => {
      if(res.ticket) {
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
          show_ticket: res.ticket,
          comment: null,
          edit: false,
          ButtonText: 'Edit Ticket'
         })
        }
      })
    }


  render() {
    const { classes, team, milestones, isFetching, comments, description } = this.props;
    const { show_ticket, user, creator, edit, ButtonText, addComment, 
            ButtonTextComment, successMessage, assigned_user_id, due_date, 
            milestone_id, priority, status_id, title, type_id, project_name, 
            project_id, CommentText, showComments } = this.state;

    return (
      <div> 

        {/* Display Success message */}
        <Snackbar 
          place="tr" 
          color="success" 
          message={successMessage} 
          open={this.state.tr}
          closeNotification={() => this.setState({ tr: false })} 
          close /> 

        {/* Display Ticket */}
        <GridContainer>          
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary"> 
                <h4 className={classes.cardTitleWhite}>{show_ticket.title} </h4> 
                <p className={classes.cardCategoryWhite}>created by {
                    show_ticket.creator ? show_ticket.creator.name : null} |  {moment(show_ticket.created_at).format('YYYY-MM-DD')}
                </p>
              </CardHeader>
                <CardBody>
                <GridContainer>          
                  <GridItem xs={12} sm={12} md={4}>
                    <TicketIconList ticket={show_ticket} classes={classes}/>
                  </GridItem> 
                  <GridItem xs={12} sm={12} md={8}>
                    <TicketContent description={description}/>
                  </GridItem>    
                </GridContainer>
              </CardBody> 
            </Card>
          </GridItem> 
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={2} md={2}>
            <Button color="primary" onClick={this.showComments} >
              {CommentText}
            </Button> 
         </GridItem>
         <GridItem xs={12} sm={2} md={2}>
            <Button color="primary" onClick={this.showForm}>
              {ButtonText}
            </Button> 
         </GridItem>
         <GridItem xs={12} sm={2} md={8}>
            <Button color="danger" onClick={this.deleteTicket} style={{ float: 'right'}}>
              Delete Ticket
            </Button>
        </GridItem>

        </GridContainer>

        {/* Edit Ticket if authorized */}
          <Card>
            {(creator == user) && edit ? 
              <EditTicketForm 
                classes={classes}
                team={team}
                milestones={milestones}
                description={description}
                assigned_user_id={assigned_user_id}
                due_date={due_date}
                milestone_id={milestone_id}
                priority={priority}
                status_id={status_id}
                title={title}
                type_id={type_id}
                project_id={project_id}
                project_name={project_name}
                getSuccess={this.getSuccess.bind(this)}
              />
            : null }    
           </Card>

        {/* Display Comments */}
        {showComments ? 
            <Card>
              <CardBody>
                <GridItem xs={12} sm={2} md={3}>
                  <Button color="primary" onClick={this.showCommentForm}>{ButtonTextComment}</Button>
                </GridItem>  
                {addComment ? 
                  <AddComment 
                    ticket_id={show_ticket.id} 
                    getSuccess={this.getSuccess.bind(this)}
                  /> 
                : null}
                <TicketComments 
                  comments={comments} 
                  user={user} 
                  classes={classes}
                  deleteComment={this.deleteComment.bind(this)}
                  />    
              </CardBody>
            </Card>
            : null }

          {isFetching ? <CircularProgress className="my-spinner" color="primary" /> : null } 
      </div> 
      )
    }
  }


const mapDispatchToProps = dispatch => { 
  return {  
    getTicket: id => dispatch(getTicket(id)),
    getUser: id => dispatch(getUser(id)),
    commentDelete: id => dispatch(commentDelete(id))
  }
}

const mapStateToProps = state => ({ 
  ticket: state.ticket.ticket,
  team: state.ticket.team,
  milestones: state.ticket.milestones,
  isFetching: state.ticket.isFetching,
  user: state.auth.user,
  comments: state.ticket.comments,
  description: state.ticket.description,
  successMessage: state.comment.successMessage,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Ticket)));
  
