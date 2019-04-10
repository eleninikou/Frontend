import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
// Redux
import { getAllTickets, getTicketStatus, getTicketTypes } from '../redux/actions/tickets/Actions'
import { getAllProjects } from '../redux/actions/projects/Actions'
import { connect } from 'react-redux'
// Theme components
import GridItem from "../components/theme/Grid/GridItem.jsx"
import GridContainer from "../components/theme/Grid/GridContainer.jsx"
import Card from "../components/theme/Card/Card"
import CardHeader from "../components/theme/Card/CardHeader.jsx"
import CardBody from "../components/theme/Card/CardBody.jsx"
import Button from "../components/theme/CustomButtons/Button.jsx"
// Material UI components
import MenuItem from '@material-ui/core/MenuItem'
import { TextField } from '@material-ui/core'
import withStyles from "@material-ui/core/styles/withStyles"
// COmponents
import TicketsTable from '../components/ticket/TicketsTable'
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
          <GridItem xs={12} sm={12} md={12}>        
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Your tickets</h4>
              </CardHeader>
              <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    value={this.state.type_id}
                    select
                    label="Type"
                    onChange={this.handleChange}
                    className="my-select"
                    variant="outlined"
                    margin="normal"
                    inputProps={{ name: 'type_id', id: 'type_id' }} >
                    <MenuItem value={null}>All</MenuItem>
                        {ticketTypes ? ticketTypes.map(type => {
                          return <MenuItem key={type.id} value={type.id}> {type.type} </MenuItem>    
                      }): null}
                  </TextField>   
                </GridItem>   
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    value={this.state.status_id}
                    select
                    label="Status"
                    onChange={this.handleChange}
                    className="my-select"
                    variant="outlined"
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
                </GridItem> 
                <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      select
                      label="Priority"
                      value={this.state.priority}
                      onChange={this.handleChange}
                      className="my-select"
                      variant="outlined"
                      margin="normal"
                      inputProps={{ name: 'priority', id: 'priority' }} >
                        <MenuItem value={null}>All</MenuItem>
                        <MenuItem value='low'>Low</MenuItem>
                        <MenuItem value='normal'>Normal</MenuItem>
                        <MenuItem value='high'>High</MenuItem>
                    </TextField> 
                </GridItem>  
                <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      select
                      label="Project"
                      value={this.state.project_id}
                      onChange={this.handleChange}
                      className="my-select"
                      variant="outlined"
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
                </GridItem>
                </GridContainer> 
                  <TicketsTable tickets={filteredTickets} classes={classes}/>   
                  <GridContainer>
                    <GridItem xs={12} sm={2} md={2}>
                      <Button color="primary" onClick={this.createNewTicket}>Create new Ticket</Button>
                    </GridItem>
                  </GridContainer>
                        </CardBody>
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
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Tickets)))
  

