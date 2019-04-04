import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Cookies from 'universal-cookie';
import moment from 'moment';

// Redux
import { connect } from 'react-redux'
import { getAllProjects } from '../redux/actions/projects/Actions'

// Theme components
import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import Table from "../components/theme/Table/Table.jsx";
import Card from "../components/theme/Card/Card";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import Button from "../components/theme/CustomButtons/Button.jsx";
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx";

// Material UI components
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import TablePagination from '@material-ui/core/TablePagination';

// Icons
import ExitToApp from "@material-ui/icons/ExitToApp";

// Styles
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";


class Projects extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      auth_user_id: '',
      page: 0,
      rowsPerPage: 5
    }
    this.createNewProject = this.createNewProject.bind(this);
    this.goToProject = this.goToProject.bind(this);
}

  componentWillMount = () => {
    const cookies = new Cookies()
    var auth_user_id = cookies.get('user')
    this.setState({ auth_user_id })
    this.props.getAllProjects();

    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }

    // If redirected from create project display Success message
    if (this.props.location.state ? this.props.location.state.successMessage : null) {
      this.setState({ successMessage : this.props.location.state.successMessage })
      this.showNotification('tr')
    }
  }

  createNewProject() { this.props.history.push('/home/create-project/') }

  goToProject(id) { this.props.history.push(`/home/project/${id}`) }

  handleChangePage = (event, page) => { this.setState({ page }) }

  handleChangeRowsPerPage = event => { this.setState({ rowsPerPage: event.target.value }) }

  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      6000
    );
  }

    render() {
      const { classes, allProjects } = this.props;
      const { rowsPerPage, page, auth_user_id, successMessage } = this.state;
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, allProjects.length - page * rowsPerPage);

        // https://reactgo.com/removeduplicateobjects/
        function getUnique(arr, comp) {
          const unique = arr.map(e => e[comp])
              .map((e, i, final) => final.indexOf(e) === i && i)
              .filter(e => arr[e]).map(e => arr[e]);
           return unique;
        }
  
        let projects = getUnique(allProjects,'project_id')

      return (
        <div>
          <Snackbar
            place="tr"
            color="success"
            message={successMessage}
            open={this.state.tr}
            closeNotification={() => this.setState({ tr: false })}
            close
          />
          <GridContainer> 
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="success">
                  <h4 className={classes.cardTitleWhite}>Projects</h4>
                </CardHeader>
                <CardBody>
                  <Table
                    page={page}
                    rowsPerPage={rowsPerPage}
                    emptyRows={emptyRows}
                    tableHeaderColor="success"
                    tableHead={["Name", "Created", "Open Tickets", "Total Tickets", "Last updated", "Details" ]}
                    tableData={[ 
                      projects ? projects.map(project => {
                      let active_tickets = project.tickets.filter(ticket => (ticket.status_id !== (7 && 4)))
                        return ([ 
                            `${project.project.name}`, 
                            `${moment(project.project.created_at).format('YYYY-MM-DD')}`, 
                            (active_tickets).length, 
                            `${(project.tickets).length}`, 
                            `${moment(project.updated_at).format('YYYY-MM-DD')}`,
                            <Tooltip
                              id="tooltip-top"
                              title="Go to Project"
                              placement="top"
                              classes={{ tooltip: classes.tooltip }}
                              onClick={this.goToProject.bind(this, project.project.id)} >
                              <IconButton aria-label="Go to" className={classes.tableActionButton}>
                                <ExitToApp style={{color:'#4caf50'}} className={ classes.tableActionButtonIcon + " " + classes.edit }/>
                              </IconButton>
                          </Tooltip>
                          ]) 
                      }): null
                    ]} />
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 20]}
                      component="div"
                      count={allProjects.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                      nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage} />
                      <GridContainer>
                        <GridItem xs={12} sm={2} md={2}>
                          <Button color="success"  onClick={this.createNewProject}>Create new Project</Button>
                        </GridItem>
                      </GridContainer>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        );
      }
}


const mapDispatchToProps = dispatch => { return { getAllProjects: () => dispatch(getAllProjects()) }}

const mapStateToProps = state => ({ 
  allProjects: state.project.allProjects,
  isFetching: state.project.isFetching
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Projects)));
  

