import React from 'react';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

// Icons
import LinearScale from '@material-ui/icons/LinearScale';
import Timeline from "@material-ui/icons/Timeline";
import BugReport from "@material-ui/icons/BugReport";
import Warning from "@material-ui/icons/Warning";
import YoutubeSearchedFor from "@material-ui/icons/YoutubeSearchedFor";
import LowPriority from "@material-ui/icons/LowPriority";
import DateRange from "@material-ui/icons/DateRange";

import moment from 'moment';


const TicketIconList = ({ ticket }) => {
    return (
        <List className="my-ticket-list">
            <ListItem>
              <ListItemAvatar>
                <Avatar> <DateRange /> </Avatar>
              </ListItemAvatar>
              <ListItemText primary={moment(ticket.due_date).format('YYYY-MM-DD')} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar> <LinearScale /> </Avatar>
              </ListItemAvatar>
              <ListItemText primary={ticket.status ? ticket.status.status : null} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar> 
                  {ticket.type_id == 1 ?
                    <BugReport /> 
                    : ticket.type_id == 2 ?
                    <LowPriority />
                    : ticket.type_id == 3 ?
                    <LinearScale />
                    : 
                    <YoutubeSearchedFor /> }  
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={ticket.type ? ticket.type.type : null} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>                         
              { ticket.priority == 'low' ?
                  <Avatar style={{backgroundColor: '#ff9800'}}> 
                    <Warning /> 
                  </Avatar>
                : ticket.priority == 'normal' ?
                  <Avatar style={{backgroundColor: '#4caf50'}}> 
                    <Warning /> 
                  </Avatar>
                : 
                  <Avatar style={{backgroundColor: '#f44336'}}> 
                    <Warning /> 
                  </Avatar> }
              </ListItemAvatar>
              <ListItemText primary={ticket.priority} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar> <Timeline /> </Avatar>
              </ListItemAvatar>
              <ListItemText primary={ticket.milestone ? ticket.milestone.title : null} />
            </ListItem>
          </List>

    )
}

export default TicketIconList;

