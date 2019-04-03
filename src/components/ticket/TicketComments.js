import React from 'react';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import Person from "@material-ui/icons/Person";



const TicketComments = ({ comments }) => {
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
                primary={comment.user ? comment.user.name + ' | ' + comment.created_at : null }
                secondary={comment.comment} />
            </ListItem>
          )
        }) : null}
      </List>

    )
}

export default TicketComments;

