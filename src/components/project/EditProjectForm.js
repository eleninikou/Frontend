import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { editProject } from "../../redux/actions/projects/Actions";
// Theme components
import Button from "../theme/CustomButtons/Button.jsx";
import GridItem from "../theme/Grid/GridItem.jsx";
import CardBody from "../theme/Card/CardBody.jsx";
import CardFooter from "../theme/Card/CardFooter.jsx";
import GridContainer from "../theme/Grid/GridContainer.jsx";
// Material UI components
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Cookies from "universal-cookie";


class EditProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.project.name,
      description: this.props.project.description,
      id: this.props.project.id,
      client_id: this.props.project.client_id,
      active: this.props.project.active,
      label: this.props.project.active ? "Active" : "Inactive",
      token: ''
    };
  }

  submit = event => {
    event.preventDefault();
    const project = {
      id: this.state.id,
      client_id: this.state.client_id,
      name: this.state.name,
      description: this.state.description,
      active: this.state.active
    };

    this.props.editProject(project, this.state.token).then(res => {
      this.setSuccess(res.message);
      this.closeEdit();
    });
  };

  componentWillMount = () => {
    const cookies = new Cookies();
    var token = cookies.get("token");
    this.setState({ token})
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleToggleChange = name => event => {
    const { name } = event.target;

    if (event.target.checked === true) {
      this.setState({
        [name]: event.target.checked,
        label: "Active"
      });
    } else {
      this.setState({
        [name]: event.target.checked,
        label: "Inactive"
      });
    }
  };

  closeEdit = () => {
    this.props.getEdit(false);
  };

  setSuccess = successMessage => {
    this.props.getSuccess(successMessage);
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.form} onSubmit={this.submit}>
        <CardBody>
          <GridContainer>
            <GridItem>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch
                      name="active"
                      disableRipple
                      checked={this.state.active}
                      onChange={this.handleToggleChange("active")}
                      value="active"
                    />
                  }
                  label={this.state.label}
                />
              </FormGroup>
            </GridItem>
            <GridItem xs={12} sm={12} md={8}>
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
                    multiline
                    className="my-input"
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </CardBody>
        <CardFooter>
          <Button color="success" onClick={this.closeEdit}>
            Close
          </Button>
          <Button color="success" type="submit">
            Save
          </Button>
        </CardFooter>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { editProject: (project, token) => dispatch(editProject(project, token)) };
};
const mapStateToProps = state => ({ successMessage: state.ticket.successMessage});

export default withRouter( connect( mapStateToProps, mapDispatchToProps )(EditProjectForm));
