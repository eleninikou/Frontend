import React, { Component } from 'react'
import { withRouter } from "react-router-dom"

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Dialog from '@material-ui/core/Dialog'
import PersonIcon from '@material-ui/icons/Person'
import AddIcon from '@material-ui/icons/Add'
import blue from '@material-ui/core/colors/blue'
import DialogTitle from '@material-ui/core/DialogTitle'

import { connect } from 'react-redux'
import { deleteTicket } from '../../redux/actions/tickets/Actions'
import { deleteProject } from '../../redux/actions/projects/Actions'

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class DangerDialog extends Component {
    handleClose = () => {
    this.props.onClose(false);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

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

  render() {
    const { classes, onClose, selectedValue, id, title, type, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
            <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
        <div>
          <List>
              <ListItem onClick={type === 'ticket' ? this.ticketDelete.bind(this) : this.deleteProject.bind(this)} >
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Yes" />
              </ListItem>

            <ListItem onClick={this.handleClose.bind(this)}>
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="No" />
            </ListItem>
          </List>
        </div>
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
    deleteProject: id => dispatch(deleteProject(id))
  }}

  const mapStateToProps = state => ({
    successMessage: state.ticket.successMessage,
    successMessageProject: state.project.successMessage,

  })

const DangerDialogWrapped = withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DangerDialog)))


export default DangerDialogWrapped;