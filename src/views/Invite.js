import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import Cookies from 'universal-cookie';

// Redux
import { getProjectsByUser, getProject, getRoles, getTeam } from '../redux/actions/projects/Actions'
import { connect } from 'react-redux'

// Theme componets
import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import Card from "../components/theme/Card/Card";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import Button from "../components/theme/CustomButtons/Button.jsx";
import CustomInput from "../components/theme/CustomInput/CustomInput.jsx";
import CardFooter from "../components/theme/Card/CardFooter.jsx";
import Table from "../components/theme/Table/Table.jsx";

// Material UI components
import TablePagination from '@material-ui/core/TablePagination';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from "@material-ui/core/IconButton";


//Icons
import People from "@material-ui/icons/People";

// Styles
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";


class Invite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_name: '',
      project_role: '',
      email: '',
      team: '',
      page: 0,
      rowsPerPage: 5,
    }

}

  componentWillMount() {
    // From invite to specific project
    if(this.props.match.params.id) {
      this.props.getProject(this.props.match.params.id)
    } else {
      // From dashboard. Get all projects
      this.props.getProjectsByUser()
    }

    this.props.getRoles()
    // fetch team
  }

  handleChange = event => { 
    this.setState({ [event.target.name]: event.target.value }) 

    if([event.target.name] == 'project_name') {
      this.props.getTeam(event.target.value).then(
        res => {
          this.setState({ team : res.team })
        }
      )
    }
  
  }

  render() {
  const { classes, projects, project, roles } = this.props;
  const { rowsPerPage, page, team } = this.state;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, team.length - page * rowsPerPage);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Invite people to join this project</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="project_name">Project</InputLabel>
                    <Select
                      className="my-input"
                      value={this.state.project_name}
                      onChange={this.handleChange}
                      inputProps={{
                        name: 'project_name',
                        id: 'project_name',
                      }}>
                    {projects.projects ? projects.projects.map(project => {
                      return (
                        <MenuItem 
                          key={project.id}
                          value={project.id}>
                            {project.name}
                        </MenuItem>
                      )
                    }): 
                    project ? 
                      <MenuItem 
                        defaultValue
                        key={project.id}
                        value={project.name}>
                          {project.name}
                      </MenuItem>
                    : null
                  }
                    </Select>
                </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="project_role">User role</InputLabel>
                    <Select
                      className="my-input"
                      value={this.state.project_role}
                      onChange={this.handleChange}
                      inputProps={{
                        name: 'project_role',
                        id: 'project_role',
                      }}>
                      {roles ? roles.map(role => {
                      return (
                        <MenuItem 
                          key={role.id}
                          value={role.role}>
                            {role.role}
                        </MenuItem>
                      )
                    }) : null }
                    </Select>
                </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Email"
                    id="Email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={this.handleChange}
                    name="Email"
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="info">Invite</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>The team <People/></h4>
            </CardHeader>
            <CardBody>
              {team ? 
              <div>
                <Table
                  page={page}
                  rowsPerPage={rowsPerPage}
                  emptyRows={emptyRows}
                  tableHeaderColor="info"
                  tableHead={["Name", "Role", ]}
                  tableData={[
                    team ? team.map(user => {
                      return [
                        `${user.user ? user.user.name : null}`, 
                        `${user.role ? user.role.role : null }`,
                        // person.role ? person.role.id !== 1 ?
                        // <Tooltip
                        //   id="tooltip-top-start"
                        //   title="Remove"
                        //   placement="top"
                        //   classes={{ tooltip: classes.tooltip }}>
                        //   <IconButton
                        //     aria-label="Close"
                        //     className={classes.tableActionButton}>
                        //     <Close className={ classes.tableActionButtonIcon + " " + classes.close}/>
                        //   </IconButton>
                        // </Tooltip>
                        // : null : null
                      ] }) : null
                      ]} />
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={team.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                    nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                    </div>
                    : null}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
        );
      }
}


const mapDispatchToProps = dispatch => { 
  return { 
    getProjectsByUser: () => dispatch(getProjectsByUser()),
    getProject: id => dispatch(getProject(id)),
    getRoles: () => dispatch(getRoles()),
    getTeam: id => dispatch(getTeam(id))
   }
}

const mapStateToProps = state => ({ 
  project: state.project.project,
  projects: state.project.projects, 
  team: state.project.team,
  isFetching: state.project.isFetching,
  roles: state.project.roles
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Invite)));
  


