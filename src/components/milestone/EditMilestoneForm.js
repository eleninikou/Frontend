import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import moment from 'moment';

// Redux
import { connect } from 'react-redux'
import { milestoneEdit } from '../../redux/actions/milestones/Actions'

// Theme components
import CardBody from "../theme/Card/CardBody.jsx";
import GridContainer from "../theme/Grid/GridContainer.jsx";
import GridItem from "../theme/Grid/GridItem.jsx";
import Button from "../theme/CustomButtons/Button.jsx";

// Material UI components
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel';
import CardFooter from '../theme/Card/CardFooter';


class EditMilestoneForm extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        title: this.props.milestone.title,
        focus: this.props.milestone.focus,
        project_id: this.props.milestone.project_id,
        project_name: this.props.milestone.project.name,
        selectedDate: moment(this.props.milestone.due_date).format('YYYY-MM-DD'),
        due_date: moment(this.props.milestone.due_date).format('YYYY-MM-DD'),
        creator: this.props.creator,
        id: this.props.milestone.id
      }
      this.handleChange = this.handleChange.bind(this);

  }

  submit = event => {
    event.preventDefault();
    const date = null;
    if (this.state.selectedDate === '') {
      this.date = this.state.due_date
    } else {
      this.date = this.state.selectedDate
    }
    const milestone = {
      project_id: this.state.project_id,
      title: this.state.title,
      focus: this.state.focus,
      due_date: this.date
    };

    this.props.milestoneEdit(milestone, this.props.match.params.id)
    .then(res => { 
        this.setSuccess(res.message) 
        this.closeEdit()
    })    
  }

  handleDateChange = event => {
    this.setState({ selectedDate: event.target.value });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  closeEdit = () => { this.props.getEdit(false) }

  setSuccess = successMessage => { this.props.getSuccess(successMessage) }

  render() {
      const { classes } = this.props
        return ( 
        <form className={classes.form} onSubmit={this.submit}>
          <CardBody>
            <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <GridItem xs={12} sm={12} md={12}>
                <InputLabel>Title</InputLabel>
                <TextField 
                    name="title" 
                    type="text"
                    value={this.state.title}
                    onChange={this.handleChange}
                    fullWidth
                    className="my-input"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <InputLabel>Focus</InputLabel>
                <TextField 
                    name="focus" 
                    type="text"
                    value={this.state.focus}
                    onChange={this.handleChange}
                    fullWidth
                    className="my-input"
                  />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <InputLabel>Project</InputLabel>
                <TextField 
                    disabled
                    name="project" 
                    type="text"
                    value={this.state.project_name}
                    fullWidth
                    className="my-input"
                  />
              </GridItem>
              <GridItem>
                <TextField
                    id="date"
                    label="Due date"
                    type="date"
                    defaultValue={this.state.due_date}
                    value={this.state.selectedDate}
                    onChange={this.handleDateChange}
                    className="my-input"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
              </GridItem>
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter>
            <Button color="warning" onClick={this.closeEdit}> Go Back</Button>
            <Button color="warning" type="submit">Save</Button>
          </CardFooter>
        </form> 
      )
  }
}

const mapDispatchToProps = dispatch => { return {  
    milestoneEdit: (milestone, id) => dispatch(milestoneEdit(milestone, id)),
    } 
}
const mapStateToProps = state => ({ successMessage: state.ticket.successMessage });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditMilestoneForm))
 