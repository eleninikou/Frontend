import React, { Component } from "react";
import moment from "moment";
// Material UI
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// Theme components
import Card from "../theme/Card/Card";
import GridItem from "../theme/Grid/GridItem.jsx";
import GridContainer from "../theme/Grid/GridContainer.jsx";
// Components
import DangerDialogWrapped from "../../components/modal/DangerDialog";
// Icons
import Close from "@material-ui/icons/Close";
import Person from "@material-ui/icons/Person";
// Wysiwyg
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";
import ImageGallery from "react-image-gallery";

class TicketComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: '',
    };
  }

  handleClickOpen = id => {
    this.setState({ 
      open: true, 
      id
    });
  };

  handleClose = open => {
    this.setState({ open });
  };

  convertFromJSONToHTML = text => {
    return stateToHTML(convertFromRaw(text));
  };

  render() {
    const { user, classes, comments } = this.props;

    return (
      <List>
        {comments
          ? comments.map(comment => {
            console.log(comment)
            return (
              <Card key={comment.id}>
                  <ListItem style={{ borderBottom: "1px solid grey", padding: "30px" }} >
                    <GridContainer style={{ width: "100%", padding: "0px" }}>
                      <GridItem xs={12} sm={12} md={12} style={{ padding: "0px"}} >
                        <GridContainer style={{ alignItems: "center" }}>
                          <GridItem xs={12} sm={2} md={10} style={{ padding: "0px", display: 'flex', alignItems: 'center'}}>
                            <ListItemAvatar>
                              <Avatar>
                                {comment.user ? comment.user.avatar ? (
                                  <img
                                    src={comment.user.avatar}
                                    alt="user"
                                    style={{
                                      display: "block",
                                      width: "40px",
                                      height: "40px",
                                      borderRadius: "50%"
                                    }}
                                  />
                                ) : (
                                  <Person />
                                ) : null }
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={
                                comment.user
                                  ? comment.user.name +
                                    " | " +
                                    moment(comment.created_at).format("YYYY-MM-DD")
                                  : null
                              }
                            />
                          </GridItem>
                          {comment.user_id === parseInt(user.id) ? (
                            <GridItem xs={12} sm={2} md={2}>
                              <Tooltip
                                id="tooltip-top-start"
                                title="Delete comment"
                                placement="top"
                                onClick={() => this.handleClickOpen(comment.id, this)}
                                classes={{ tooltip: classes.tooltip }}
                              >
                                <IconButton aria-label="Close" className={classes.tableActionButton} >
                                <Close className={ classes.tableActionButtonIcon + classes.close } />
                                </IconButton>
                              </Tooltip>
                            </GridItem>
                          ) : null}
                          <DangerDialogWrapped
                            type={"comment"}
                            title={"Are you sure you want to delete this comment?"}
                            id={comment.id}
                            open={this.state.id == comment.id ? this.state.open : false}
                            onClose={this.handleClose}
                            getSuccess={this.props.getSuccess.bind(this)}
                          />
                        </GridContainer>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        {comment.comment && comment.comment.blocks ? comment.comment.blocks[0].text : null ? 
                          <div dangerouslySetInnerHTML={{ __html: this.convertFromJSONToHTML(comment.comment)}} />
                          : null }
                      </GridItem>
                      {comment.images ? comment.images.length ? (
                        <GridItem xs={12} sm={12} md={12} style={{ marginTop: "100px" }} >
                          <ImageGallery
                            items={comment.images.map(image => {
                              return {
                                original: image.attachment,
                                thumbnail: image.attachment
                              };
                            })}
                          />
                        </GridItem>
                      ) : null : null}
                    </GridContainer>
                  </ListItem>
                </Card>
              );
            })
          : null}
      </List>
    );
  }
}

export default TicketComments;
