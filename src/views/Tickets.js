import React, { Component } from 'react'
import { withRouter } from "react-router-dom"

// Redux
import { getAllTickets, getTicketStatus, getTicketTypes } from '../redux/actions/tickets/Actions'
import { getAllProjects } from '../redux/actions/projects/Actions'
import { connect } from 'react-redux'

// Theme components
import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import Table from "../components/theme/Table/Table.jsx";
import Card from "../components/theme/Card/Card";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import Button from "../components/theme/CustomButtons/Button.jsx";

// Material UI components
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import TablePagination from '@material-ui/core/TablePagination';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';


// Styles
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";


class Tickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 5,
      tickets: [],
      filtredTickets: []
    }
    this.createNewTicket = this.createNewTicket.bind(this);
  }

  componentWillMount() { 
    this.props.getAllTickets().then(res => {
      this.setState({ tickets: res.tickets})
    });
    this.props.getTicketStatus()
    this.props.getTicketTypes()
    this.props.getAllProjects()
  }

  createNewTicket() { this.props.history.push('/home/create-ticket') }

  goToTicket(id) { this.props.history.push(`/home/ticket/${id}`) }

  handleChangePage = (event, page) => { this.setState({ page }) }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ 
      [name]: value,
      filter: name
     });
     
     console.log(this.state.tickets)
     let filteredTickets = this.state.tickets
     
     filteredTickets = filteredTickets.filter(ticket => ticket.name == value )
     debugger;

     this.setState({ filteredTickets })
  }

  render() {
    const { classes, allTickets, ticketStatus, ticketTypes, allProjects } = this.props;
    const { rowsPerPage, page, filter, status_id, type_id, priority, project_id, tickets } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, allTickets.length - page * rowsPerPage);


      // switch(filter) {
      //   case 'status_id':
      //     tickets = allTickets.filter(ticket => 
      //       ticket.status_id === status_id && ticket.type_id === type_id && ticket.priority == priority)
      //     console.log(tickets)
      //     break;
      //   case 'type_id':
      //     tickets = allTickets.filter(ticket => ticket.type_id === type_id)
      //     break;
      //   case 'priority':
      //     tickets = allTickets.filter(ticket => ticket.priority == priority)
      //     break; 
      //   case 'project_id':
      //     tickets = allTickets.filter(ticket => ticket.project_id == project_id)
      //     break;   
      //   default:
      //     tickets = allTickets;
      // }
  

    return (
    <GridContainer>              
          <GridItem xs={12} sm={12} md={9}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Your tickets</h4>
              </CardHeader>
              <CardBody>
                <Table
                  page={page}
                  rowsPerPage={rowsPerPage}
                  emptyRows={emptyRows}
                  tableHeaderColor="primary"
                  tableHead={["Title", "Project", "Type", "Status", "Priority", "Milestone", "Due Date", "Edit"]}
                  tableData={[ tickets ? tickets.map(ticket => {
                    return [
                      `${ticket.title}`,
                      `${ticket.project.name}`, 
                      `${ticket.type.type}`, 
                      `${ticket.status.status}`,
                      `${ticket.priority}`, 
                      `${ticket.milestone.title}`,
                      `${ticket.due_date}`,
                      <Tooltip
                          id="tooltip-top"
                          title="Go To Ticket"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                          onClick={this.goToTicket.bind(this, ticket.id)} >
                        <IconButton aria-label="Edit" className={classes.tableActionButton}>
                          <Edit style={{ color:'#ab47bc' }} className={ classes.tableActionButtonIcon + " " + classes.edit }/>
                        </IconButton>
                      </Tooltip>,
                      ]
                    }) : null ]}
                  />
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={allTickets.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                    nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                </CardBody>
              </Card>
            </GridItem>

      <GridItem xs={12} sm={12} md={3}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Filter Tickets</h4>
          </CardHeader>

            <FormControl className="my-select"> 
            <InputLabel className="my-label">Type</InputLabel> 
                <Select
                  value={this.state.type_id}
                  onChange={this.handleChange}
                  className="my-select"
                  inputProps={{ name: 'type_id', id: 'type_id' }} >
                  <MenuItem value={null}>All</MenuItem>
                      {ticketTypes ? ticketTypes.map(type => {
                        return <MenuItem key={type.id} value={type.id}> {type.type} </MenuItem>    
                    }): null}
                </Select>   
            </FormControl>

            <FormControl className="my-select">  
            <InputLabel className="my-label">Status</InputLabel>
              <Select
                value={this.state.status_id}
                onChange={this.handleChange}
                className="my-select"
                inputProps={{ name: 'status_id', id: 'status_id' }} >
                  <MenuItem value={null}>All</MenuItem>
                  {ticketStatus ? ticketStatus.map(status => {
                    return <MenuItem  key={status.id} value={status.id}> {status.status} </MenuItem> 
                  }): null}
              </Select> 
            </FormControl>   

            <FormControl className="my-select"> 
            <InputLabel className="my-label">Priority</InputLabel> 
              <Select
                value={this.state.priority}
                onChange={this.handleChange}
                className="my-select"
                inputProps={{ name: 'priority', id: 'priority' }} >
                    <MenuItem value={null}>All</MenuItem>
                    <MenuItem value={'low'}>Low</MenuItem>
                    <MenuItem value={'normal'}>Normal</MenuItem>
                    <MenuItem value={'high'}>High</MenuItem>
                </Select>        
            </FormControl>

            <FormControl className="my-select"> 
            <InputLabel className="my-label">Project</InputLabel>     
              <Select
                value={this.state.project_id}
                onChange={this.handleChange}
                className="my-select"
                inputProps={{ name: 'project_id', id: 'project_id' }} >
                  <MenuItem value={null}>All</MenuItem>
                    {allProjects ? allProjects.map(project => {
                      return <MenuItem key={project.project_id} value={project.project_id}>  {project.project.name} </MenuItem>
                     }): null}
              </Select> 
            </FormControl>
                
          </Card>    

          <Card>
              <Button color="primary" onClick={this.createNewTicket}>Create new Ticket</Button>
          </Card>

        </GridItem>

          </GridContainer>
        );
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
  isFetching: state.ticket.isFetching,
  ticketStatus: state.ticket.ticketStatus,
  ticketTypes: state.ticket.ticketTypes,
  allProjects: state.project.allProjects,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Tickets)));
  

