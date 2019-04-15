import React, { Component } from 'react'
import { withRouter } from "react-router-dom"

// Redux
import { connect } from 'react-redux'
import { removeFromTeam, getTeam } from '../../redux/actions/projects/Actions'

// Theme components
import Table from "../theme/Table/Table.jsx"
import Button from "../theme/CustomButtons/Button.jsx"
import CardFooter from "../theme/Card/CardFooter.jsx"
import Snackbar from "../theme/Snackbar/Snackbar.jsx"

// Material UI components
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"

// Icons
import Close from "@material-ui/icons/Close"
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline"


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

    invitePeople = () => { 
      this.props.history.push( {
        pathname: `/home/project-invite/${this.props.match.params.id}`,
        state: { project_id: this.props.project.id }
      })
     }

     removeUserFromTeam(id) {
      this.props.removeFromTeam(id)
      .then((res) => {
        this.showNotification('tr')
        this.props.getTeam(this.state.id)
      })
    }

    showNotification = place => {
      var x = [];
      x[place] = true;
      this.setState(x);
      this.alertTimeout = setTimeout(
        function() {
          x[place] = false;
          this.setState(x);
        }.bind(this), 4000);
      }

    render() {
        const { classes, team, creator, successMessage } = this.props;
        const { rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, team.length  - page * rowsPerPage);
      
      return (
        <div>
            <Snackbar
              place="tr"
              color="success"
              icon={CheckCircleOutline}
              message={successMessage}
              open={this.state.tr}
              closeNotification={() => this.setState({ tr: false })}
              close
            /> 
            <Table
              page={page}
              rowsPerPage={team ? team.length : null}
              emptyRows={emptyRows}
              tableHeaderColor="success"
              tableHead={ creator ? ["Name", "Role", "Remove"] : ["Name", "Role", '' ] }
              tableData={[
                team ? team.map(person => {
                  return ([
                      `${person.user.name}`, 
                      `${person.role ? person.role.role : null }`,
                          person.role ? ( person.role.id !== 1 && creator ) ?
                            <Tooltip
                              id="tooltip-top-start"
                              title="Remove"
                              placement="top"
                              onClick={this.removeUserFromTeam.bind(this, person.id)} 
                              classes={{ tooltip: classes.tooltip }}>
                              <IconButton
                                aria-label="Close"
                                className={classes.tableActionButton}>
                                <Close className={ classes.tableActionButtonIcon + " " + classes.close}/>
                              </IconButton>
                            </Tooltip>
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

const mapDispatchToProps = dispatch => { return {  
  removeFromTeam: id => dispatch(removeFromTeam(id)),
  getTeam: id => dispatch(getTeam(id)),
  } 
}
const mapStateToProps = state => ({ successMessage: state.project.successMessage });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectTeam))
 