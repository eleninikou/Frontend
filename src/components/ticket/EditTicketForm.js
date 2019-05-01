import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
// Redux
import { connect } from 'react-redux'
import { updateTicket, getTicketTypes, getTicketStatus, deleteTicket, deleteAttachment, removeFromStorage } from '../../redux/actions/tickets/Actions'
// Theme components
import Button from "../theme/CustomButtons/Button.jsx"
import CardBody from "../theme/Card/CardBody.jsx"
import GridItem from "../theme/Grid/GridItem.jsx"
import CardFooter from '../theme/Card/CardFooter'
import GridContainer from "../theme/Grid/GridContainer.jsx"
// Material UI components
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from "@material-ui/core/Tooltip"
import Remove from "@material-ui/icons/Remove"
// Components
import DangerDialogWrapped from '../../components/modal/DangerDialog'
// External
import axios from "axios"
import moment from 'moment'
import Cookies from "universal-cookie"
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import ImageUploader from 'react-images-upload'
import { EditorState, convertFromHTML, convertToRaw, ContentState } from 'draft-js'


class EditTicketForm extends Component {
    constructor(props) {
      super(props)

      this.state = {
        ids_to_delete: [],
        urls_to_delete: [],
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
        urls: this.props.images,
        selectedDate: moment(this.props.due_date).format('YYYY-MM-DD'),
        editorState: '',
        open: false,
      }
      this.handleChange = this.handleChange.bind(this)
      this.submit = this.submit.bind(this)
  }

