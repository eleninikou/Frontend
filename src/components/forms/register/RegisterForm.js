import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { register, googleLogin, acceptInvitation } from "../../../redux/actions/auth/Actions";
import Cookies from "universal-cookie";
import GoogleLogin from "react-google-login";
import GridItem from "../../theme/Grid/GridItem.jsx";
import CardBody from "../../theme/Card/CardBody";
import GridContainer from "../../theme/Grid/GridContainer.jsx";
// Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { FormControl, Typography } from "@material-ui/core";
import LoginTextSpinner from "../../spinner/LoginTextSpinner";
import FormHelperText from "@material-ui/core/FormHelperText"

// Style
import dashboardStyle from "../../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      errorMessage: "",
      invitation: "",
      hasError: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  responseGoogle = response => {
    if (!response.error) {
      this.props.googleLogin(response.profileObj).then(res => {
        if (res.success) {
          this.props.history.push("/home/activity");
        } else {
          this.setState({
            errorMessage: "Could not log in, show error message"
          });
        }
      });
    }
  };

  submit = event => {
    event.preventDefault();

    // Check if required fields
    if(this.state.name && (this.state.invitation ? this.props.email : this.state.email) && this.state.password && this.state.repeatPassword) {
    
      // Check if password is correct
      if (this.state.password === this.state.repeatPassword) {
      const email = "";

      if (this.props.email) {
        this.email = this.props.email;
      } else {
        this.email = this.state.email;
      }

      const creds = {
        name: this.state.name,
        email: this.email,
        password: this.state.password
      };

      this.props.register(creds)
      .then((res) => {
        if (res && res.email) {
          if (this.state.invitation) {
            this.props.redirect(this.state.invitation, true);
          } else {
            this.props.history.push("/home/activity");
          }
        } 

        if (this.props.errorMessage) {
          this.setState({
            errorMessage: this.props.errorMessage
          });

        }
      });
    }
    } else {
      this.setState({ hasError: true})
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  componentDidMount = () => {
    const cookies = new Cookies();
    var invitation = cookies.get("invitation");
    this.setState({ invitation });
  };

  render() {
    const { classes, email, isFetching, text, errorMessage } = this.props;
    const { hasError, name, password, repeatPassword } = this.state;

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer>
            <CardBody style={{ padding: '0px'}}>
              <form style={{ width: "100%", textAlign: "center" }} onSubmit={this.submit} >
                <GridItem xs={12} sm={12} md={12} style={{ margin: "auto" }}>
                  <FormControl className={classes.formControl}>
                  {hasError && !name && <FormHelperText id="name"> Please fill in your name! </FormHelperText>}
                    <TextField
                      name="name"
                      type="text"
                      label="Full name"
                      autoComplete="full name"
                      fullWidth
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12} style={{ margin: "auto" }}>
                  <FormControl className={classes.formControl}>
                  {hasError && !email && <FormHelperText id="name"> Please fill in your email! </FormHelperText>}
                    <TextField
                      disabled={email ? true : false}
                      name="email"
                      type="email"
                      autoComplete="username"
                      label="Email"
                      fullWidth
                      value={email}
                      onChange={this.handleChange}
                    />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12} style={{ margin: "auto" }}>
                  <FormControl className={classes.formControl}>
                  {hasError && !name && <FormHelperText id="name"> Choose password! </FormHelperText>}
                    <TextField
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      label="Password"
                      fullWidth
                      minLength="6"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12} style={{ margin: "auto" }}>
                  <FormControl className={classes.formControl}>
                  {hasError && !name && <FormHelperText id="name"> Repeat password! </FormHelperText>}
                    <TextField
                      name="repeatPassword"
                      type="password"
                      autoComplete="new-password"
                      label="Repeat Password"
                      fullWidth
                      minLength="6"
                      value={this.state.repeatPassword}
                      onChange={this.handleChange}
                    />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12} style={{ margin: "auto" }}>
                  <FormControl className={classes.formControl}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{
                        marginTop: "30px",
                        marginBottom: "20px",
                        backgroundColor: "#d81b60", 
                        color: "white",
                        padding: "10px",
                        textTransform: 'unset'
                      }}
                    >
                      Sign Up
                    </Button>
                  </FormControl>
                </GridItem>
              </form>
                <GridItem xs={12} sm={12} md={12}style={{ textAlign: "center"}} >
                  {!this.state.invitation ? (
                    <FormControl className={classes.formControl}>
                      <GoogleLogin
                        clientId="490433308929-go7fh6c8fd4hbq4mgcp6qbpu0hcm1c2h.apps.googleusercontent.com"
                        buttonText="USE GOOGLE ACCOUNT"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        width="100%"
                      />
                    </FormControl>
                  ) : null}
                </GridItem>
                <GridItem xs={12} sm={12} md={12}style={{ textAlign: "center", marginTop: "20px" }} >
                {isFetching ? <LoginTextSpinner text={text}/> : ''}
                </GridItem>
                <GridItem xs={12} sm={12} md={12}style={{ textAlign: "center", marginTop: "20px" }} >
                  <Typography style={{ padding: '10px'}}>
                    {this.state.errorMessage}
                  </Typography>
                </GridItem>
            </CardBody>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: creds => dispatch(register(creds)),
    googleLogin: googleAuth => dispatch(googleLogin(googleAuth)),
    acceptInvitation: token => dispatch(acceptInvitation(token))
  };
};

const mapStateToProps = state => ({
  isFetching: state.auth.isFetching,
  text: state.auth.text,
  errorMessage: state.auth.errorMessage
});

export default withRouter(connect( mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(RegisterForm)));
