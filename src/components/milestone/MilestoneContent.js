import React from 'react';
import moment from 'moment';

// Theme components
import Button from "../theme/CustomButtons/Button.jsx";
import GridItem from "../theme/Grid/GridItem.jsx";
import CardBody from "../theme/Card/CardBody.jsx";
import CardFooter from "../theme/Card/CardFooter.jsx";
import GridContainer from "../theme/Grid/GridContainer.jsx";

// Material UI
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from "@material-ui/core/Tooltip";
import ListItem from '@material-ui/core/ListItem';
import DateRange from "@material-ui/icons/DateRange";
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

// Icons
import Note from "@material-ui/icons/Note";
import Timeline from "@material-ui/icons/Timeline";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import CenterFocusStrong from "@material-ui/icons/CenterFocusStrong";

// Material UI components

const MilestoneContent = ({ milestone, getEdit, classes, creator }) => {

    const showForm = () => { getEdit(true)  }

    return (
        <GridContainer>          
            <GridItem xs={12} sm={12} md={12}>
              <CardBody>
                <GridContainer>          
                  <GridItem xs={12} sm={12} md={12}>
                    <List className="my-ticket-list">
                        <ListItem>
                          <ListItemAvatar>
                          <Tooltip
                            id="tooltip-top-start"
                            title="Title"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}>  
                              <Avatar style={{backgroundColor: '#ff9800'}}> 
                                <Timeline /> 
                              </Avatar>
                            </Tooltip>
                          </ListItemAvatar>
                          <ListItemText primary={milestone.title} />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                          <Tooltip
                            id="tooltip-top-start"
                            title="Focus"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}>  
                              <Avatar style={{backgroundColor: '#0a66b7'}}> 
                                < CenterFocusStrong/> 
                              </Avatar>
                            </Tooltip>
                          </ListItemAvatar>
                          <ListItemText primary={ milestone.focus } />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                          <Tooltip
                            id="tooltip-top-start"
                            title="project"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}>  
                              <Avatar style={{backgroundColor: '#4caf50'}}> 
                                <LibraryBooks /> 
                              </Avatar>
                            </Tooltip>
                          </ListItemAvatar>
                          <ListItemText primary={ milestone.project.name } />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                          <Tooltip
                            id="tooltip-top-start"
                            title="Due date"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}>  
                            <Avatar style={{ backgroundColor: '#041031' }}> 
                              <DateRange /> 
                            </Avatar>
                            </Tooltip>
                          </ListItemAvatar>
                          <ListItemText primary={ moment(milestone.due_date).format('YYYY-MM-DD') } />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                          <Tooltip
                            id="tooltip-top-start"
                            title="Tickets"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}>  
                            <Avatar style={{ backgroundColor: '#9c27b0' }}> 
                              <Note /> 
                            </Avatar>
                            </Tooltip>
                          </ListItemAvatar>
                          <ListItemText primary={ milestone.tickets ? milestone.tickets.length : 0 } />
                        </ListItem>
                    </List> 
                  </GridItem>    
                </GridContainer>
              </CardBody> 
                    {creator ? 
                        <CardFooter>
                            <Button color="warning" onClick={showForm} style={{ float: 'right' }}>
                                Edit Milestone
                            </Button>
                        </CardFooter>
                    : null }
            </GridItem> 
          </GridContainer>
    )
}

export default MilestoneContent;