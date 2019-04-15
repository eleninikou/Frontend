import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import Cookies from 'universal-cookie';

// Redux
import { connect } from 'react-redux'
import { getMilestone, milestoneEdit, deleteMilestone } from '../redux/actions/milestones/Actions'

// Theme components
import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import Card from "../components/theme/Card/Card";
import CardBody from "../components/theme/Card/CardBody.jsx";
import Button from "../components/theme/CustomButtons/Button.jsx";
import CustomTabs from "../components/theme/CustomTabs/CustomTabs.jsx";
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx";

// Icons
import Note from "@material-ui/icons/Note";
import Info from "@material-ui/icons/Info";
import DeleteForever from "@material-ui/icons/DeleteForever";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline"

// Styles
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import '../assets/css/main.css'

// Components
import MilestoneContent from '../components/milestone/MilestoneContent';
import EditMilestoneForm from '../components/milestone/EditMilestoneForm';
import MilestoneTickets from '../components/milestone/MilestoneTickets';


class Milestone extends Component {
    constructor(props) {
      super(props);
      this.state = {
        auth_user_id: '',
        title: '',
        focus: '',
        project: '',
        project_id: '',
        selectedDate: '',
        due_date: '',
        creator: '',
        id: ''
      }
      this.milestoneDelete = this.milestoneDelete.bind(this);
  }
  
  componentWillMount() {
    const cookies = new Cookies()
    var auth_user_id = cookies.get('user')
    this.setState( {auth_user_id })

    this.props.getMilestone(this.props.match.params.id)
    .then(res => {
      if(res.milestone) {
        this.setState({ 
          id: res.milestone.id,
          title: res.milestone.title,
          focus: res.milestone.focus,
          project: res.milestone.project.name,
          project_id: res.milestone.project.id,
          due_date: res.milestone.due_date,
          creator: res.milestone.project.creator_id,
          milestone: res.milestone
         })
      } else {
        this.props.history.push({
          pathname: '/home/milestones', 
          state: { errorMessage: 'There is no milestone with that id' }
        })      }
    });

    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
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
      }.bind(this), 4000);
  }

  goToTicket(id) { this.props.history.push(`/home/ticket/${id}`) }

  getEdit = edit => { this.setState({ edit }) }  

  milestoneDelete() {
    this.props.deleteMilestone(this.state.id)
    .then(() => {
      if(this.props.successMessage) {
        this.props.history.push({
          pathname: '/home/projects', 
          state: { successMessage: this.props.successMessage}
        })
      }
    })
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }


  getSuccess = successMessage => {
    this.setState({ successMessage })
    this.showNotification('tr')
    this.props.getMilestone(this.props.match.params.id)
    .then(res => {
      if(res.milestone) {
        this.setState({ 
          id: res.milestone.id,
          title: res.milestone.title,
          focus: res.milestone.focus,
          project: res.milestone.project.name,
          project_id: res.milestone.project.id,
          due_date: res.milestone.due_date,
          creator: res.milestone.project.creator_id,
          milestone: res.milestone
         })
      } else {
        this.props.history.push(`/home`)
      }})
  }

  render() {
    const { classes, tickets, successMessage } = this.props;
    const { edit, creator, auth_user_id, milestone } = this.state;

      return (
        <GridContainer>
            <Snackbar
              place="tr"
              color="success"
              icon={CheckCircleOutline}
              message={successMessage}
              open={this.state.tr}
              closeNotification={() => this.setState({ tr: false })}
              close
            /> 
              <GridItem xs={12} sm={12} md={12}>
                  <Card>
                  {milestone ? 
                  <CustomTabs
                    headerColor="warning"
                    tabs={[
                      {
                        tabName: "Info",
                        tabIcon: Info,
                        tabContent: (
                          edit ?
                          <EditMilestoneForm 
                            classes={classes} 
                            milestone={milestone}
                            getSuccess={this.getSuccess.bind(this)}
                            getEdit={this.getEdit.bind(this)}
                          />
                          :
                          <MilestoneContent 
                            milestone={milestone}
                            classes={classes}
                            getEdit={this.getEdit.bind(this)}
                            creator={creator === parseInt(auth_user_id) ? true : false}
                            /> 
                        ) 
                      }, 
                    {
                      tabName: "Tickets",
                      tabIcon: Note,
                      tabContent: ( 
                        tickets ? 
                          <MilestoneTickets 
                            tickets={tickets} 
                            classes={classes}
                            project_id={this.state.project_id} />   
                         : null 
                      )
                    },
                    parseInt(auth_user_id)  === creator ?
                    {
                      tabName: "Delete",
                      tabIcon: DeleteForever,
                      tabContent: (
                        <CardBody>
                          <Button color="warning" onClick={this.milestoneDelete}>
                            Delete milestone
                          </Button>
                        </CardBody>
                      )
                    }
                    : null
                  ]}/> : null}
                  </Card>
                </GridItem>
              </GridContainer>
          );
        }
  }


const mapDispatchToProps = dispatch => { 
  return { 
    getMilestone: id => dispatch(getMilestone(id)),
    milestoneEdit: (milestone, id) => dispatch(milestoneEdit(milestone, id)),
    deleteMilestone: id => dispatch(deleteMilestone(id)),

  }
}

const mapStateToProps = state => ({ 
  milestone: state.milestone.milestone,
  isFetching: state.milestone.isFetching,
  tickets: state.milestone.tickets,
  successMessage: state.milestone.successMessage
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Milestone)));
  
