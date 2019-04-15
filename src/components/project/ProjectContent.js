import React from 'react';
import moment from 'moment'

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

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Icons
import Note from "@material-ui/icons/Note";
import People from "@material-ui/icons/People";
import Timeline from "@material-ui/icons/Timeline";

import IconButton from "@material-ui/core/IconButton";
// Material UI components
import Typography from '@material-ui/core/Typography';

const ProjectContent = ({ project, getEdit, classes, team, creator }) => {

    const showForm = () => { getEdit(true)  }
    return (
            <CardBody>
              <Typography>
                <div style={{ display: 'flex'}}><h1>{project.name} | </h1> <h4> {project.description}</h4></div>
                <h4>Admin: {project.creator ? project.creator.name : null}</h4>
                {project.client ? 
                <h4>Client: {project.client.name} </h4> : null}
              </Typography>
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
                  <ListItemText primary={project.milestones ? project.milestones.length : 0} />
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
                  <ListItemText primary={project.tickets ? project.tickets.length : 0} />
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

              {creator ? 
              <Button color="success" onClick={showForm} style={{ float: 'right' }}>
                Edit Project
              </Button> 
              : null }
            </CardBody> 
    )
}

export default ProjectContent;