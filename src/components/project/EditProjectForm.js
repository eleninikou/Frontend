import React, { Component } from 'react'
import { withRouter } from "react-router-dom"

// Redux
import { connect } from 'react-redux'
import { editProject } from '../../redux/actions/projects/Actions'

// Theme components
import CardBody from "../theme/Card/CardBody.jsx";
import GridContainer from "../theme/Grid/GridContainer.jsx";
import GridItem from "../theme/Grid/GridItem.jsx";
import Button from "../theme/CustomButtons/Button.jsx";

// Material UI components
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel';


class EditProjectForm extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
          name: this.props.project.name,
          description: this.props.project.description,
          id: this.props.project.id,
          client_id: this.props.project.client_id
      }
  }

  submit = event => {
    event.preventDefault();
    const project = {
      id: this.state.id,
      client_id: this.state.client_id,
      name: this.state.name,
      description: this.state.description,
    };

    this.props.editProject(project)
    .then(res => { 
        this.setSuccess(res.message) 
        this.closeEdit()
    })    
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  closeEdit = () => { this.props.getEdit(false) }

  setSuccess = successMessage => { this.props.getSuccess(successMessage) }

  render() {
      const { classes, } = this.props
      return ( 
        <form className={classes.form} onSubmit={this.submit}>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel>Name</InputLabel>
                  <TextField 
                    name="name" 
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                    fullWidth
                    className="my-input"
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel>Description</InputLabel>
                  <TextField 
                    name="description" 
                    type="text"
                    value={this.state.description}
                    onChange={this.handleChange}
                    fullWidth
                    className="my-input"
                    />
                </GridItem>
              </GridContainer>
             </CardBody >
          <Button color="success" type="submit">Edit Project</Button>
          <Button color="success" onClick={this.closeEdit}> Go Back</Button>
      </form>  
      )
  }
}

const mapDispatchToProps = dispatch => { return {  editProject: id => dispatch(editProject(id)) } }
const mapStateToProps = state => ({ successMessage: state.ticket.successMessage });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProjectForm))
 