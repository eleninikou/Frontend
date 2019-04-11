import React, { Component } from 'react'
import { commentCreate } from '../../redux/actions/comments/Actions'
import { connect } from 'react-redux'
import Cookies from "universal-cookie";
import axios from "axios";

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
        this.props.hideForm(false)
      } 
    })
  }

  onEditorStateChange = editorState => { this.setState({ editorState }) }

  uploadCallback(file) {

    return new Promise((resolve, reject) => {      
        let reader = new FileReader();
        reader.onload = () => {
  
          const cookies = new Cookies()
          var token = cookies.get('token')
  
          const formData = new FormData()
          formData.append('file', file)
  
          return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/image`,  
          formData, { headers: { 
            "X-Requested-With": "XMLHttpRequest",
            'Access-Control-Allow-Origin': '*',
            "Authorization": `Bearer ${token}`
          }}).then((res) => {
            const url = process.env.REACT_APP_API_BASE_URL+res.data.url;
            console.log(url)
            resolve({ data: { link: url }});
          })
        };
        reader.readAsDataURL(file);
        })
  }


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
              toolbar = {{
                image: {
                  uploadEnabled: true,
                  uploadCallback: this.uploadCallback,
                  urlEnabled: true,
                  previewImage: true,
                  alt: { present: false, mandatory: false},
                  defaultSize: {
                    height: 'auto',
                    width: 'auto',
                  },
                }
              }}
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
