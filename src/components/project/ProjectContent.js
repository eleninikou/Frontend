import React from 'react';

// Theme components
import GridItem from "../theme/Grid/GridItem.jsx";
import CardBody from "../theme/Card/CardBody.jsx";
import Button from "../theme/CustomButtons/Button.jsx";
import GridContainer from "../theme/Grid/GridContainer.jsx";

// Material UI
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from "@material-ui/core/Tooltip";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

// Icons
import Note from "@material-ui/icons/Note";
import People from "@material-ui/icons/People";
import Timeline from "@material-ui/icons/Timeline";

// Material UI components
import Typography from '@material-ui/core/Typography';

const ProjectContent = ({ project, getEdit, classes, team, tickets }) => {

  console.log(project)
    const showForm = () => { getEdit(true)  }
    return (
        <GridContainer>          
            <GridItem xs={12} sm={12} md={12}>
              <CardBody>
                <GridContainer>          
                  <GridItem xs={12} sm={12} md={2}>
                    <List className="my-ticket-list">
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
                          <ListItemText primary={project.milestones ? project.milestones.length : 0 } />
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
                          <ListItemText primary={project.tickets ? project.tickets.length : 0 } />
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
                          <ListItemText primary={team ? team.length : 0 } />
                        </ListItem>
                    </List> 
                  </GridItem> 
                  <GridItem xs={12} sm={12} md={10}>
                  <List className="my-ticket-list">
                    <ListItem>
                      <ListItemText primary={
                        <Typography>
                          Name:  {project.name}
                        </Typography>
                      } />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={
                        <Typography>
                          Description: {project.description}
                        </Typography>
                      } />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={
                        <Typography>
                          Created by: {project.creator ? project.creator.name : null}
                        </Typography>
                        } />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={
                          <Typography>
                          Client: {project.client ? project.client : null}
                          </Typography>
                        } />
                    </ListItem>
                  </List>        
                  </GridItem>    
                </GridContainer>
              </CardBody> 
                    <Button color="success" onClick={showForm} style={{ float: 'right' }}>
                      Edit Project
                    </Button> 
            </GridItem> 
          </GridContainer>
    )
}

export default ProjectContent;