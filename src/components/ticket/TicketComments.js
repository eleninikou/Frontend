import React from 'react';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CircularProgress from '@material-ui/core/CircularProgress';

import Person from "@material-ui/icons/Person";
import {stateToHTML} from 'draft-js-export-html'; 
import { convertFromRaw } from 'draft-js';


const TicketComments = ({ comments }) => {

  const convertFromJSONToHTML = (text) => { return stateToHTML(convertFromRaw((text)) )}
  
  return (
    <List>
        {comments ? comments.map(comment => {
          console.log(comment.comment)
          return(
            <ListItem>
              <ListItemAvatar>                         
                <Avatar>
                  <Person /> 
                </Avatar> 
              </ListItemAvatar>
              <ListItemText 
                primary={comment.user ? comment.user.name + ' | ' + comment.created_at : null }
                secondary={''
                } />
                {comment.comment ?  ''
                  // <div dangerouslySetInnerHTML={{ __html: convertFromJSONToHTML(comment.comment) }} />
                : <CircularProgress className="my-spinner" color="primary" />}
            </ListItem>
          )
        }) : null}
      </List>

    )
}

export default TicketComments;

