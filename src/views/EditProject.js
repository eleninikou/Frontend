import React, { Component } from 'react'
import { withRouter } from "react-router-dom"

import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import Card from "../components/theme/Card/Card";
import CardBody from "../components/theme/Card/CardBody.jsx";
import Cookies from 'universal-cookie';
import Button from "../components/theme/CustomButtons/Button.jsx";
import CustomInput from "../components/theme/CustomInput/CustomInput.jsx";
import CardFooter from "../components/theme/Card/CardFooter.jsx";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "../components/theme/Table/Table.jsx";
import CustomTabs from "../components/theme/CustomTabs/CustomTabs.jsx";
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel';

import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import People from "@material-ui/icons/People";
import Timeline from "@material-ui/icons/Timeline";
import LibraryBooks from "@material-ui/icons/LibraryBooks";

import { getProject, editProject } from '../redux/actions/projects/Actions'
import { deleteMilestone } from '../redux/actions/milestones/Action'
import { connect } from 'react-redux'

class EditProject extends Component {
    constructor(props) {
      super(props);
      this.state = {
        token: '',
        userId: '',
        name: '',
        description: '',
        client_id: '',
        id: ''
      }
  
      this.editMilestone = this.editMilestone.bind(this);
      this.deleteMilestone = this.deleteMilestone.bind(this);
      this.invitePeople = this.invitePeople.bind(this);
      this.handleChange = this.handleChange.bind(this);

  }

  submit = event => {
    event.preventDefault();
    const project = {
      id: this.state.id,
      creator_id: this.state.userId,
      client_id: this.state.client_id,
      name: this.state.name,
      description: this.state.description,
      user_id: this.state.userId
    };
    debugger;

    this.props.editProject(this.state.token, project)
    .then(res => {
        console.log(res)
        debugger;
    })
  }
  
    componentWillMount() {
      const cookies = new Cookies()
      var token = cookies.get('token')
      var userId = cookies.get('user')
      this.setState({token, userId})

      this.props.getProject(token, this.props.match.params.id)
      .then(res => {
        this.setState({ 
          id: res.project.id,
          name: res.project.name,
          description: res.project.description,
          client_id: res.project.client_id
         })
      });
    }

    editMilestone(id) {
      this.props.history.push(`/home/edit-milestone/${id}`)
    }

    deleteMilestone(id) {
      this.props.deleteMilestone(this.state.token, id).then(res => { console.log(res)})
    }

    invitePeople() {
      const id = this.props.match.params.id
      this.props.history.push(`/home/project-invite/${id}`)
    }

    handleChange = event => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    }
  
      render() {
          const { classes, team, project } = this.props;
          return (
            <div>
              {console.log(project)}
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <Card>
                <CustomTabs
                  headerColor="primary"
                  tabs={[
                    {
                      tabName: "Info",
                      tabIcon: LibraryBooks,
                      tabContent: (
                      <form className={classes.form} onSubmit={this.submit}>
                        <CardBody>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                              <InputLabel>Name</InputLabel>
                              <TextField 
                                  name="name" 
                                  type="text"
                                  value={this.state.name}
                                  onChange={this.handleChange}
                                  fullWidth
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                              <InputLabel>Description</InputLabel>
                              <TextField 
                                  name="description" 
                                  type="text"
                                  value={this.state.description}
                                  onChange={this.handleChange}
                                  fullWidth
                                />
                            </GridItem>
                            {project.client ? 
                              <GridItem xs={12} sm={12} md={12}>
                                  <CustomInput
                                    name="client_id"
                                    id="client_id"
                                    value={this.state.client_id}
                                    formControlProps={{
                                      fullWidth: true
                                    }}/>
                              </GridItem>
                            : null }
                          </GridContainer>
                        </CardBody>
                        <CardFooter>
                          <Button color="primary" type="submit">Edit Info</Button>
                       </CardFooter>
                      </form>  
                      )
                    },{
                      tabName: "Milestones",
                      tabIcon: Timeline,
                      tabContent: (
                        project.milestones? project.milestones.map(milestone => {
                          return (
                            <Table
                              tableHeaderColor="primary"
                              tableHead={["Name", "Focus", "Last updated", "Edit", "Remove"]}
                              tableData={[project.milestones.map(milestone => {
                                return ([
                                    `${milestone.title}`, 
                                    `${milestone.focus}`,
                                    `${milestone.updated_at}`,
                                    <Tooltip
                                      id="tooltip-top"
                                      title="Edit Milestone"
                                      placement="top"
                                      classes={{ tooltip: classes.tooltip }}
                                      onClick={this.editMilestone.bind(this, milestone.id)}>
                                      <IconButton
                                        aria-label="Edit"
                                        className={classes.tableActionButton}>
                                        <Edit className={ classes.tableActionButtonIcon + " " + classes.edit}/>
                                      </IconButton>
                                    </Tooltip>,
                                    <Tooltip
                                      id="tooltip-top-start"
                                      title="Delete milestone"
                                      placement="top"
                                      onClick={this.deleteMilestone.bind(this, milestone.id)}
                                      classes={{ tooltip: classes.tooltip }}>
                                      <IconButton
                                        aria-label="Close"
                                        className={classes.tableActionButton}>
                                        <Close className={ classes.tableActionButtonIcon + " " + classes.close}/>
                                      </IconButton>
                                    </Tooltip>
                                    ]) 
                                })]} />
                            ) 
                          }) : null 
                      )
                    },
                    {
                      tabName: "Team",
                      tabIcon: People,
                      tabContent: (
                        <div>
                          {team ? team.map(person => {
                          return (
                            <Table
                              tableHeaderColor="primary"
                              tableHead={["Name", "Role", "Remove" ]}
                              tableData={[
                                team.map(person => {
                                  return ([
                                      `${person.user.name}`, 
                                      `${person.role ? person.role.role : null }`,
                                          person.role ? person.role.id !== 1 ?
                                            <Tooltip
                                              id="tooltip-top-start"
                                              title="Remove"
                                              placement="top"
                                              classes={{ tooltip: classes.tooltip }}>
                                              <IconButton
                                                aria-label="Close"
                                                className={classes.tableActionButton}>
                                                <Close className={ classes.tableActionButtonIcon + " " + classes.close}/>
                                              </IconButton>
                                            </Tooltip>
                                          : null : null
                                      ]) 
                                    })
                                  ]} 
                             />) 
                            }) : null } 
                            <CardFooter>
                              <Button 
                                color="primary" 
                                onClick={this.invitePeople}>Invite people</Button>
                            </CardFooter>
                        </div> 
                      )
                    }
                  ]}/>
                  </Card>
                </GridItem>
              </GridContainer>
            </div>
          );
        }
  }


const mapDispatchToProps = dispatch => { 
  return { 
    getProject: (token, id) => dispatch(getProject(token, id)),
    deleteMilestone: (token, id) => dispatch(deleteMilestone(token, id)),
    editProject: (token, id) => dispatch(editProject(token, id))
   }
}

const mapStateToProps = state => ({ 
  project: state.project.project,
  team: state.project.team,
  isFetching: state.project.isFetching,
  successMessage: state.project.successMessage
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(EditProject)));
  
