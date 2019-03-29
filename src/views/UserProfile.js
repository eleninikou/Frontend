import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import Cookies from 'universal-cookie'

// Redux
import { connect } from 'react-redux'
import { getUser } from '../redux/actions/auth/Actions'


// Theme components
import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import Button from "../components/theme/CustomButtons/Button.jsx";
import Card from "../components/theme/Card/Card.jsx";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import CardFooter from "../components/theme/Card/CardFooter.jsx";
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx";


// Material UI components
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField'


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      repeat_password: '',
    }
  }

  componentWillMount = () => {
    const cookies = new Cookies()
    const user = cookies.get('user')
    this.props.getUser(user).then(res => {
      this.setState({
        name: res.user.name,
        email: res.user.email,
      })
    })
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  submit = event => {
    event.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.password,
    };

    this.props.updateUser(user)
    .then(this.showNotification('tr'))
  }

  render() {
    const { classes, successMessage } = this.props;

  return (
    <form className={classes.form} onSubmit={this.submit}>
      <Snackbar
        place="tr"
        color="success"
        message={successMessage}
        open={this.state.tr}
        closeNotification={() => this.setState({ tr: false })}
        close
      /> 
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label="name"
                    id="name"
                    className="my-input"
                    value={this.state.name}
                    onChange={this.handleChange}
                    fullWidth
                    
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label="email"
                    id="email-address"
                    value={this.state.email}
                    onChange={this.handleChange}
                    className="my-input"
                    fullWidth
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label="password"
                    id="password"
                    type="password"
                    className="my-input"
                    fullWidth
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label="repeat password"
                    id="password"
                    type="password"
                    className="my-input"
                    fullWidth
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button type="submit" color="danger">Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </form>
  );
  }
}

const mapDispatchToProps = dispatch => { 
  return { 
    getUser: (id) => dispatch(getUser(id)),
   }
}

const mapStateToProps = state => ({ 
  user: state.auth.user,
  successMessage: state.auth.successMessage
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserProfile)));
