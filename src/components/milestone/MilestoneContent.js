import React from 'react'
import moment from 'moment'
// Theme components
import Button from "../theme/CustomButtons/Button.jsx"
import GridItem from "../theme/Grid/GridItem.jsx"
import CardBody from "../theme/Card/CardBody.jsx"
import CardFooter from "../theme/Card/CardFooter.jsx"
import GridContainer from "../theme/Grid/GridContainer.jsx"
// Material UI
import List from '@material-ui/core/List'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from "@material-ui/core/Tooltip"
import ListItem from '@material-ui/core/ListItem'
import DateRange from "@material-ui/icons/DateRange"
import Typography from '@material-ui/core/Typography'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
// Icons
import Note from "@material-ui/icons/Note"
import LibraryBooks from "@material-ui/icons/LibraryBooks"


const MilestoneContent = ({ milestone, getEdit, classes, creator }) => {

    const showForm = () => { getEdit(true)  }

    return (
        <GridContainer>          
            <GridItem xs={12} sm={12} md={12}>
              <CardBody>
                <GridContainer>      
                  <GridItem xs={12} sm={12} md={8}>
                  <Typography>
                    <h1>{milestone.title} </h1> 
                    <h4> {milestone.focus}</h4>
                  </Typography>
                  </GridItem>    
                  <GridItem xs={12} sm={12} md={4}>
                    <List className="my-ticket-list">
                        <ListItem>
                          <ListItemAvatar>
                          <Tooltip
                            id="tooltip-top-start"
                            title="Due date"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}>  
                            <Avatar style={{ backgroundColor: '#041031', width: '30px', height: '30px'}}> 
                              <DateRange style={{ fontSize: '18px'}}/> 
                            </Avatar>
                            </Tooltip>
                          </ListItemAvatar>
                          <ListItemText primary={moment(milestone.due_date).format('YYYY-MM-DD') } />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                          <Tooltip
                            id="tooltip-top-start"
                            title="project"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}>  
                              <Avatar style={{backgroundColor: '#4caf50', width: '30px', height: '30px'}}> 
                                <LibraryBooks style={{ fontSize: '18px'}}/> 
                              </Avatar>
                            </Tooltip>
                          </ListItemAvatar>
                          <ListItemText primary={ milestone.project.name } />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                          <Tooltip
                            id="tooltip-top-start"
                            title="Tickets"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}>  
                            <Avatar style={{ backgroundColor: '#9c27b0', width: '30px', height: '30px' }}> 
                              <Note style={{ fontSize: '18px'}}/> 
                            </Avatar>
                            </Tooltip>
                          </ListItemAvatar>
                          <ListItemText primary={ milestone.tickets ? 'Tickets: ' + milestone.tickets.length : 0 } />
                        </ListItem>
                    </List> 
                  </GridItem>    
                </GridContainer>
              </CardBody> 
                    {creator ? 
                        <CardFooter style={{ justifyContent: 'flex-end'}}>
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