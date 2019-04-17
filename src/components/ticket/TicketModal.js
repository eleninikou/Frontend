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

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class TicketDialog extends Component {
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

  render() {
    const { classes, onClose, selectedValue, id, ...other } = this.props;

    console.log(id)

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
            <DialogTitle id="simple-dialog-title">Are you sure you want to delete this ticket?</DialogTitle>
        <div>
          <List>
              <ListItem onClick={this.ticketDelete.bind(this)} >
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

TicketDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

const mapDispatchToProps = dispatch => { return { 
    deleteTicket: id => dispatch(deleteTicket(id))
  }}

  const mapStateToProps = state => ({
    successMessage: state.ticket.successMessage,
  })

const TicketDialogWrapped = withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TicketDialog)))


export default TicketDialogWrapped;