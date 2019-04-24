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
import Radio from '@material-ui/core/Radio'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import RadioGroup from '@material-ui/core/RadioGroup'
import withStyles from "@material-ui/core/styles/withStyles"
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
// Icons
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline"
// Components
import ProjectsTable from '../components/project/ProjectsTable'
import DashboardSpinner from '../components/spinner/DashboardSpinner'
// Styles
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx"
import '../assets/css/main.css'


class Projects extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      successMessage: this.props.successMessage,
      errorMessage: '',
      active: ''
     }
  }

  componentWillMount = () => {
    this.props.getAllProjects()

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
    this.setState({ active: event.target.value }) 
    console.log(event.target.value)
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
          this.state.active === "0" ? projects.filter(project => { return project.project.active === 0 })
          : this.state.active === "1" ? projects.filter(project => { return project.project.active === 1 })
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
                {this.props.isFetching ? 
                  <div style={{ width: '100%', textAlign: 'center'}}>
                    <DashboardSpinner /> 
                  </div>
                : 
                <div>
                  <FormControl component="fieldset" className={this.props.classes.formControl}>
                    <RadioGroup
                      aria-label="active"
                      name="active"
                      className={this.props.classes.group}
                      value={this.state.active}
                      onChange={this.handleChange}
                      style={{ flexDirection: 'row'}}
                      >
                      <FormControlLabel value="" control={<Radio />} label="All" />
                      <FormControlLabel value="1" control={<Radio />} label="Active" />
                      <FormControlLabel value="0" control={<Radio />} label="Inactive" />
                    
                    </RadioGroup>
                  </FormControl>
                  <ProjectsTable 
                    projects={filtredProjects}
                    isFetching={this.props.isFetching}
                    classes={this.props.classes}
                    /> 
                </div>}
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

const mapStateToProps = state => ({ 
  allProjects: state.project.allProjects,
  isFetching: state.project.isFetching 
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Projects)))
  

