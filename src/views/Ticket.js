import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import Cookies from 'universal-cookie'

// Redux
import { connect } from 'react-redux'
import { getTicket, updateTicket, getTicketTypes, getTicketStatus, deleteTicket } from '../redux/actions/tickets/Actions'
import { getUser } from '../redux/actions/auth/Actions'
import { commentCreate } from '../redux/actions/comments/Actions'

// Theme components
import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import Card from "../components/theme/Card/Card";
import CardBody from "../components/theme/Card/CardBody.jsx";
import Button from "../components/theme/CustomButtons/Button.jsx";
import CardFooter from "../components/theme/Card/CardFooter.jsx";
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx";
import CustomTabs from "../components/theme/CustomTabs/CustomTabs.jsx";
import CardHeader from "../components/theme/Card/CardHeader.jsx";

// Material UI components
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from "@material-ui/core/IconButton";

// Icons
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import DeleteForever from "@material-ui/icons/DeleteForever";
import Message from "@material-ui/icons/Message";
import LinearScale from '@material-ui/icons/LinearScale';
import Timeline from "@material-ui/icons/Timeline";
import BugReport from "@material-ui/icons/BugReport";
import Warning from "@material-ui/icons/Warning";
import Person from "@material-ui/icons/Person";
import Comment from "@material-ui/icons/Comment";
import YoutubeSearchedFor from "@material-ui/icons/YoutubeSearchedFor";
import LowPriority from "@material-ui/icons/LowPriority";


