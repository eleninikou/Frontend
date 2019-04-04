import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { getAllProjects } from '../redux/actions/projects/Actions'
import Cookies from 'universal-cookie';

// Theme components
import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import Table from "../components/theme/Table/Table.jsx";
import Card from "../components/theme/Card/Card";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import Button from "../components/theme/CustomButtons/Button.jsx";

// Material UI components
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import TablePagination from '@material-ui/core/TablePagination';

//Icons
import Edit from "@material-ui/icons/Edit";
import ExitToApp from "@material-ui/icons/ExitToApp";

// Styles
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";


class Milestones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 5,
      auth_user_id: ''
    }
    this.createNewMilestone = this.createNewMilestone.bind(this);
  }

  componentWillMount() { 
    const cookies = new Cookies()
    var auth_user_id = cookies.get('user')
    this.setState({ auth_user_id })
    this.props.getAllProjects()
  }

  createNewMilestone() { this.props.history.push('/home/create-milestone') }

  goToMilestone(id) { this.props.history.push(`/home/milestone/${id}`)}

  handleChangePage = (event, page) => { this.setState({ page }) }

  handleChangeRowsPerPage = event => { this.setState({ rowsPerPage: event.target.value }) }

  render() {
    const { classes, milestones } = this.props;
    const { rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, milestones ? milestones.length : 0 - page * rowsPerPage);
    
    return (
      <GridContainer> 
        <Button color="warning"  onClick={this.createNewMilestone}>Create new Milestone</Button>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Milestones</h4>
              </CardHeader>
              <CardBody>
                <Table
                  page={page}
                  rowsPerPage={rowsPerPage}
                  emptyRows={emptyRows}
                  tableHeaderColor="warning"
                  tableHead={["Name", "Focus", "Project", "Last updated", "Edit", "Details" ]}
                  tableData={[
                      milestones ? milestones.map(milestone => {
                        return [
                          `${milestone.title}`, 
                          `${milestone.focus}`,
                          `${milestone.project ? milestone.project.name : null}`, 
                          `${milestone.updated_at}`,
                            milestone.project ? milestone.project.creator_id == this.state.auth_user_id ?  
                              <Tooltip
                                id="tooltip-top"
                                title="Edit Milestone"
                                placement="top"
                                classes={{ tooltip: classes.tooltip }}
                                onClick={this.goToMilestone.bind(this, milestone.id)} >
                                <IconButton aria-label="Edit" className={classes.tableActionButton}>
                                  <Edit className={classes.tableActionButtonIcon + " " + classes.edit} style={{color:'#ffa726'}} />
                                </IconButton>
                              </Tooltip>
                            : null : null,
                            <Tooltip
                              id="tooltip-top"
                              title="Go to Milestone"
                              placement="top"
                              classes={{ tooltip: classes.tooltip }}
                              onClick={this.goToMilestone.bind(this, milestone.id)} >
                              <IconButton aria-label="Go to" className={classes.tableActionButton}>
                                <ExitToApp className={ classes.tableActionButtonIcon + " " + classes.edit } style={{color:'#ffa726'}} />
                              </IconButton>
                            </Tooltip>,
                          ]
                          }) : null  
                  ]} /> 
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={milestones ? milestones.length : 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                    nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        );
      }
}


const mapDispatchToProps = dispatch => { 
  return { getAllProjects: (token, id) => dispatch(getAllProjects(token, id)) }
}

const mapStateToProps = state => ({ 
  milestones: state.project.milestones,
  isFetching: state.project.isFetching
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Milestones)));
  

