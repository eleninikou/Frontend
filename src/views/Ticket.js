import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import Cookies from 'universal-cookie'
import moment from 'moment'

// Redux
import { connect } from 'react-redux'
import { getTicket } from '../redux/actions/tickets/Actions'
import { commentDelete } from '../redux/actions/comments/Actions'
import { getUser } from '../redux/actions/auth/Actions'

// Theme components
import GridItem from "../components/theme/Grid/GridItem.jsx"
import GridContainer from "../components/theme/Grid/GridContainer.jsx"
import Card from "../components/theme/Card/Card"
import CardBody from "../components/theme/Card/CardBody.jsx"
import CardFooter from "../components/theme/Card/CardFooter.jsx"
import Button from "../components/theme/CustomButtons/Button.jsx"
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx"
import CardHeader from "../components/theme/Card/CardHeader.jsx"

// Material UI components
import withStyles from "@material-ui/core/styles/withStyles"
import CircularProgress from '@material-ui/core/CircularProgress'

// Components 
import { TicketIconList, TicketContent, EditTicketForm, TicketComments, AddComment } from '../components'

// Icon
import Edit from "@material-ui/icons/Edit"
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline"

// Styles
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx"


class Ticket extends Component {
    constructor(props) {
      super(props);
      this.state = {
        ticket: '',
        user: '',
        edit: '',
        ButtonText: 'Update Ticket',
        editorState: '',
        addComment: false,
        ButtonTextComment: 'Add Comment',
        CommentText: 'Show Comments',
        showComments: false,
        successMessage: '',
        description: ''
      }
  }
  
  componentWillMount = () => {
    // Fetch ticket and set to state
    this.props.getTicket(this.props.match.params.id)
    .then(res => {
      if(!res.ticket)
        this.props.history.push({
          pathname: '/home/tickets', 
          state: { errorMessage: 'There is no ticket with that id' }
      })
    })

    // Notification bar
    var id = window.setTimeout(null, 0)
    while (id--) { window.clearTimeout(id) }

    // Get loged in user for comments
    const cookies = new Cookies()
    const user = cookies.get('user')
    this.props.getUser(user)

    this.setState({ edit: false})
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
    : this.setState({ edit: true, ButtonText: 'Close edit' })
    
    if(this.state.showComments || this.state.addComment) {
      this.setState({ 
        showComments: false, 
        CommentText: 'Show Comments', 
        addComment: false,
        ButtonTextComment: 'Add Comment'
      }) 
    }
  }

  showComments = event => {
    this.state.showComments ?  
      this.setState({ showComments: false, CommentText: 'Show Comments' }) 
    : this.setState({ 
        showComments: true, 
        CommentText: 'Hide Comments',
        edit: false, 
        ButtonText: 'Update Ticket'
      })
  }

  showCommentForm = event => {
    this.state.addComment ?  
      this.setState({ addComment: false, ButtonTextComment: 'Add Comment'}) 
    : this.setState({ 
        addComment: true, 
        ButtonTextComment: 'Close',
        edit: false,
        ButtonText: 'Update Ticket' 
      })
  }

  deleteComment = id => { 
    this.props.commentDelete(id)
    .then(() => {
      if (this.props.successMessage) {
        this.getSuccess(this.props.successMessage)
      }
    })
  }

  hideForm = hide => {
    this.setState({ addComment: hide, ButtonTextComment: 'Add Comment'}) 
    this.setState({ showComments: true, CommentText: 'Hide Comments' })
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
          ticket: res.ticket,
          comment: null,
          edit: false,
          ButtonText: 'Edit Ticket'
         })
        }
      })
    }


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
      creator, 
      edit, 
      ButtonText, 
      addComment, 
      ButtonTextComment, 
      successMessage, 
      CommentText, 
      showComments,
    } = this.state;

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
          close /> 

        {isFetching && !ticket? <CircularProgress className="my-spinner" color="primary" /> 
        : 
        <GridContainer>          
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary"> 
                <h4 className={classes.cardTitleWhite} style={{ fontSize: '2em' }}>{ticket.title} </h4> 
                <h4 className={classes.cardTitleWhite}>created by {
                    ticket.creator ? ticket.creator.name : null} |  {moment(ticket.created_at).format('YYYY-MM-DD')}
                </h4>
              </CardHeader>
                <CardBody>
                <GridContainer>          
                  <GridItem xs={12} sm={12} md={5}>
                    <TicketIconList ticket={ticket} classes={classes}/>
                  </GridItem> 
                  <GridItem xs={12} sm={12} md={7}>
                  {description || images ? <TicketContent description={description} images={images}/>
                  : <CircularProgress className="my-spinner" color="primary" />}
                  </GridItem>    
                </GridContainer>
              </CardBody> 
              <CardFooter>

                {comments.length && !addComment ?
                <div>
                  <Button color="primary" onClick={this.showComments} >
                    {CommentText}
                  </Button> 
                  {showComments ? 
                    <Button color="primary" onClick={this.showCommentForm}>
                      {ButtonTextComment}
                    </Button>
                    : null }  
                </div>  
                : 
                  <Button color="primary" onClick={this.showCommentForm}>
                    {ButtonTextComment}
                  </Button> }  

                {(ticket.creator_id === parseInt(user.id)) || (ticket.assigned_user_id === parseInt(user.id)) ?
                <Button color="primary" onClick={this.showForm}>
                  {ButtonText}
                </Button> 
                : null }
              </CardFooter>
            </Card>
          </GridItem> 
        </GridContainer>
        }


        {/* Edit Ticket if authorized */}
        {((ticket.creator_id === parseInt(user.id)) || (ticket.assigned_user_id === parseInt(user.id))) && edit ? 
          <Card>
            <CardHeader color="primary"> 
            <h4 className={classes.cardTitleWhite}> <Edit /> </h4> 
            <h4 className={classes.cardTitleWhite}> Update ticket</h4> 

            </CardHeader>
            <GridContainer>          
            {creator === parseInt(user) ?
              <GridItem xs={12} sm={12} md={12}>
                <Button color="danger" onClick={this.deleteTicket} style={{ float: 'right', marginRight: '18px' }}>
                  Delete 
                </Button>
              </GridItem>
            : null}  

              <GridItem xs={12} sm={12} md={12}>
                <EditTicketForm 
                  images={images}
                  creator={ticket.creator_id}
                  user={user.id}
                  classes={classes}
                  team={team}
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
                  project_name={ticket.project ? ticket.project.name : null }
                  getSuccess={this.getSuccess.bind(this)}
                />
              </GridItem>
            </GridContainer>
 
           </Card>
          : null }    

        {/* Display Comments */}
        {showComments || addComment ? 
          <Card>
            <CardBody>
              {addComment ? 
                <AddComment 
                  ticket_id={ticket.id} 
                  getSuccess={this.getSuccess.bind(this)}
                  hideForm={this.hideForm.bind(this)}
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
  images: state.ticket.images
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Ticket)));
  
