import React from 'react'

// Theme components
import CardBody from "../theme/Card/CardBody.jsx"
import Button from "../theme/CustomButtons/Button.jsx"

// Material UI
import List from '@material-ui/core/List'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from "@material-ui/core/Tooltip"
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'

// Icons
import Note from "@material-ui/icons/Note"
import People from "@material-ui/icons/People"
import Face from "@material-ui/icons/Face"
import Timeline from "@material-ui/icons/Timeline"
import AccountCircle from "@material-ui/icons/AccountCircle"

// Material UI components
import Typography from '@material-ui/core/Typography'

const ProjectContent = ({ project, getEdit, classes, team, creator }) => {

    const showForm = () => { getEdit(true)  }
    return (
            <CardBody>
              <Typography>
                <h1>{project.name} </h1> 
                <h4> {project.description}</h4>
              </Typography>
              <List className="my-ticket-list">
              <ListItem>
                  <ListItemAvatar>
                    <Tooltip
                        id="tooltip-top-start"
                        title="Milestones"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}>  
                          <Avatar> 
                            <AccountCircle /> 
                          </Avatar>
                        </Tooltip>
                  </ListItemAvatar>
                  <ListItemText primary={project.creator ? 'Admin: ' + project.creator.name : null} />
                </ListItem>
                {project.client ?
                  <ListItem>
                    <ListItemAvatar>
                      <Tooltip
                          id="tooltip-top-start"
                          title="Milestones"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}>  
                            <Avatar style={{backgroundColor: '#ec407a'}}> 
                              <Face /> 
                            </Avatar>
                          </Tooltip>
                    </ListItemAvatar>
                    <ListItemText primary={'Client: ' + project.client.name} />
                  </ListItem>
                : null} 
                <ListItem>
                  <ListItemAvatar>
                    <Tooltip
                        id="tooltip-top-start"
                        title="Milestones"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}>  
                          <Avatar style={{backgroundColor: '#ff9800'}}> 
                            <Timeline /> 
                          </Avatar>
                        </Tooltip>
                  </ListItemAvatar>
                  <ListItemText primary={project.milestones ? 'Milestones: ' + project.milestones.length : 0} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Tooltip
                        id="tooltip-top-start"
                        title="Tickets"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}>  
                          <Avatar style={{backgroundColor: '#9c27b0'}}> 
                            <Note /> 
                          </Avatar>
                        </Tooltip>
                  </ListItemAvatar>
                  <ListItemText primary={project.tickets ? 'Tickets: ' +project.tickets.length : 0} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                  <Tooltip
                        id="tooltip-top-start"
                        title="Team"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}>  
                          <Avatar style={{backgroundColor: '#26c6da'}}> 
                            <People /> 
                          </Avatar>
                        </Tooltip>
                  </ListItemAvatar>
                  <ListItemText primary={team ? 'Team: ' + team.length : 0 } />
                </ListItem>
              </List> 

              {creator ? 
              <Button color="success" onClick={showForm} style={{ float: 'right' }}>
                Edit Project
              </Button> 
              : null }
          </CardBody> 
    )
}

export default ProjectContent;