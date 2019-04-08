import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import moment from 'moment';

// Redux
import { connect } from 'react-redux'
import { deleteMilestone } from '../../redux/actions/milestones/Actions'

// Theme components
import Table from "../theme/Table/Table.jsx";
import Button from "../theme/CustomButtons/Button.jsx";
import GridItem from "../theme/Grid/GridItem.jsx";
import GridContainer from "../theme/Grid/GridContainer.jsx";

// Material UI components
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import TablePagination from '@material-ui/core/TablePagination';

// Icons
import Close from "@material-ui/icons/Close";
import ExitToApp from "@material-ui/icons/ExitToApp";



class ProjectMilestones extends Component {
    constructor(props) {
      super(props);
  
      this.state = { 
          id: this.props.project.id,
          name: this.props.project.name,
          page: 0,
          rowsPerPage: 5,
          ticketRowsPerPage: 5,
      }

  }

    handleChangePage = (event, page) => { this.setState({ page }) } 

    handleChangeRowsPerPage = event => { this.setState({ rowsPerPage: event.target.value }) }  

    editMilestone = id => { this.props.history.push(`/home/milestone/${id}`) }

    deleteMilestone = id => { 
      // Delete milestone and show notification
      this.props.deleteMilestone(id)
      .then(res => {
          this.props.getSuccess(this.props.successMessage)
      })
    }

    // Redirect to create milestone
    createNewMilestone = () => { 
        this.props.history.push({
          pathname: '/home/create-milestone',
          state: { 
            project_id: this.state.id,
            project_name: this.state.name
          }
        }) 
    }

    render() {
        const { milestones, classes, creator } = this.props;
        const { rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, milestones.length  - page * rowsPerPage);
      
      return (
        <div>
        <Table
          page={page}
          rowsPerPage={rowsPerPage}
          emptyRows={emptyRows}
          tableHeaderColor="success"
          tableHead={ creator ? ["Title", "Focus", "Last updated", "Details", "Remove"] : ["Title", "Focus", "Last updated", "Details", ""] }
          tableData={[
            milestones ? milestones.map(milestone => {
              return ([
                `${milestone.title}`, 
                `${milestone.focus}`,
                `${moment(milestone.updated_at).format('YYYY-MM-DD')}`,
                  (
                    <Tooltip
                      id="tooltip-top"
                      title="Edit Milestone"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                      onClick={this.editMilestone.bind(this, milestone.id)}>
                      <IconButton
                        aria-label="Edit"
                        className={classes.tableActionButton}>
                        <ExitToApp style={{color:'#66bb6a'}} className={ classes.tableActionButtonIcon + " " + classes.edit}/>
                      </IconButton>
                    </Tooltip>
                  ), 
                  creator ? 
                  (
                    <Tooltip
                      id="tooltip-top-start"
                      title="Delete milestone"
                      placement="top"
                      onClick={this.deleteMilestone.bind(this, milestone.id)}
                      classes={{ tooltip: classes.tooltip }}>
                      <IconButton
                        aria-label="Close"
                        className={classes.tableActionButton}>
                        <Close style={{color:'#f44336'}} className={ classes.tableActionButtonIcon + " " + classes.close}/>
                      </IconButton>
                    </Tooltip>
                  ) 
                  : null
                ])
            }) : null
          ]} />   
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={milestones ? milestones.length : null}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{ 'aria-label': 'Previous Page' }}
            nextIconButtonProps={{ 'aria-label': 'Next Page' }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage} /> 
          <GridContainer>
            { creator ?
            <GridItem xs={12} sm={2} md={2}>
              <Button color="success"  onClick={this.createNewMilestone.bind(this)}>Create new Milestone</Button>
            </GridItem>
            : null }
          </GridContainer>
      </div>  
      )
  }
}

const mapDispatchToProps = dispatch => { return {  deleteMilestone: id => dispatch(deleteMilestone(id)) } }
const mapStateToProps = state => ({ successMessage: state.milestone.successMessage });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectMilestones))
 