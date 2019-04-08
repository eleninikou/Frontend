import React, { Component } from 'react'
import { withRouter } from "react-router-dom"

// Redux
import { connect } from 'react-redux'
import { deleteMilestone } from '../../redux/actions/milestones/Actions'

// Theme components
import Table from "../theme/Table/Table.jsx";
import Button from "../theme/CustomButtons/Button.jsx";
import CardFooter from "../theme/Card/CardFooter.jsx";

// Material UI components
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

// Icons
import Close from "@material-ui/icons/Close";


class ProjectTeam extends Component {
    constructor(props) {
      super(props);
  
      this.state = { 
          id: this.props.project.id,
          name: this.props.project.name,
          page: 0,
          rowsPerPage: 5,
          ticketRowsPerPage: 5,
      }
      this.invitePeople = this.invitePeople.bind(this);

  }

    handleChangePage = (event, page) => { this.setState({ page }) } 

    handleChangeRowsPerPage = event => { this.setState({ rowsPerPage: event.target.value }) }  

    editMilestone = id => { this.props.history.push(`/home/milestone/${id}`) }

    invitePeople = () => { this.props.history.push(`/home/project-invite/${this.props.match.params.id}`) }


    render() {
        const { classes, team, creator } = this.props;
        const { rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, team.length  - page * rowsPerPage);
      
      return (
        <div>
        <Table
          page={page}
          rowsPerPage={rowsPerPage}
          emptyRows={emptyRows}
          tableHeaderColor="success"

          tableHead={ creator ? ["Name", "Role", "Remove"] : ["Name", "Role", '' ] }
          tableData={[
            team ? team.map(person => {
              return ([
                  `${person.user.name}`, 
                  `${person.role ? person.role.role : null }`,
                      person.role ? person.role.id !== 1 ?
                        creator ?
                        <Tooltip
                          id="tooltip-top-start"
                          title="Remove"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}>
                          <IconButton
                            aria-label="Close"
                            className={classes.tableActionButton}>
                            <Close className={ classes.tableActionButtonIcon + " " + classes.close}/>
                          </IconButton>
                        </Tooltip>
                        : null
                      : null : null
                  ]) 
                }) : null
              ]} 
         />
        <CardFooter>
            {creator ?
              <Button 
                color="success" 
                onClick={this.invitePeople}>
                  Invite people
              </Button>
            : null}
          </CardFooter>
        </div>
      )
  }
}

const mapDispatchToProps = dispatch => { return {  deleteMilestone: id => dispatch(deleteMilestone(id)) } }
const mapStateToProps = state => ({ successMessage: state.milestone.successMessage });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectTeam))
 