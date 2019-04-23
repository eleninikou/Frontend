import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// Redux
import { connect } from 'react-redux'
import { getAllProjects } from '../redux/actions/projects/Actions'
// Theme components
import Card from "../components/theme/Card/Card"
import Button from "../components/theme/CustomButtons/Button.jsx"
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx"
import GridItem from "../components/theme/Grid/GridItem.jsx"
import CardBody from "../components/theme/Card/CardBody.jsx"
import CardHeader from "../components/theme/Card/CardHeader.jsx"
import CardFooter from "../components/theme/Card/CardFooter.jsx"
import GridContainer from "../components/theme/Grid/GridContainer.jsx"
// Material UI components
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import withStyles from "@material-ui/core/styles/withStyles"
import FormControl from '@material-ui/core/FormControl'
// Icons
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline"
// Components
import ProjectsTable from '../components/project/ProjectsTable'
// Styles
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx"
import '../assets/css/main.css'


class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      successMessage: this.props.successMessage,
      errorMessage: '',
      active: ''
     }
  }

  componentWillMount = () => {
    this.props.getAllProjects();

    // To prevent errormessage from notification bar
    var id = window.setTimeout(null, 0)
    while (id--) { window.clearTimeout(id) }

    // If redirected from create project display Success message
    if (this.props.location.state ? this.props.location.state.successMessage || this.props.location.state.errorMessage : null) {
      this.setState({ 
        successMessage : this.props.location.state.successMessage, 
        errorMessage: this.props.location.state.errorMessage
      })
      this.showNotification('tr')
    }
  }
  
  // Show notification
  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this), 6000);
    }

   createNewProject() { this.props.history.push('/home/create-project/') }

    handleChange = event => {
      const { name, value } = event.target
      this.setState({ [name]: value })
    }

    render() {

        // https://reactgo.com/removeduplicateobjects/
        function getUnique(arr, comp) {
          const unique = arr.map(e => e[comp])
              .map((e, i, final) => final.indexOf(e) === i && i)
              .filter(e => arr[e]).map(e => arr[e])
           return unique;
        }
        let projects = getUnique(this.props.allProjects,'project_id')

        // Filter projects
        const filtredProjects = 
          this.state.active === 0 ? projects.filter(project => {
            return project.project.active === 0
          })
          : this.state.active === 1 ? projects.filter(project => {
            return project.project.active === 1
          })
          : projects
        

      return (
        <GridContainer> 
          {this.state.errorMessage ? 
            <Snackbar
              place="tr"
              color="danger"
              icon={CheckCircleOutline}
              message={this.state.errorMessage}
              open={this.state.tr}
              closeNotification={() => this.setState({ tr: false })}
              close
              />
            :
            <Snackbar
              place="tr"
              color="success"
              icon={CheckCircleOutline}
              message={this.state.successMessage}
              open={this.state.tr}
              closeNotification={() => this.setState({ tr: false })}
              close
            /> 
          }
          <GridItem xs={12} sm={12} md={12}>
          <GridContainer>
            <Card>
              <CardHeader color="success">
                <h4 className={this.props.classes.cardTitleWhite}>Projects</h4>
              </CardHeader>
                <CardBody>
                  <GridItem xs={12} sm={6} md={3}>
                    <FormControl className={this.props.classes.formControl}>       
                      <TextField
                        value={this.state.status_id}
                        select
                        label="Select projects"
                        fullWidth
                        onChange={this.handleChange}
                        margin="normal"
                        inputProps={{ name: 'active', id: 'active' }} >
                          <MenuItem value={null}>All</MenuItem>
                          <MenuItem value={1}> Active </MenuItem> 
                          <MenuItem value={0}> Inactive </MenuItem> 
                      </TextField> 
                    </FormControl>
                  </GridItem>
                  <ProjectsTable 
                    projects={filtredProjects}
                    classes={this.props.classes}
                    />
                    <CardFooter style={{ justifyContent: 'flex-end'}}>
                      <Button color="success"  onClick={this.createNewProject.bind(this)}>
                        Create new Project
                      </Button>
                    </CardFooter>
                </CardBody>
            </Card>
            </GridContainer>
          </GridItem>
        </GridContainer>
      )
    }
}


const mapDispatchToProps = dispatch => { return { getAllProjects: () => dispatch(getAllProjects()) }}

const mapStateToProps = state => ({ allProjects: state.project.allProjects })

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Projects)))
  

