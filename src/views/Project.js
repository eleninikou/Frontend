import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types";

import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import Table from "../components/theme/Table/Table.jsx";
import Card from "../components/theme/Card/Card";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import Cookies from 'universal-cookie';
import Button from "../components/theme/CustomButtons/Button.jsx";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CustomTabs from "../components/theme/CustomTabs/CustomTabs.jsx";

import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import People from "@material-ui/icons/People";
import Timeline from "@material-ui/icons/Timeline";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Note from "@material-ui/icons/Note";
import DeleteForever from "@material-ui/icons/DeleteForever";
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import { getProject } from '../redux/actions/projects/Actions'
import { connect } from 'react-redux'



class Project extends Component {
  constructor(props) {
    super(props);

    this.state = { }
}

  componentWillMount() {
    const cookies = new Cookies()
    var token = cookies.get('token')
    this.props.getProject(token, this.props.match.params.id);
  }

    render() {
        const { classes, project, team } = this.props;
        return (
          <GridContainer> 
            <Card>
          {console.log(this.props.project)}
              <GridItem xs={12} sm={12} md={12}>
                  {/* <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Project: {project.name}</h4>
                  </CardHeader> */}
                  <CardBody>
                  <CustomTabs
                  headerColor="primary"
                  tabs={[
                    {
                      tabName: "Info",
                      tabIcon: LibraryBooks,
                      tabContent: ( project ?
                        <Table
                        tableHeaderColor="primary"
                        tableHead={["Name", "Description", "Created"]}
                        tableData={[
                          // project.name, 
                          // `${project.description}`, 
                          // `${project.created_at}`
                          console.log(project)
                                ]} 
                            /> : null )
                    },{
                      tabName: "Milestones",
                      tabIcon: Timeline,
                      tabContent: (
                        <Table
                          tableHeaderColor="primary"
                          tableHead={["Name", "Focus", "Last updated"]}
                          tableData={[
                          // project.milestones? project.milestones.map(milestone => {
                          //   return (
                          //     `${milestone.title}`, 
                          //     `${milestone.focus}`,
                          //     `${milestone.updated_at}`
                          //   )
                          // }) : null 
                          ]} 
                        />
                      )
                    },
                    {
                      tabName: "Team",
                      tabIcon: People,
                      tabContent: (
                            <Table
                              tableHeaderColor="primary"
                              tableHead={["Name", "Role", "Remove" ]}
                              tableData={[
                                // team ? team.map(person => {
                                //   return ([
                                //       `${person.user.name}`, 
                                //       `${person.role ? person.role.role : null }`,
                                //           person.role ? person.role.id !== 1 ?
                                //             <Tooltip
                                //               id="tooltip-top-start"
                                //               title="Remove"
                                //               placement="top"
                                //               classes={{ tooltip: classes.tooltip }}>
                                //               <IconButton
                                //                 aria-label="Close"
                                //                 className={classes.tableActionButton}>
                                //                 <Close className={ classes.tableActionButtonIcon + " " + classes.close}/>
                                //               </IconButton>
                                //             </Tooltip>
                                //           : null : null
                                //       ]) 
                                //     }) : null
                              ]} 
                             />
                      )
                    },
                    {
                      tabName: "Tickets",
                      tabIcon: Note,
                      tabContent: (
                        'tickets'
                      )
                    }
                  ]}/>
                  </CardBody>
              </GridItem>
                </Card>
            </GridContainer>
        );
      }
}

Project.propTypes = { classes: PropTypes.object.isRequired };

const mapDispatchToProps = dispatch => { 
  return { getProject: (token, id) => dispatch(getProject(token, id)) }
}

const mapStateToProps = state => ({ 
  project: state.project.project,
  team: state.project.team,
  isFetching: state.project.isFetching
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Project)));
  

