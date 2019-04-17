import React from 'react'
import moment from 'moment'

// Material UI
import List from '@material-ui/core/List'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from "@material-ui/core/Tooltip"
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'

// Icons
import Warning from "@material-ui/icons/Warning"
import Comment from "@material-ui/icons/Comment"
import Timeline from "@material-ui/icons/Timeline"
import DateRange from "@material-ui/icons/DateRange"
import PersonPin from "@material-ui/icons/PersonPin"
import BugReport from "@material-ui/icons/BugReport"
import LowPriority from "@material-ui/icons/LowPriority"
import LinearScale from '@material-ui/icons/LinearScale'
import YoutubeSearchedFor from "@material-ui/icons/YoutubeSearchedFor"



const TicketIconList = ({ ticket, classes }) => {
    return (
        <List className="my-ticket-list">
            <ListItem>
              <ListItemAvatar>
                <Tooltip
                    id="tooltip-top-start"
                    title="Due date"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}>
                  <Avatar style={{ backgroundColor: '#041031' }}> 
                    <DateRange/> 
                  </Avatar>
                </Tooltip>
              </ListItemAvatar>
              <ListItemText primary={'Due date: ' + moment(ticket.due_date).format('YYYY-MM-DD')} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
              <Tooltip
                id="tooltip-top-start"
                title="Assigned user"
                placement="top"
                classes={{ tooltip: classes.tooltip }}>  
                  <Avatar style={{backgroundColor: '#f44336'}}> 
                    <PersonPin /> 
                  </Avatar>
                </Tooltip>
              </ListItemAvatar>
              <ListItemText primary={ticket.assigned_user ? 'Assigned: ' + ticket.assigned_user.name : null} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Tooltip
                  id="tooltip-top-start"
                  title="Status"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}>
                  <Avatar style={{ backgroundColor: '#4caf50' }}> 
                    <LinearScale /> 
                  </Avatar>
                </Tooltip>
              </ListItemAvatar>
              <ListItemText primary={ticket.status ? 'Status: ' + ticket.status.status : null} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Tooltip
                  id="tooltip-top-start"
                  title="Ticket type"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}>
                  <Avatar style={{ backgroundColor: '#8e24aa'}}> 
                    {ticket.type_id === 1 ?
                      <BugReport /> 
                      : ticket.type_id === 2 ?
                      <LowPriority />
                      : ticket.type_id === 3 ?
                      <LinearScale />
                      : 
                      <YoutubeSearchedFor /> }  
                  </Avatar>
                </Tooltip>
              </ListItemAvatar>
              <ListItemText primary={ticket.type ? 'Type: ' + ticket.type.type : null} />
            </ListItem>
            <ListItem>
              <ListItemAvatar> 
                <Tooltip
                  id="tooltip-top-start"
                  title="Priority"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}>                        
                    {ticket.priority == 'low' ?
                      <Avatar style={{backgroundColor: '#FADC08'}}> 
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
                </Tooltip>
              </ListItemAvatar>
              <ListItemText primary={'Priority: ' + ticket.priority} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
              <Tooltip
                id="tooltip-top-start"
                title="Milestone"
                placement="top"
                classes={{ tooltip: classes.tooltip }}>  
                  <Avatar style={{backgroundColor: '#ff9800'}}> 
                    <Timeline /> 
                  </Avatar>
                </Tooltip>
              </ListItemAvatar>
              <ListItemText primary={ticket.milestone ? 'Milestone: ' + ticket.milestone.title : null} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
              <Tooltip
                id="tooltip-top-start"
                title="Comments"
                placement="top"
                classes={{ tooltip: classes.tooltip }}>  
                  <Avatar style={{backgroundColor: '#00acc1'}}> 
                    <Comment /> 
                  </Avatar>
                </Tooltip>
              </ListItemAvatar>
              <ListItemText primary={ticket.comments ? 'Comments: ' + ticket.comments.length : 0} />
            </ListItem>
          </List>
    )
}

export default TicketIconList;

