import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// Redux
import { connect } from 'react-redux'
import { getAllProjects } from '../redux/actions/projects/Actions'
// Theme components
import GridItem from "../components/theme/Grid/GridItem.jsx"
import GridContainer from "../components/theme/Grid/GridContainer.jsx"
import Card from "../components/theme/Card/Card"
import CardHeader from "../components/theme/Card/CardHeader.jsx"
import CardBody from "../components/theme/Card/CardBody.jsx"
import Button from "../components/theme/CustomButtons/Button.jsx"
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx"
// Material UI components
import withStyles from "@material-ui/core/styles/withStyles"
// Icons
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline"
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

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
      errorMessage: ''
     }
  }

  componentWillMount = () => {
    this.props.getAllProjects();

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

    render() {

        // https://reactgo.com/removeduplicateobjects/
        function getUnique(arr, comp) {
          const unique = arr.map(e => e[comp])
              .map((e, i, final) => final.indexOf(e) === i && i)
              .filter(e => arr[e]).map(e => arr[e])
           return unique;
        }
        let projects = getUnique(this.props.allProjects,'project_id')

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
            <Card>
              <CardHeader color="success">
                <h4 className={this.props.classes.cardTitleWhite}>Projects</h4>
              </CardHeader>
                <CardBody>
                  <GridItem xs={12} sm={2} md={6} style={{ float: 'right', width:'100px'}}>
                    <FormControl className={this.props.classes.formControl}>       
                      <TextField
                        value={this.state.status_id}
                        select
                        label="Active"
                        onChange={this.handleChange}
                        variant="outlined"
                        margin="normal"
                        inputProps={{ name: 'status_id', id: 'status_id' }} >
                          <MenuItem value={null}>All</MenuItem>
                          <MenuItem value={1}> Active </MenuItem> 
                          <MenuItem value={0}> Inacctive </MenuItem> 
                      </TextField> 
                    </FormControl>
                  </GridItem>
                  <ProjectsTable 
                    projects={projects}
                    classes={this.props.classes}
                    />
                  <GridContainer>
                    <GridItem xs={12} sm={2} md={2}>
                      <Button color="success"  onClick={this.createNewProject.bind(this)}>
                        Create new Project
                      </Button>
                    </GridItem>
                  </GridContainer>
                </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      )
    }
}


const mapDispatchToProps = dispatch => { return { getAllProjects: () => dispatch(getAllProjects()) }}

const mapStateToProps = state => ({ allProjects: state.project.allProjects })

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Projects)))
  