// Styles
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";


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
        selectedDate: '',
        dense: false,
        secondary: false,
        show_ticket: '',
        name: '',
        user: '',
        edit: '',
        ButtonText: 'Edit Ticket'
      }

      this.ticketDelete = this.ticketDelete.bind(this);
  }

  submit = event => {
    event.preventDefault();

    let date = '';
    if (this.state.selectedDate === '') {
      this.date = this.state.due_date
    } else {
      this.date = this.state.selectedDate
    }

    const ticket = {
      assigned_user_id: this.state.assigned_user_id,
      description: this.state.description,
      due_date: this.date,
      milestone_id: this.state.milestone_id,
      priority: this.state.priority,
      status_id: this.state.status_id,
      title: this.state.title,
      type_id: this.state.type_id,
      project_id: this.state.project_id
    };

    this.props.updateTicket(ticket, this.props.match.params.id)
    .then(this.showNotification('tr'))

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
          comment: null,
          edit: false
         })
      } else {
        this.props.history.push(`/home `)
      }})


    this.props.getTicketTypes();
    this.props.getTicketStatus();

    // Notification bar
    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }

    // Get loged in user for comments
    const cookies = new Cookies()
    const user = cookies.get('user')
    this.props.getUser(user).then(res => {
      this.setState({ 
        name: res.user.name,
        user })
    })
  }


  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this), 4000);
  }
  

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  ticketDelete() { 
    this.props.deleteTicket(this.props.match.params.id)
    .then(this.showNotification('tr'))
  }
  
  submit = event => {
    event.preventDefault();
    
    const comment = {
      comment: this.state.comment,
      user_id: this.state.user,
      ticket_id: this.state.show_ticket.id
    };
    
    this.props.commentCreate(comment).then(this.showNotification('tr'))
    this.props.getTicket(this.props.match.params.id).then(res => {
      this.setState({ 
        show_ticket: res.ticket,
        comment: null })
    })
  
  }

  showForm = event => {
    const { edit } = this.state
    edit ?  
      this.setState({ 
        edit: false,
        ButtonText: 'Edit Ticket' 
      }) 
    : this.setState({
         edit: true,
         ButtonText: 'Hide form'
        })
  }

  render() {
    const { classes, ticketStatus, ticketTypes, team, milestones, successMessage, isFetching, commentSuccess, comments } = this.props;
    const { show_ticket, comment, user, creator, edit, ButtonText } = this.state;
  
    return (
      <div>
        <Snackbar
          place="tr"
          color="success"
          message={successMessage || commentSuccess}
          open={this.state.tr}
          closeNotification={() => this.setState({ tr: false })}
          close
        /> 
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                 <h4 className={classes.cardTitleWhite}>Ticket</h4>
              </CardHeader>
              <CardBody>
                <Grid xs={12} md={12}>
                  <div className={classes.demo}>
                    <List className="my-ticket-list">
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar> <LinearScale /> </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={show_ticket.status ? show_ticket.status.status : null} />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar> 
                            {show_ticket.type_id == 1 ?
                              <BugReport /> 
                              : show_ticket.type_id == 2 ?
                              <LowPriority />
                              : show_ticket.type_id == 3 ?
                              <LinearScale />
                              : 
                              <YoutubeSearchedFor /> }
                          
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={show_ticket.type ? show_ticket.type.type : null} />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>                         
                        {
                          show_ticket.priority == 'low' ?
                            <Avatar style={{backgroundColor: '#ff9800'}}> 
                              <Warning /> 
                            </Avatar>
                          : show_ticket.priority == 'normal' ?
                            <Avatar style={{backgroundColor: '#4caf50'}}> 
                              <Warning /> 
                            </Avatar>
                          : 
                            <Avatar style={{backgroundColor: '#f44336'}}> 
                              <Warning /> 
                            </Avatar>
                        }
                        </ListItemAvatar>
                        <ListItemText primary={show_ticket.priority} />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar> <Timeline /> </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={show_ticket.milestone ? show_ticket.milestone.title : null} />
                      </ListItem>
                    </List>
                  </div>
                  <Typography variant="h6" className="ticket-title">
                    {show_ticket.title} created by {show_ticket.creator ? show_ticket.creator.name : null}
                  </Typography>                          
                  <Typography className="my-ticket-time">
                    Created: {show_ticket.created_at}
                  </Typography>
                  <Typography className="my-ticket-time">
                    Due date: {show_ticket.due_date}
                  </Typography>
                  <Typography className="my-ticket-description">
                    {show_ticket.description}
                  </Typography>
                  <GridContainer>
                    <form className="my-comments-form" onSubmit={this.submit}>
                      <GridItem xs={12} sm={12} md={9}>
                        <TextField 
                           name="comment" 
                           type="text"
                           multiline={true}
                           label='comment on ticket' 
                           className="my-input"
                           onChange={this.handleChange}
                           value={comment}
                           variant="outlined"
                           fullWidth 
                        />
                      </GridItem>
                    </form>
                    <ListItemAvatar onClick={this.submit}>
                      <Avatar className="my-comment-submit"> <Comment /> </Avatar>
                    </ListItemAvatar>
                  </GridContainer>
                    <Button color="primary" onClick={this.showForm}>{ButtonText}</Button>
                    <Button color="danger" onClick={this.deleteTicket}>Delete ticket</Button>
              </Grid>
            </CardBody> 
          </Card>
          <Card>
          {creator == user && edit ? 
          <form className={classes.form} onSubmit={this.submit}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit</h4>
            </CardHeader>
              <CardBody>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <TextField 
                        name="title" 
                        type="text"
                        label="Title" 
                        className="my-input"
                        value={this.state.title}
                        onChange={this.handleChange}
                        fullWidth />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <TextField 
                        name="description" 
                        type="text"
                        label="Description" 
                        className="my-input"
                        value={this.state.description}
                        onChange={this.handleChange}
                        fullWidth />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <TextField 
                        disabled
                        name="project" 
                        type="text"
                        label="Project" 
                        className="my-input"
                        value={this.state.project_name}
                        fullWidth />
                    </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="type_id">Type</InputLabel>
                          <Select
                            className="my-input"
                            value={this.state.type_id}
                            onChange={this.handleChange}
                            inputProps={{ name: 'type_id', id: 'type_id'}} >
                          <MenuItem> <em>None</em> </MenuItem>
                          {ticketTypes ? ticketTypes.map(type => {
                            return (
                            <MenuItem 
                              key={type.id}
                              value={type.id}>
                              {type.type}
                            </MenuItem>
                            )
                          }): null}
                          </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="status_id">Status</InputLabel>
                          <Select
                            className="my-input"
                            value={this.state.status_id}
                            onChange={this.handleChange}
                            inputProps={{
                              name: 'status_id',
                              id: 'status_id',
                            }}
                          >
                          <MenuItem value=""> <em>None</em> </MenuItem>
                          {ticketStatus ? ticketStatus.map(status => {
                            return (
                            <MenuItem 
                              key={status.id}
                              value={status.id}>
                                {status.status}
                            </MenuItem>)
                          }): null}
                          </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="milestone_id">Milestone</InputLabel>
                          <Select
                            className="my-input"
                            value={this.state.milestone_id}
                            onChange={this.handleChange}
                            inputProps={{ name: 'milestone_id', id: 'milestone_id' }} >
                          <MenuItem> <em>None</em></MenuItem>
                            {milestones ? milestones.map(milestone => {
                              return (
                              <MenuItem 
                                key={milestone.id}
                                value={milestone.id}>
                                {milestone.title}
                              </MenuItem>
                              )
                            }): null }
                          </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="priority">Priority</InputLabel>
                          <Select
                            className="my-input"
                            value={this.state.priority}
                            onChange={this.handleChange}
                            inputProps={{ name: 'priority', id: 'priority' }} >
                          <MenuItem value="low"> low </MenuItem>
                          <MenuItem value="normal"> normal </MenuItem>
                          <MenuItem value="high"> high </MenuItem>
                          </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="assigned_user_id">Assign user</InputLabel>
                          <Select
                            className="my-input"
                            value={this.state.assigned_user_id}
                            onChange={this.handleChange}
                            inputProps={{ name: 'assigned_user_id', id: 'assigned_user_id'}}>
                          <MenuItem><em>None</em></MenuItem>
                          {team ? team.map(member => {
                            return (
                              <MenuItem 
                                key={member.user.id}
                                value={member.user.id}>
                                  {member.user.name}
                              </MenuItem>
                            )
                          }): null }
                          </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                          id="date"
                          label="Due date"
                          type="date"
                          className="my-input"
                          fullWidth
                          defaultValue={this.state.due_date}
                          value={this.state.selectedDate}
                          onChange={this.handleDateChange}
                          InputLabelProps={{
                              shrink: true,
                          }}
                        />
                    </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" type="submit"> Save</Button>
              </CardFooter>
            </form> 
          : ''}
          </Card>
            <Card>
              <List>
                {comments ? comments.map(comment => {
                  return(
                    <ListItem>
                      <ListItemAvatar>                         
                        <Avatar>
                          <Person /> 
                        </Avatar> 
                      </ListItemAvatar>
                      <ListItemText 
                        primary={comment.user ? comment.user.name + ' | ' + comment.created_at : null }
                        secondary={comment.comment} />
                    </ListItem>
                  )
                }) : null}
              </List>
            </Card>
          </GridItem>

                {isFetching ? <CircularProgress className="my-spinner" color="primary" /> : null } 

              </GridContainer>
            </div>
          );
        }
  }


const mapDispatchToProps = dispatch => { 
  return {  
    getTicket: id => dispatch(getTicket(id)),
    updateTicket: (ticket, id) => dispatch(updateTicket(ticket, id)),
    deleteTicket: id => dispatch(deleteTicket(id)),
    getTicketTypes: () => dispatch(getTicketTypes()),
    getTicketStatus: () => dispatch(getTicketStatus()),
    getUser: id => dispatch(getUser(id)),
    commentCreate: comment => dispatch(commentCreate(comment))
  }
}

const mapStateToProps = state => ({ 
  ticket: state.ticket.ticket,
  team: state.ticket.team,
  milestones: state.ticket.milestones,
  isFetching: state.ticket.isFetching,
  successMessage: state.ticket.successMessage,
  ticketTypes: state.ticket.ticketTypes,
  ticketStatus: state.ticket.ticketStatus,
  user: state.auth.user,
  commentSuccess: state.comment.successMessage,
  comments: state.ticket.comments
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Ticket)));
  
