import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import moment from 'moment'
// Theme components
import Table from "../theme/Table/Table.jsx"
import TablePagination from '@material-ui/core/TablePagination'
// Material UI components
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
// Icons
import ExitToApp from "@material-ui/icons/ExitToApp"
import FiberManualRecord from "@material-ui/icons/FiberManualRecord"


class ProjectsTable extends Component {
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

    goToProject(id) { this.props.history.push(`/home/project/${id}`) }

    render() {
        const { classes, projects } = this.props;
        const { rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, projects.length  - page * rowsPerPage);
      
    return (
        <div>
            <Table
                page={page}
                rowsPerPage={rowsPerPage}
                emptyRows={emptyRows}
                tableHeaderColor="success"
                tableHead={["Name", "Created", "Active", "Open Tickets", "Total Tickets", "Last updated", "Details" ]}
                tableData={[ 
                  projects ? projects.map(project => {
                  let active_tickets = project.tickets.filter(ticket => (ticket.status_id !== (7 && 4)))
                    return (
                      project ? [ 
                        `${project.project.name}`, 
                        `${moment(project.project.created_at).format('YYYY-MM-DD')}`, 
                          <Tooltip
                            id="tooltip-top"
                            title="Active"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}
                          >
                            {project.project ? project.project.active === 1 ?
                              <FiberManualRecord style={{color:'#4caf50', fontSize: '15px'}}/>
                            : <FiberManualRecord style={{color:'#ef5350', fontSize: '15px'}}/> 
                            : null }
                        </Tooltip>,
                        (active_tickets).length, 
                        `${(project.tickets).length}`, 
                        `${moment(project.updated_at).format('YYYY-MM-DD')}`,
                        <Tooltip
                          id="tooltip-top"
                          title="Go to Project"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                          onClick={this.goToProject.bind(this, project.project.id)} 
                        >
                          <IconButton aria-label="Go to" className={classes.tableActionButton}>
                            <ExitToApp style={{color:'#4caf50'}} className={ classes.tableActionButtonIcon + " " + classes.edit }/>
                          </IconButton>
                      </Tooltip>
                      ]: null) 
                  }): null
                ]} 
            />
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={projects.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{ 'aria-label': 'Previous Page', 'padding': '0px' }}
              nextIconButtonProps={{ 'aria-label': 'Next Page' }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage} 
            />
        </div>
    )
  }
}

export default withRouter(ProjectsTable)
 