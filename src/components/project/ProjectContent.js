import React from 'react'

// Theme components
import Button from "../theme/CustomButtons/Button.jsx"
import CardBody from "../theme/Card/CardBody.jsx"
import GridItem from "../theme/Grid/GridItem.jsx"
import GridContainer from "../theme/Grid/GridContainer.jsx"

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

const showForm = () => {getEdit(true)}
    return (
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={8}>
                <Typography>
                  <h1>{project.name} </h1> 
                  <h4> {project.description}</h4>
                </Typography>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
              <List className="my-ticket-list">
                <ListItem>
                  <ListItemAvatar>
                    <Tooltip
                      id="tooltip-top-start"
                      title="Milestones"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}>  
                      {project.creator ? project.creator.avatar ?
                        <img src={project.creator.avatar} alt="user" style={{ display: 'block', width: '30px', height: '30px', borderRadius: '50%' }}/>
                        :  
                        <Avatar style={{ width: '30px', height: '30px' }}> 
                          <AccountCircle style={{ fontSize: '18px'}}/> 
                        </Avatar>
                        : null}
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
                          {project.client.avatar ?
                            <img src={project.client.avatar} alt="user" style={{ display: 'block', width: '30px', height: '30px', borderRadius: '50%' }}/>
                          :
                            <Avatar style={{backgroundColor: '#ec407a', width: '30px', height: '30px'}}> 
                              <Face style={{ fontSize: '18px'}}/> 
                            </Avatar>}
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
                        <Avatar style={{backgroundColor: '#ff9800', width: '30px', height: '30px'}}> 
                          <Timeline style={{ fontSize: '18px'}}/> 
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
                        <Avatar style={{backgroundColor: '#9c27b0', width: '30px', height: '30px'}}> 
                          <Note style={{ fontSize: '18px'}}/> 
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
                        <Avatar style={{backgroundColor: '#26c6da', width: '30px', height: '30px'}}> 
                          <People style={{ fontSize: '18px'}}/> 
                        </Avatar>
                      </Tooltip>
                  </ListItemAvatar>
                  <ListItemText primary={team ? team.length : 0 } />
                </ListItem>
              </List> 
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>                
                {creator ? 
                <Button color="success" onClick={showForm} style={{ float: 'right' }}>
                  Edit Project
                </Button> : null }
              </GridItem>
              </GridContainer>

          </CardBody> 
    )
}

export default ProjectContent;