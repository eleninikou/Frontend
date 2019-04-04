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
        editorState: '',
        ticket_id: this.props.ticket_id
      }
  }

  componentWillMount = () => { this.setState({ editorState: EditorState.createEmpty() }) }

  sendComment = () => {
    const comment = {
      comment: convertToRaw(this.state.editorState.getCurrentContent()),
      ticket_id: this.state.ticket_id
    };
    
    this.props.commentCreate(comment)
    .then(res => { 
      if(this.props.successMessage) {
        this.props.getSuccess(this.props.successMessage) 
      } 
    })
  }

  onEditorStateChange = editorState => { this.setState({ editorState }) }

  render() {
    const { editorState } = this.state;
    return(
      <div style={{ marginBottom: '50px'}}>
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
        <Button 
          color="primary" 
          style={{ float: 'right'}}
          onClick={this.sendComment.bind(this)}  >
          Comment!
        </Button>
      </div>  
      )
  }
}

const mapDispatchToProps = dispatch => { return { commentCreate: comment => dispatch(commentCreate(comment)) } }
const mapStateToProps = state => ({ successMessage: state.comment.successMessage });

export default connect(mapStateToProps, mapDispatchToProps)(AddComment)
