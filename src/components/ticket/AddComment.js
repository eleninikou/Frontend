import React, { Component } from 'react'

// Redux
import { commentCreate } from '../../redux/actions/comments/Actions'
import { removeFromStorage } from '../../redux/actions/tickets/Actions'

import { connect } from 'react-redux'

import Cookies from "universal-cookie"
import axios from "axios"
import ImageUploader from 'react-images-upload'

// Theme components
import Button from "../theme/CustomButtons/Button.jsx"
import GridItem from "../theme/Grid/GridItem.jsx"
import GridContainer from "../theme/Grid/GridContainer.jsx"

// Material UI components
import Avatar from '@material-ui/core/Avatar'
import Tooltip from "@material-ui/core/Tooltip"

// Icons
import Remove from "@material-ui/icons/Remove"

// wysiwyg
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw } from 'draft-js'

class AddComment extends Component {
    constructor(props) {
      super(props);
      this.state = {
        editorState: '',
        ticket_id: this.props.ticket_id,
        urls: []
      }
  }

  componentWillMount = () => { this.setState({ editorState: EditorState.createEmpty() }) }

  sendComment = () => {
    const comment = {
      comment: convertToRaw(this.state.editorState.getCurrentContent()),
      ticket_id: this.state.ticket_id,
      images: this.state.urls
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

  // remove url from storage with preview
  removeImage(url) {
    this.props.removeFromStorage(url)
    let filteredUrls = this.state.urls.filter(u => u !== url)
    this.setState({ urls: filteredUrls });
  }

  onDrop = files => {      
    const cookies = new Cookies()
    var token = cookies.get('token')
  
    // Remove old urls from storage, images will upload again
    if(this.state.urls.length) {
      this.state.urls.map(url => {
        return this.props.removeFromStorage(url)
      })
    }
  
    // Loop trough files and get url from storage
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      
      let reader = new FileReader()
      const scope = this
      scope.setState({ urls: []})
        reader.onload = (function(file) {
  
          const formData = new FormData()
          formData.append('file', file)
  
          return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/image`,  
            formData, { headers: { 
              "X-Requested-With": "XMLHttpRequest",
              'Access-Control-Allow-Origin': '*',
              "Authorization": `Bearer ${token}`
            }}).then((res) => {
              const url = process.env.REACT_APP_API_BASE_URL+res.data.url
              scope.setState({ urls: [...scope.state.urls, url] })
            })
        })(file)
        reader.readAsDataURL(file)
    }
  }


  render() {
    const { editorState, urls } = this.state
    const { classes } = this.props

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
                options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji']
              }}
            />
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                maxFileSize={5242880}
            />
            <GridContainer>
            {urls.length ? urls.map(url => {
              return (
                <GridItem xs={12} sm={12} md={3}>
                  <div style={{ display: 'flex', width: '100%', position: 'relative'}}>
                    <img src={url} style={{ width: 'auto', maxWidth: '100%', maxHeight: '200px', display: 'block', position: 'relative'}} alt="preview" /> 
                      <Tooltip
                        id="tooltip-top-start"
                        title="Remove image"
                        placement="top"
                        onClick={this.removeImage.bind(this, url)}
                        classes={{ tooltip: classes.tooltip }}>  
                          <Avatar style={{ backgroundColor: '#f44336', height: '30px', width: '30px',position: 'absolute', right: '-12px', top: '-12px' }}> 
                            <Remove /> 
                          </Avatar>
                      </Tooltip>
                  </div>
                </GridItem>
              )
            }) : null}
            </GridContainer>
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

const mapDispatchToProps = dispatch => { return { 
  commentCreate: comment => dispatch(commentCreate(comment)),
  removeFromStorage: url => dispatch(removeFromStorage(url))
 
} }
const mapStateToProps = state => ({ successMessage: state.comment.successMessage });

export default connect(mapStateToProps, mapDispatchToProps)(AddComment)
