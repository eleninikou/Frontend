import React, { Component } from 'react'
import moment from 'moment'

// Material UI
import List from '@material-ui/core/List'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from "@material-ui/core/Tooltip"
import ListItem from '@material-ui/core/ListItem'
import IconButton from "@material-ui/core/IconButton"
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import CircularProgress from '@material-ui/core/CircularProgress'

// Theme
import Card from "../theme/Card/Card"
import GridItem from "../theme/Grid/GridItem.jsx"
import GridContainer from "../theme/Grid/GridContainer.jsx"

// Icons
import Close from "@material-ui/icons/Close"
import Person from "@material-ui/icons/Person"

// Wysiwyg
import {stateToHTML} from 'draft-js-export-html'
import { convertFromRaw } from 'draft-js'
import ImageGallery from 'react-image-gallery'

import DangerDialogWrapped from '../../components/modal/DangerDialog'


  class TicketComments extends Component {
    constructor(props) {
      super(props)
      this.state = { open: false }
  }

  handleClickOpen = () => { this.setState({ open: true }) }

  handleClose = open => { this.setState({ open })}

  convertFromJSONToHTML = text => { return stateToHTML(convertFromRaw((text)) )}

  render() {

  const { comments, user, classes } = this.props
  return (
    <List>
        {comments ? comments.map(comment => {
          return(
            <Card>
            <ListItem style={{ borderBottom: '1px solid grey', padding: '30px'}}>
              <GridContainer style={{ width: '100%'}}>          
              <GridItem xs={12} sm={12} md={12} style={{ display: 'flex', alignItems: 'flex-start'}}>
                <ListItemAvatar>                         
                  <Avatar>
                      {user.avatar ?
                      <img src={user.avatar} alt="user" style={{ display: 'block', width: '40px', height: '40px', borderRadius: '50%' }}/>
                      : <Person /> }
                  </Avatar> 
                </ListItemAvatar>
                <ListItemText primary={comment.user ? comment.user.name + ' | ' + moment(comment.created_at).format('YYYY-MM-DD') : null } />
                {comment.user_id === parseInt(user.id) ?
                 <Tooltip
                  id="tooltip-top-start"
                  title="Delete comment"
                  placement="top"
                  onClick={this.handleClickOpen}
                  classes={{ tooltip: classes.tooltip }}>
                    <IconButton
                      aria-label="Close"
                      className={classes.tableActionButton}>
                      <Close className={ classes.tableActionButtonIcon + " " + classes.close}/>
                    </IconButton>
                 </Tooltip>
               : null}
                  <DangerDialogWrapped 
                    type={'comment'}
                    title={'Are you sure you want to delete this comment?'}
                    id={comment.id}
                    open={this.state.open}
                    onClose={this.handleClose}
                    getSuccess={this.props.getSuccess.bind(this)}
                  />
               </GridItem> 
               <GridItem xs={12} sm={12} md={12}>
                  {comment.comment ?  
                      comment.comment.blocks[0].text ? 
                      <div dangerouslySetInnerHTML={{ __html: this.convertFromJSONToHTML(comment.comment) }} /> : null
                    : <CircularProgress className="my-spinner" color="primary" />
                  } 
               </GridItem>
               {comment.images.length ?
                  <GridItem xs={12} sm={12} md={12} style={{ marginTop: '100px'}} >
                   <ImageGallery items={
                     comment.images.map(image => {
                       return ({ original: image.attachment, thumbnail: image.attachment })}) 
                     } />
                  </GridItem> 
                : null }
              </GridContainer>
            </ListItem>
        </Card>
          )
        }) : null}
      </List>
    )
  }
}

export default TicketComments;