  componentWillMount = () => {
    this.props.getTicketTypes()
    this.props.getTicketStatus()

    // Bug in wysiwyg if content is empty
    if (this.props.description.blocks[0].text) {

      let html = draftToHtml(this.props.description)
      const blocksFromHTML = convertFromHTML(html)
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      )
  
      this.setState({ 
        editorState : EditorState.createWithContent(state)
      })
    } else {
      this.setState({ 
        editorState: EditorState.createEmpty() 
      })
    }
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }
  
  onEditorStateChange = editorState => { 
    this.setState({ editorState }) 
  }

  handleDateChange = event => {
    this.setState({ selectedDate: event.target.value }) 
  }

  onDrop = files => {      
    const cookies = new Cookies()
    var token = cookies.get('token')
  
    // Loop trough files and get url from storage
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      
      let reader = new FileReader()
      const scope = this
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

  removeFromState = (id, url) => {
    let filteredUrls = this.state.urls.filter(u => u.attachment !== url)
    this.setState({ 
      urls: filteredUrls,
      ids_to_delete: [...this.state.ids_to_delete, id],
      urls_to_delete: [...this.state.ids_to_delete, url]
     })
  }

  submit = event => {

    event.preventDefault()
    let date = ''

    if (this.state.selectedDate === '') { 
      this.date = this.state.due_date
    } else {
      this.date = this.state.selectedDate
    }

    // If images are deleted
    if(this.state.ids_to_delete.length) {
      this.state.ids_to_delete.map(id => {
        return this.props.deleteAttachment(id)
      })
    }

    if(this.state.urls_to_delete) {
      this.state.urls_to_delete.map(url => {
        return this.props.removeFromStorage(url)
      })
    }

    const ticket = {
      assigned_user_id: this.state.assigned_user_id,
      description: convertToRaw(this.state.editorState.getCurrentContent()),
      due_date: this.date,
      milestone_id: this.state.milestone_id,
      priority: this.state.priority,
      status_id: this.state.status_id,
      title: this.state.title,
      type_id: this.state.type_id,
      project_id: this.state.project_id,
      image_urls: this.state.urls
    }

    this.props.updateTicket(ticket, this.props.match.params.id)
    .then(res => { this.setSuccess(res.message) })
  }

  handleClickOpen = () => { this.setState({ open: true }) }

  handleClose = open => { this.setState({ open })}

  setSuccess = successMessage => { this.props.getSuccess(successMessage) }

  render() {
    const { classes, ticketStatus, ticketTypes, team, milestones, creator, user, admin } = this.props
    const { editorState, assigned_user_id, urls } = this.state
    
      return (
            <form onSubmit={this.submit}>
                <CardBody>
                  <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField 
                          disabled={ user == creator || admin ? false : true}
                          name="title" 
                          type="text"
                          label="Title" 
                          className="my-input"
                          value={this.state.title}
                          onChange={this.handleChange}
                          fullWidth />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField 
                          disabled
                          name="project" 
                          type="text"
                          label="Project" 
                          className="my-input"
                          value={this.state.project_name}
                          fullWidth />
                      </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                        <FormControl className={classes.formControl}>
                          <TextField
                          disabled={ user == creator || admin ? false : true}
                          select
                            label="Type"
                            margin="normal"
                            className="my-input"
                            value={this.state.type_id}
                            onChange={this.handleChange}
                            inputProps={{ name: 'type_id', id: 'type_id'}} 
                          >
                            {ticketTypes ? ticketTypes.map(type => {
                              return  <MenuItem key={type.id} value={type.id}> {type.type} </MenuItem>
                            }): null }
                         </TextField>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <FormControl className={classes.formControl}>
                            <TextField
                              select
                              label="Status"
                              margin="normal"
                              className="my-input"
                              value={this.state.status_id}
                              onChange={this.handleChange}
                              inputProps={{ name: 'status_id', id: 'status_id', }}
                            >
                            {ticketStatus ? ticketStatus.map(status => {
                            return  (
                              <MenuItem 
                                disabled={(user === assigned_user_id && !admin) && (status.id !== 3) }
                                key={status.id} 
                                value={status.id}> 
                                {status.status} 
                              </MenuItem>
                              )}
                            ): null }
                            </TextField>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <FormControl className={classes.formControl}>
                            <TextField
                              select
                              disabled={ user == creator || admin ? false : true}
                              label="Milestone"
                              margin="normal"
                              className="my-input"
                              value={this.state.milestone_id}
                              onChange={this.handleChange}
                              inputProps={{ name: 'milestone_id', id: 'milestone_id' }} 
                            >
                              {milestones ? milestones.map(milestone => {
                                return  <MenuItem key={milestone.id} value={milestone.id}> {milestone.title} </MenuItem>
                              }) : null }
                            </TextField>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                      <FormControl className={classes.formControl}>
                            <TextField
                              select
                              disabled={ user == creator || admin ? false : true}
                              label="Priority"
                              margin="normal"
                              className="my-input"
                              value={this.state.priority}
                              onChange={this.handleChange}
                              inputProps={{ name: 'priority', id: 'priority' }} 
                              >
                            <MenuItem value="low"> low </MenuItem>
                            <MenuItem value="normal"> normal </MenuItem>
                            <MenuItem value="high"> high </MenuItem>
                            </TextField>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                          <FormControl className={classes.formControl}>
                            <TextField
                              select
                              disabled={ user == creator || admin ? false : true}
                              label="Assinged user"
                              margin="normal"
                              className="my-input"
                              fullWidth
                              value={this.state.assigned_user_id}
                              onChange={this.handleChange}
                              inputProps={{ name: 'assigned_user_id', id: 'assigned_user_id'}}>
                            {team ? team.map(member => {
                              return  <MenuItem key={member.user.id} value={member.user.id}> {member.user.name} </MenuItem>
                            }): null }
                            </TextField>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <FormControl className={classes.formControl}>
                          <TextField
                              id="date"
                              label="Due date"
                              type="date"
                              disabled={ user == creator || admin ? false : true}
                              className="my-input"
                              fullWidth
                              value={this.state.selectedDate}
                              onChange={this.handleDateChange}
                              InputLabelProps={{ shrink: true }}
                            />
                        </FormControl>
                      </GridItem>
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
                        {(user == creator) && urls.length ? urls.map(url => {
                          return (
                            <GridItem key={url.id} xs={12} sm={12} md={3} style={{ flexBasis: 'unset'}}>
                              <div style={{ display: 'flex', width: '100%', position: 'relative'}}>
                                <img src={url.attachment ? url.attachment : url} style={{ width: 'auto', maxWidth: '100%', maxHeight: '200px', display: 'block', position: 'relative'}} alt="preview" /> 
                                  <Tooltip
                                    id="tooltip-top-start"
                                    title="Remove image"
                                    placement="top"
                                    onClick={this.removeFromState.bind(this, url.id ? url.id : 0, url.attachment? url.attachment : url)}
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
                        <Button color="primary" type="submit" style={{ float: 'right'}}> Save </Button>
                      </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter style={{ justifyContent: 'center'}}>
                  {user == creator ?
                    <div>
                      <Button color="danger" onClick={this.handleClickOpen}> Delete </Button>
                      <DangerDialogWrapped 
                        type={'ticket'}
                        title={'Are you sure you want to delete this ticket?'}
                        id={this.props.match.params.id}
                        open={this.state.open}
                        onClose={this.handleClose}
                      />
                    </div>
                  : null}
                </CardFooter>
              </form> 
      )
  }
}


  const mapDispatchToProps = dispatch => { return { 
    updateTicket: (ticket, id) => dispatch(updateTicket(ticket, id)),
    deleteTicket: id => dispatch(deleteTicket(id)),
    getTicketTypes: () => dispatch(getTicketTypes()),
    getTicketStatus: () => dispatch(getTicketStatus()),
    deleteAttachment: id => dispatch(deleteAttachment(id)),
    removeFromStorage: url => dispatch(removeFromStorage(url))
  }}

  const mapStateToProps = state => ({
    successMessage: state.ticket.successMessage,
    ticketTypes: state.ticket.ticketTypes,
    ticketStatus: state.ticket.ticketStatus
  })
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditTicketForm))
  