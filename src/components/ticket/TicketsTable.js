import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import moment from 'moment'
// Theme components
import Table from "../theme/Table/Table.jsx";
import TablePagination from '@material-ui/core/TablePagination'
// Material UI components
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
// Icons
import ExitToApp from "@material-ui/icons/ExitToApp";


class TicketsTable extends Component {
    constructor(props) {
      super(props);
      this.state = { 
          page: 0,
          rowsPerPage: 5,
          ticketRowsPerPage: 5,
      }
  }

    handleChangePage = (event, page) => { this.setState({ page }) } 

    handleChangeRowsPerPage = event => { this.setState({ rowsPerPage: event.target.value }) }  

    goToTicket(id) { this.props.history.push(`/home/ticket/${id}`) }

    render() {
        const { classes, tickets } = this.props;
        const { rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, tickets.length  - page * rowsPerPage);
      
    return (
        <div>
            <Table
              page={page}
              rowsPerPage={rowsPerPage}
              emptyRows={emptyRows}
              tableHeaderColor="primary"
              tableHead={["Title", "Project", "Type", "Status", "Priority", "Milestone", "Due Date", "Details"]}
              tableData={[ tickets ? tickets.map(ticket => {
                return [
                  `${ticket.title}`,
                  `${ticket.project.name}`, 
                  `${ticket.type.type}`, 
                  `${ticket.status.status}`,
                  `${ticket.priority}`, 
                  `${ticket.milestone.title}`,
                  `${moment(ticket.due_date).format('YYYY-MM-DD')}`,
                  <Tooltip
                      id="tooltip-top"
                      title="Go To Ticket"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                      onClick={this.goToTicket.bind(this, ticket.id)} >
                    <IconButton aria-label="Edit" className={classes.tableActionButton}>
                      <ExitToApp style={{ color:'#ab47bc' }} className={ classes.tableActionButtonIcon + " " + classes.edit }/>
                    </IconButton>
                  </Tooltip>,
                  ]
                }) : null ]}
              />
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={tickets.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
        </div>
    )
  }
}

export default withRouter(TicketsTable)
 