import React from 'react'
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
import ImageGallery from 'react-image-gallery';


const TicketComments = ({ comments, user, classes, deleteComment }) => {

  const convertFromJSONToHTML = (text) => { return stateToHTML(convertFromRaw((text)) )}
  return (
    <List>
        {comments ? comments.map(comment => {
          return(
            <ListItem style={{ borderBottom: '1px solid grey', padding: '20px 0px'}}>
              <GridContainer style={{ width: '100%'}}>          
              <GridItem xs={12} sm={12} md={12} style={{ display: 'flex', alignItems: 'flex-start'}}>
                <ListItemAvatar>                         
                  <Avatar>
                    <Person /> 
                  </Avatar> 
                </ListItemAvatar>
                <ListItemText 
                  primary={comment.user ? comment.user.name + ' | ' + moment(comment.created_at).format('YYYY-MM-DD') : null }
                  secondary={
                    comment.comment ?  
                      comment.comment.blocks[0].text ? 
                      <div dangerouslySetInnerHTML={{ __html: convertFromJSONToHTML(comment.comment) }} /> : null
                    : <CircularProgress className="my-spinner" color="primary" />
                  } />
               {comment.user_id === parseInt(user.id) ?
                 <Tooltip
                 id="tooltip-top-start"
                 title="Delete comment"
                 placement="top"
                 onClick={deleteComment.bind(this, comment.id)}
                 classes={{ tooltip: classes.tooltip }}>
                   <IconButton
                     aria-label="Close"
                     className={classes.tableActionButton}>
                     <Close className={ classes.tableActionButtonIcon + " " + classes.close}/>
                   </IconButton>
                 </Tooltip>
               : null}
               </GridItem> 
               <GridItem xs={12} sm={12} md={6} >
                <ImageGallery items={
                  comment.images ? comment.images.map(image => {
                    return ({ original: image.attachment ,
                      thumbnail: image.attachment })                   
                    }) : null 
                  } />
                </GridItem> 
              </GridContainer>
            </ListItem>
          )
        }) : null}
      </List>

    )
}

export default TicketComments;

