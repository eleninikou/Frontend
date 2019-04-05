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
// Material UI
import withStyles from "@material-ui/core/styles/withStyles"
// Components
import MilestonesTable from '../components/milestone/MilestonesTable'
// Styles
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx"
import '../assets/css/main.css'


class Milestones extends Component {

  componentWillMount = () => { this.props.getAllProjects() }
  createNewMilestone = () => { this.props.history.push('/home/create-milestone') }

  render() {
    return (
      <GridContainer> 
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={this.props.classes.cardTitleWhite}>Milestones</h4>
            </CardHeader>
            <CardBody>
              <MilestonesTable 
                milestones={this.props.milestones}
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
  

