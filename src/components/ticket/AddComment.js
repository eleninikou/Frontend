import React, { Component } from 'react'
import { commentCreate } from '../../redux/actions/comments/Actions'
import { connect } from 'react-redux'

import GridContainer from "../theme/Grid/GridContainer.jsx";
import GridItem from "../theme/Grid/GridItem.jsx";
import Button from "../theme/CustomButtons/Button.jsx";

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';


class AddComment extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        editorState: EditorState.createEmpty(),
        ticket_id: this.props.ticket_id

      }
      this.handleChange = this.handleChange.bind(this);
      this.submit = this.submit.bind(this);
      // this.deleteTicket = this.deleteTicket.bind(this);
  }

  submit = event => {
    event.preventDefault();
    
    const comment = {
      comment: convertToRaw(this.state.editorState.getCurrentContent()),
      ticket_id: this.state.ticket_id
    };
    debugger;

    this.props.commentCreate(comment)
    .then(res => { this.setSuccess(res.message) })
  }

  setSuccess = successMessage => { this.props.getSuccess(successMessage) }


  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  onEditorStateChange = editorState => { this.setState({ editorState }) }


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

  const mapStateToProps = state => ({ successMessage: state.comment.successMessage });


export default connect(mapStateToProps, mapDispatchToProps)(AddComment)
