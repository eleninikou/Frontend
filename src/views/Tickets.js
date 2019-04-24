import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
// Redux
import { getAllTickets, getTicketStatus, getTicketTypes } from '../redux/actions/tickets/Actions'
import { getAllProjects } from '../redux/actions/projects/Actions'
import { connect } from 'react-redux'
// Theme components
import Card from "../components/theme/Card/Card"
import Button from "../components/theme/CustomButtons/Button.jsx"
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx"
import CardBody from "../components/theme/Card/CardBody.jsx"
import GridItem from "../components/theme/Grid/GridItem.jsx"
import CardHeader from "../components/theme/Card/CardHeader.jsx"
import CardFooter from "../components/theme/Card/CardFooter.jsx"
import GridContainer from "../components/theme/Grid/GridContainer.jsx"
// Material UI components
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import withStyles from "@material-ui/core/styles/withStyles"
import FormControl from '@material-ui/core/FormControl'
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline"
//Components
import TicketsTable from '../components/ticket/TicketsTable'
import DashboardSpinner from '../components/spinner/DashboardSpinner'
// Styles
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx"


class Tickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 5,
      tickets: [],
      filtredTickets: [],
      type_id: '',
      priority: '',
      status_id: '',
      project_id: ''
    }
    this.createNewTicket = this.createNewTicket.bind(this)
  }

  componentWillMount() { 
    this.props.getAllTickets().then(res => { this.setState({ tickets: res.tickets}) })
    this.props.getTicketStatus()
    this.props.getTicketTypes()
    this.props.getAllProjects()

    if (this.props.location.state ? this.props.location.state.errorMessage : null) {
      this.setState({ 
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

  createNewTicket() { this.props.history.push('/home/create-ticket') }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name] : value })
  }

  render() {
    const { classes, ticketStatus, ticketTypes, allProjects } = this.props;
    const { status_id, type_id, priority, project_id, tickets } = this.state;

        let filteredTickets = tickets ? tickets.filter(ticket => {
        return (
          (status_id ? parseInt(ticket.status_id) === parseInt(status_id) : ticket) &&
          (type_id ? parseInt(ticket.type_id) === parseInt(type_id) : ticket) &&
          (priority ? ticket.priority === priority : ticket) &&
          (project_id ? parseInt(ticket.project_id) === parseInt(project_id) : ticket)
        )
      }) : tickets
     
    return (
      <GridContainer>    
        <Snackbar
          place="tr"
          color="danger"
          icon={CheckCircleOutline}
          message={this.state.errorMessage}
          open={this.state.tr}
          closeNotification={() => this.setState({ tr: false })}
          close
          />          
          <GridItem xs={12} sm={12} md={12}>        
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Your tickets</h4>
              </CardHeader>
              <CardBody>
              {this.props.isFetching ? 
                  <div style={{ width: '100%', textAlign: 'center'}}>
                    <DashboardSpinner /> 
                  </div>
                :
              <div> 
              <GridContainer style={{ padding: '10px 20px 20px'}}>
                <GridItem xs={12} sm={12} md={3}>
                <FormControl className={classes.formControl}>       
                  <TextField
                    value={this.state.type_id}
                    select
                    label="Type"
                    onChange={this.handleChange}
                    margin="normal"
                    inputProps={{ name: 'type_id', id: 'type_id' }} >
                    <MenuItem value={null}>All</MenuItem>
                        {ticketTypes ? ticketTypes.map(type => {
                          return (
                            <MenuItem key={type.id} value={type.id} style={{ display: 'flex', alignItems: 'center'}}> 
                          {type.type} 
                        </MenuItem>   
                          )
                      }): null}
                  </TextField>   
                  </FormControl>
                </GridItem>   
                <GridItem xs={12} sm={12} md={3}>
                <FormControl className={classes.formControl}>       
                  <TextField
                    value={this.state.status_id}
                    select
                    label="Status"
                    onChange={this.handleChange}
                    margin="normal"
                    inputProps={{ name: 'status_id', id: 'status_id' }} >
                      <MenuItem value={null}>All</MenuItem>
                      {ticketStatus ? ticketStatus.map(status => {
                        return (
                          <MenuItem key={status.id} value={status.id}> 
                            {status.status} 
                          </MenuItem> 
                          )
                      }): null}
                  </TextField> 
                  </FormControl>
                </GridItem> 
                <GridItem xs={12} sm={12} md={3}>
                  <FormControl className={classes.formControl}>       
                    <TextField
                      select
                      label="Priority"
                      value={this.state.priority}
                      onChange={this.handleChange}
                      // variant="outlined"
                      margin="normal"
                      inputProps={{ name: 'priority', id: 'priority' }} >
                        <MenuItem value={null}>All</MenuItem>
                        <MenuItem value='low'>
                          Low
                        </MenuItem>
                        <MenuItem value='normal'>
                          Normal
                        </MenuItem>
                        <MenuItem value='high'>
                          High
                        </MenuItem>
                    </TextField> 
                    </FormControl>
                </GridItem>  
                <GridItem xs={12} sm={12} md={3}>
                  <FormControl className={classes.formControl}>       
                    <TextField
                      select
                      label="Project"
                      value={this.state.project_id}
                      onChange={this.handleChange}
                      // variant="outlined"
                      margin="normal"
                      inputProps={{ name: 'project_id', id: 'project_id' }} >
                        <MenuItem value={null}>All</MenuItem>
                          {allProjects ? allProjects.map(project => {
                            return (
                              <MenuItem key={project.project_id} value={project.project_id}>  
                                {project.project.name} 
                              </MenuItem>
                            )
                           }): null}
                    </TextField>
                    </FormControl>
                </GridItem>
                </GridContainer> 
                <TicketsTable tickets={filteredTickets} classes={classes}/>   
                 </div> }
                </CardBody>
                <CardFooter style={{ justifyContent: 'flex-end'}}>
                  <Button color="primary" onClick={this.createNewTicket}>Create new Ticket</Button>
                </CardFooter>
              </Card>
            </GridItem>
        </GridContainer>
        )
      }
}


const mapDispatchToProps = dispatch => { 
  return { 
    getAllTickets: () => dispatch(getAllTickets()), 
    getTicketStatus: () => dispatch(getTicketStatus()),
    getTicketTypes: () => dispatch(getTicketTypes()),
    getAllProjects: () => dispatch(getAllProjects())
  }}

const mapStateToProps = state => ({ 
  allTickets: state.ticket.allTickets, 
  ticketStatus: state.ticket.ticketStatus,
  ticketTypes: state.ticket.ticketTypes,
  allProjects: state.project.allProjects,
  isFetching: state.ticket.isFetching
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Tickets)))
  

