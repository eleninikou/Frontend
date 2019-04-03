import React, { Component } from 'react'
import { commentCreate } from '../redux/actions/comments/Actions'
import { connect } from 'react-redux'

import GridContainer from "../theme/Grid/GridContainer.jsx";
import GridItem from "../theme/Grid/GridItem.jsx";
import Button from "../theme/CustomButtons/Button.jsx";

import { Editor } from 'react-draft-wysiwyg';


class AddComment extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        assigned_user_id: this.props.assigned_user_id,
        description: this.props.description,
        due_date: this.props.due_date,
        milestone_id: this.props.milestone_id,
        priority: this.props.priority,
        status_id: this.props.status_id,
        title: this.props.title,
        type_id: this.props.type_id,
        project_id: this.props.project_id,
        project_name: this.props.project_name,
        selectedDate: '',
        editorState: '',
      }
      this.handleChange = this.handleChange.bind(this);
      this.submit = this.submit.bind(this);
      // this.deleteTicket = this.deleteTicket.bind(this);
  }

  submit = event => {
    event.preventDefault();
    
    const comment = {
      comment: this.state.comment,
      user_id: this.state.user,
      ticket_id: this.state.show_ticket.id
    };
    
    this.props.commentCreate(comment)
    .then(this.showNotification('tr'))
    this.props.getTicket(this.props.match.params.id)
    .then(res => {
      this.setState({ 
        show_ticket: res.ticket,
      })
    })
  }

  render() {

    const { editorState } = this.state;

      return(
      <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
              />
            </GridItem>
          </GridContainer> 
              <Button color="primary" onClick={this.submit} className="my-add-comment-button">Comment!</Button>
         </div>  
      )
  }
}

const mapDispatchToProps = dispatch => { 
    return { 
        commentCreate: comment => dispatch(commentCreate(comment))
    } 
}

  const mapStateToProps = state => ({
    successMessage: state.comment.successMessage,
  });


export default connect(mapStateToProps, mapDispatchToProps)(AddComment)
