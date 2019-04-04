import React from 'react';
import moment from 'moment';

// Material UI
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from "@material-ui/core/Tooltip";
import ListItem from '@material-ui/core/ListItem';
import IconButton from "@material-ui/core/IconButton";
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import Close from "@material-ui/icons/Close";
import Person from "@material-ui/icons/Person";

// Wysiwyg
import {stateToHTML} from 'draft-js-export-html'; 
import { convertFromRaw } from 'draft-js';


const TicketComments = ({ comments, user, classes, deleteComment }) => {

  const convertFromJSONToHTML = (text) => { return stateToHTML(convertFromRaw((text)) )}

  return (
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
                primary={comment.user ? comment.user.name + ' | ' + moment(comment.created_at).format('YYYY-MM-DD') : null }
                secondary={
                  comment.comment ?  
                    <div dangerouslySetInnerHTML={{ __html: convertFromJSONToHTML(comment.comment) }} />
                  : <CircularProgress className="my-spinner" color="primary" />
                } />
                {comment.user_id == user ?
                  <Tooltip
                    id="tooltip-top-start"
                    title="Delete comment"
                    placement="top"
                    onClick={deleteComment.bind(this, comment.id)}
                    classes={{ tooltip: classes.tooltip }}>
                    <IconButton
                      aria-label="Close"
                      className={classes.tableActionButton}>
                      <Close className={ classes.tableActionButtonIcon + " " + classes.close}/>
                    </IconButton>
                  </Tooltip>
                : null}
            </ListItem>
          )
        }) : null}
      </List>

    )
}

export default TicketComments;

