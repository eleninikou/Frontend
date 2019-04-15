import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
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
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles"
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline"

// Components
import MilestonesTable from '../components/milestone/MilestonesTable'

// Styles
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx"


class Milestones extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      errorMessage: '',
      successMessage: ''
    }
  }

  componentWillMount = () => { 
    this.props.getAllProjects() 

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

  createNewMilestone = () => { this.props.history.push('/home/create-milestone') }

  
  render() {

    const milestones = this.props.milestones.flatMap(milestone => milestone)
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
            : null }
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={this.props.classes.cardTitleWhite}>Milestones</h4>
            </CardHeader>
            <CardBody>
              <MilestonesTable 
                milestones={milestones ? milestones : null}
                classes={this.props.classes} />
                <GridContainer>
                  <GridItem xs={12} sm={2} md={2}>
                    <Button color="warning"  onClick={this.createNewMilestone.bind(this)}>
                      Create new Milestone
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

const mapDispatchToProps = dispatch => { return { getAllProjects: (token, id) => dispatch(getAllProjects(token, id)) }}
const mapStateToProps = state => ({ milestones: state.project.milestones })

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Milestones)))
  

