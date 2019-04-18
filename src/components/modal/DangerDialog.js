import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import Cookies from 'universal-cookie'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Dialog from '@material-ui/core/Dialog'
import blue from '@material-ui/core/colors/blue'
import DialogTitle from '@material-ui/core/DialogTitle'

import Card from "../theme/Card/Card"
import CardHeader from "../theme/Card/CardHeader.jsx"

import DeleteForever from '@material-ui/icons/DeleteForever'
import Cancel from '@material-ui/icons/Cancel'

import { connect } from 'react-redux'
import { removeFromTeam } from '../../redux/actions/projects/Actions'
import { deleteTicket } from '../../redux/actions/tickets/Actions'
import { deleteProject } from '../../redux/actions/projects/Actions'
import { deleteMilestone } from '../../redux/actions/milestones/Actions'
import { deleteUser } from '../../redux/actions/auth/Actions'


const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class DangerDialog extends Component {

    handleClose = () => { this.props.onClose(false) }

    handleListItemClick = value => { this.props.onClose(value) }

    ticketDelete() { 
      this.props.deleteTicket(this.props.id)
      .then((res) => {
        if(this.props.successMessage) {
          this.props.history.push({
            pathname: '/home/projects', 
            state: { successMessage: this.props.successMessage}
          })
        }
      })
    }

    // Redirect to projects
    deleteProject = () => { 
        this.props.deleteProject(this.props.id)
        .then(() => {
          if(this.props.successMessageProject) {
            this.props.history.push({
              pathname: '/home/projects', 
              state: { successMessage: this.props.successMessageProject}
            })
          }
        })
    }

    deleteMilestone = () => { 
        // Delete milestone and show notification
        this.props.deleteMilestone(this.props.id)
        .then(() => { 
            if(this.props.location.state === undefined) {
              this.props.history.push({
                pathname: '/home/milestones', 
                state: { successMessage: this.props.successMessageMilestone}
              })
            }
            else {
            if (this.props.successMessageMilestone) {
                this.props.history.push({
                  pathname: '/home/projects', 
                  state: { successMessage: this.props.successMessageMilestone}
                })
              }
            }
            })
    }  

    setSuccess = successMessage => { this.props.getSuccess(successMessage) }

    removeUserFromTeam = () => {
      this.props.removeFromTeam(this.props.id)
      .then((res) => {
        this.setSuccess(this.props.successMessageTeam)
      })
    }

    deleteUser = () => {
      this.props.deleteUser(this.props.id)
      .then(res => {
        debugger;
        const cookies = new Cookies()
        cookies.remove('token', { path: '/' })
        cookies.remove('user', { path: '/' })
        this.props.history.push('/')
      })
    }

  render() {
    const { classes, onClose, selectedValue, id, title, type, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
          <Card>
            <CardHeader color="danger"> 
              <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
            </CardHeader>
            <List style={{ display: 'flex', padding: '50px'}}>
                <ListItem onClick={
                  type === 'ticket' ? this.ticketDelete.bind(this) : 
                  type === 'project' ? this.deleteProject.bind(this) :
                  type === 'team' ? this.removeUserFromTeam.bind(this) :
                  type === 'milestone' ? this.deleteMilestone.bind(this) :
                  this.deleteUser.bind(this)
                  } >
                  <ListItemAvatar >
                    <Avatar style={{ backgroundColor: '#f44336' }}>
                      <DeleteForever />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Delete" />
                </ListItem>

              <ListItem onClick={this.handleClose.bind(this)}>
                <ListItemAvatar>
                  <Avatar>
                    <Cancel />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Cancel" />
              </ListItem>
            </List>
          </Card>
      </Dialog>
    );
  }
}

DangerDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

const mapDispatchToProps = dispatch => { return { 
    deleteTicket: id => dispatch(deleteTicket(id)),
    deleteProject: id => dispatch(deleteProject(id)),
    deleteMilestone: id => dispatch(deleteMilestone(id)),
    removeFromTeam: id => dispatch(removeFromTeam(id)),
    deleteUser: id => dispatch(deleteUser(id))

  }}

  const mapStateToProps = state => ({
    successMessage: state.ticket.successMessage,
    successMessageProject: state.project.successMessage,
    successMessageMilestone: state.milestone.successMessage,
    successMessageTeam: state.project.successMessage
  })

const DangerDialogWrapped = withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DangerDialog)))


export default DangerDialogWrapped;