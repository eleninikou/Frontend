import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import Cookies from "universal-cookie";
import ImageUploader from "react-images-upload";
// Redux
import { connect } from "react-redux";
import {
  ticketCreate,
  getTicketTypes,
  getTicketStatus,
  deleteAttachment,
  removeFromStorage,
} from "../redux/actions/tickets/Actions";
import { getAllProjects, getProject } from "../redux/actions/projects/Actions";
// Wysiwyg
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// Theme components
import Card from "../components/theme/Card/Card";
import Button from "../components/theme/CustomButtons/Button.jsx";
import GridItem from "../components/theme/Grid/GridItem.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import CardFooter from "../components/theme/Card/CardFooter.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
// Material UI components
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
// Styles
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import TicketImagePreviews from "../components/ticket/TicketImagePreviews";
import DashboardSpinner from "../components/spinner/DashboardSpinner";

class CreateTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: [],
      type_id: "",
      status_id: "",
      project_id: "",
      priority: "",
      due_date: "",
      assigned_user_id: "",
      milestone_id: "",
      selectedDate: "",
      project_name: "",
      editorState: EditorState.createEmpty(),
      image: "",
      success: false,
      error: false,
      imagePreviewUrls: [],
      url: null,
      urls: [],
      editorContent: "",
      submitted: false,
      hasError: false,
      user: "",
      token: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.filtered = this.filtered.bind(this)
  }

  componentDidMount = () => {
    const cookies = new Cookies();
    var user = cookies.get("user");
    var token = cookies.get("token");
    this.setState({ user, token });

    // If redirected from specific project preselect project
    if (
      this.props.location.state
        ? this.props.location.state.project_id ||
          this.props.location.state.backToProject
        : null
    ) {
      this.setState({
        backToProject: true,
        project_id: this.props.location.state.project_id
      });
      this.props.getProject(this.props.location.state.project_id, token);
    } else {
      this.props.getAllProjects(token);
    }

    this.props.getTicketTypes(token);
    this.props.getTicketStatus(token);
  };


  onEditorStateChange = editorState => {
    this.setState({ editorState });
  };

  goBack = () => {
    this.props.history.push({
      pathname: `/home/project/${this.state.project_id}`
    });
  };

  handleDateChange = event => {
    this.setState({ selectedDate: event.target.value });
  };

  submit = event => {
    event.preventDefault();
    
    // Check if required fields are filled in
    if (
      this.state.title &&
      this.state.description &&
      this.state.type_id &&
      this.state.status_id &&
      this.state.project_id &&
      this.state.priority 
      ) {
        const ticket = {
          title: this.state.title,
          description: convertToRaw(this.state.editorState.getCurrentContent()),
          type_id: this.state.type_id,
          status_id: this.state.status_id,
          project_id: this.state.project_id,
          priority: this.state.priority,
          due_date: this.state.selectedDate,
          assigned_user_id: this.state.assigned_user_id,
          milestone_id: this.state.milestone_id,
          image_urls: this.state.urls
        };
        
      // Create ticket. Redirect back to project
      this.props.ticketCreate(ticket, this.state.token).then(() => {
        if (this.props.successMessage) {
          this.setState({ urls: [] });
          this.props.history.push({
            pathname: `/home/project/${this.state.project_id}`,
            state: { successMessage: this.props.successMessage }
          });
        }
      });
    } else {
      this.setState({ hasError: true });
    }
  };

  onDrop(files) {
    const cookies = new Cookies();
    var token = cookies.get("token");

    // Remove old urls from storage, images will upload again
    if (this.state.urls.length) {
      this.state.urls.map(url => {
        return this.props.removeFromStorage(url);
      });
    }

    // Loop trough files and get url from storage
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      let reader = new FileReader();
      const scope = this;
      scope.setState({ urls: [] });
      reader.onload = (function(file) {
        const formData = new FormData();
        formData.append("file", file);

        return axios.post( `${process.env.REACT_APP_API_BASE_URL}/api/tickets/image`,
            formData,{
              headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(res => {
            const url = process.env.REACT_APP_API_BASE_URL + res.data.url;
            scope.setState({ urls: [...scope.state.urls, url] });
          });
      })(file);
      reader.readAsDataURL(file);
    }
  }

  // remove url from storage with preview
  filtered(urls) { this.setState({ urls }) }

  // If image are uploaded but no ticket is created -> delete them from storage
  componentWillUnmount = () => {
    if (this.state.urls.length) {
      this.state.urls.map(url => {
        return this.props.removeFromStorage(url);
      });
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });

    // Fetch project to get team, milestones
    if (event.target.name === "project_id") {
      this.props.getProject(value, this.state.token).then(res => {
        if (this.state.user == res.project.client_id) {
          this.setState({
            status_id: 3,
            assigned_user_id: res.project.creator_id
          });
        }
      });
    }
  };

  render() {
    const { classes, allProjects, ticketTypes, ticketStatus, project, team } = this.props;
    const { editorState, backToProject, hasError, user, urls } = this.state;
    const styles = { input: { minWidth: "100%" } };

    // https://reactgo.com/removeduplicateobjects/
    function getUnique(arr, comp) {
      const unique = arr
        .map(e => e[comp])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => arr[e])
        .map(e => arr[e]);
      return unique;
    }

    let projects = getUnique(allProjects, "project_id");
    let team_members = getUnique(team, "user_id");

    // If user is Developer or Editor => restrictions in who to assign
    let me_and_admin = team_members.filter(member => { return member.role_id === 1 || member.user_id === parseInt(user) });


    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary" style={{ marginBottom: "30px" }}>
              <h4 className={classes.cardTitleWhite} style={{ textTransform: "uppercase" }}> Create ticket </h4>
            </CardHeader>
            <form className={classes.form} onSubmit={this.submit}>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <FormControl className={classes.formControl}>
                      {hasError && !this.state.title && ( <FormHelperText id="title"> Please select title! </FormHelperText>)}
                      <TextField
                        error={hasError && !this.state.title ? true : false}
                        id="title"
                        name="title"
                        type="text"
                        label="Title"
                        style={styles.input}
                        value={this.state.title}
                        onChange={this.handleChange}
                        fullWidth
                        margin="normal"
                        aria-describedby="component-error-text"
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    {projects || project ? (
                      <FormControl className={classes.formControl}>
                        {hasError && !this.state.project_id && ( <FormHelperText> Please select project! </FormHelperText>)}
                        <TextField
                          error={ hasError && !this.state.project_id ? true : false }
                          style={styles.input}
                          select
                          disabled={backToProject ? true : false}
                          label="Project"
                          margin="normal"
                          value={this.state.project_id}
                          onChange={this.handleChange}
                          inputProps={{ name: "project_id", id: "project_id" }}
                        >
                          {backToProject && project ? (
                            <MenuItem key={project.id} value={project.id}> {project.name} </MenuItem>
                          ) : projects ? (
                            projects.map(project => {
                              return (
                                <MenuItem key={project.project.id} value={project.project.id}> {project.project.name} </MenuItem>
                              );
                            })
                          ) : null}
                        </TextField>
                      </FormControl>
                    ) : (
                      <DashboardSpinner />
                      
                    )}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl className={classes.formControl}>
                      {hasError && !this.state.type_id && ( <FormHelperText> Please select ticket type! </FormHelperText> )}
                      <TextField
                        error={hasError && !this.state.type_id ? true : false}
                        classes={classes}
                        select
                        label="Type"
                        margin="normal"
                        value={this.state.type_id}
                        onChange={this.handleChange}
                        style={styles.input}
                        inputProps={{ name: "type_id", id: "type_id" }}
                      >
                        {ticketTypes
                          ? ticketTypes.map(type => {
                              return ( <MenuItem key={type.id} value={type.id}> {type.type} </MenuItem> );
                            })
                          : null}
                      </TextField>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl className={classes.formControl}>
                      {hasError && !this.state.status_id && ( <FormHelperText> Please select ticket status! </FormHelperText>)}
                      <TextField
                        error={hasError && !this.state.status_id ? true : false}
                        select
                        disabled={
                          project
                            ? user == project.client_id
                              ? true
                              : false
                            : null
                        }
                        label="Status"
                        margin="normal"
                        value={this.state.status_id}
                        onChange={this.handleChange}
                        style={styles.input}
                        inputProps={{ name: "status_id", id: "status_id" }}
                      >
                        {ticketStatus
                          ? ticketStatus.map(status => {
                              return ( <MenuItem key={status.id} value={status.id}> {status.status} </MenuItem> );
                            })
                          : null}
                      </TextField>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl className={classes.formControl}> <FormHelperText>Please select priority!</FormHelperText>
                      <TextField
                        error={hasError && !this.state.priority ? true : false}
                        select
                        label="Priority"
                        margin="normal"
                        style={styles.input}
                        value={this.state.priority}
                        onChange={this.handleChange}
                        inputProps={{ name: "priority", id: "priority" }}
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
                        disabled={
                          project
                            ? user == project.client_id
                              ? true
                              : false
                            : null
                        }
                        label="Assign user"
                        margin="normal"
                        style={styles.input}
                        value={this.state.assigned_user_id}
                        onChange={this.handleChange}
                        inputProps={{
                          name: "assigned_user_id",
                          id: "assigned_user_id"
                        }}
                      >
                        {// If admin -> choose from all members
                        project
                          ? project.creator_id === parseInt(user)
                            ? team
                              ? team.map(member => {
                                  return ( <MenuItem key={member.user.id} value={member.user.id} > {member.user.name} </MenuItem> );
                                })
                              : null
                            : // Choose admin or self
                            me_and_admin ? me_and_admin.map(member => {
                                return (
                                  <MenuItem key={member.user.id} value={member.user.id} >
                                    {member.user.name}
                                  </MenuItem>
                                );
                              })
                            : null : null}
                      </TextField>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        select
                        label="Milestone"
                        margin="normal"
                        style={styles.input}
                        value={this.state.milestone_id}
                        onChange={this.handleChange}
                        inputProps={{
                          name: "milestone_id",
                          id: "milestone_id"
                        }}
                      >
                        {project ? project.milestones
                            ? project.milestones.map(milestone => {
                                return (
                                  <MenuItem key={milestone.id} value={milestone.id} >
                                    {milestone.title}
                                  </MenuItem>
                                );
                              })
                            : null : null}
                      </TextField>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="date"
                        label="Due date"
                        type="date"
                        margin="normal"
                        style={styles.input}
                        defaultValue={'dd/mm/YYYY'}
                        value={this.state.selectedDate}
                        onChange={this.handleDateChange}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12} style={{ marginTop: "100px" }} >
                    <FormControl className={classes.formControl}>
                      <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={this.onEditorStateChange}
                        toolbar={{
                          options: [
                            "inline",
                            "blockType",
                            "fontSize",
                            "fontFamily",
                            "list",
                            "textAlign",
                            "colorPicker",
                            "link",
                            "embedded",
                            "emoji"
                          ]
                        }}
                      />
                      <ImageUploader
                        withIcon={true}
                        buttonText="Choose images"
                        onChange={this.onDrop}
                        imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
                        maxFileSize={5242880}
                      />
                      <TicketImagePreviews urls={urls} filtered={this.filtered} classes={{classes}}/>
                    </FormControl>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter style={{ justifyContent: "flex-end" }}>
                <Button color="primary" type="submit"> Create Ticket </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ticketCreate: (ticket, token) => dispatch(ticketCreate(ticket, token)),
    getTicketTypes: token => dispatch(getTicketTypes(token)),
    getTicketStatus: token => dispatch(getTicketStatus(token)),
    getAllProjects: token => dispatch(getAllProjects(token)),
    getProject: (id, token) => dispatch(getProject(id, token)),
    deleteAttachment: url => dispatch(deleteAttachment(url)),
    removeFromStorage: url => dispatch(removeFromStorage(url)),
  };
};

const mapStateToProps = state => ({
  project: state.project.project,
  team: state.project.team,
  allProjects: state.project.allProjects,
  isFetching: state.project.isFetching,
  ticketTypes: state.ticket.ticketTypes,
  ticketStatus: state.ticket.ticketStatus,
  successMessage: state.ticket.successMessage,
  url: state.ticket.url
});

TextField.propTypes = { classes: PropTypes.object };

export default withRouter(connect( mapStateToProps, mapDispatchToProps )(withStyles(dashboardStyle)(CreateTicket)));
