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


class MilestonesTable extends Component {
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
    goToMilestone = id => { this.props.history.push(`/home/milestone/${id}`)}

    render() {
        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.props.milestones.length  - this.state.page * this.state.rowsPerPage);
        const { milestones } = this.props;

        return (
          <div>
            <Table
                page={this.state.page}
                rowsPerPage={this.state.rowsPerPage}
                emptyRows={emptyRows}
                tableHeaderColor="warning"
                tableHead={["Name", "Focus", "Project", "Tickets", "Last updated", "Details" ]}
                tableData={[
                    milestones ? milestones.map(milestone => {
                      return [
                        `${milestone.title}`, 
                        `${milestone.focus}`,
                        `${milestone.project ? milestone.project.name : null}`, 
                        `${milestone.tickets ? milestone.tickets.length : null}`,
                        `${moment(milestone.updated_at).format('YYYY-MM-DD')}`,
                          <Tooltip
                            id="tooltip-top"
                            title="Go to Milestone"
                            placement="top"
                            classes={{ tooltip: this.props.classes.tooltip }}
                            onClick={this.goToMilestone.bind(this, milestone.id)} >
                            <IconButton aria-label="Go to" className={this.props.classes.tableActionButton}>
                              <ExitToApp className={ this.props.classes.tableActionButtonIcon + " " + this.props.classes.edit } style={{color:'#ffa726'}} />
                            </IconButton>
                          </Tooltip>,
                        ]
                      })
                    : null  
                ]} /> 
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={this.props.milestones ? this.props.milestones.length : 0}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
        </div>
    )
  }
}

export default withRouter(MilestonesTable)
 