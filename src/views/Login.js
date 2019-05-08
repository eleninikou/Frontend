import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  logout,
  getUser,
  getEmailFromInvitation,
  acceptInvitation
} from "../redux/actions/auth/Actions"
// Components
import LoginForm from "../components/forms/login/LoginForm";
import RegisterForm from "../components/forms/register/RegisterForm";
// Theme components
import Hidden from "@material-ui/core/Hidden";
import Card from "../components/theme/Card/Card";
import Button from "../components/theme/CustomButtons/Button.jsx";
import GridItem from "../components/theme/Grid/GridItem.jsx";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
// Material UI components
import Avatar from "@material-ui/core/Avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomTabs from "../components/theme/CustomTabs/CustomTabs.jsx";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";

// Styles
import {
  whiteColor,
  grayColor
} from "../assets/jss/material-dashboard-react.jsx";
// External
import Cookies from "universal-cookie";
import PropTypes from "prop-types";
import AppInfo from "../components/login/AppInfo";
import { Typography } from "@material-ui/core";
import collab from "../assets/img/enivorment.png";
import together from "../assets/img/NS2R7RJK.png";
import sitting from "../assets/img/girlexplaining.png";
import standing from "../assets/img/ZvTjn__9.png";
import MobileMenu from "../components/login/MobileMenu";

const styles = {
  center: {
    width: "100vw",
    transform: "translateY(50%) translateX(15%)",
    margin: "auto"
  },
  cardTitleWhite: {
    color: whiteColor,
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    textAlign: "center",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    margin: "auto",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      register: false,
      login: false,
      errorMessage: "",
      title: "Log in",
      btnText: "Sign Up",
      infoText: "Don't have an account yet?",
      mobileOpen: false,
      display: false,
      user: '',
      loggedInUserEmail: null,
      invitedUserEmail: "",
      existingUser: "",
    };
  }

  componentDidMount = () => {
    const cookies = new Cookies();
    if (this.props.match.url === "/home/logout") {
      cookies.remove("token", { path: "/" });
      cookies.remove("user", { path: "/" });
      cookies.remove("invitation", { path: "/" });
      this.props.logout().then(res => {
        this.props.history.push("/");
      });
    }

    var user = cookies.get("user")
    this.setState({ user })

    cookies.set("invitation", this.props.match.params.id, {
      path: "/",
      maxAge: 86399
    })

    var invitation = cookies.get("invitation")

    // If user is logged in. Check if same email address as invitation
    if (user) {
      this.props
        .getUser(user)
        .then(res => {
          if (res.user) {
            this.setState({ loggedInUserEmail: res.user.email })
          }
        })
        .then(() => {
          this.props.getEmailFromInvitation(invitation)
            .then(res => {
              if (res.email) {
                this.setState({
                  invitedUserEmail: res.email[0],
                  existingUser: res.existing
                })
              }
            })
            .then(() => { this.redirect(invitation, false)})
        })

      // If no user is logged in. Set email from invitation in form.
    } else {
      this.props.getEmailFromInvitation(invitation).then(res => {
        if (res.email) {
          this.setState({
            invitedUserEmail: res.email[0],
            existingUser: res.existing
          })
        }
      })
    }  
  };
  

  redirect(invitation, register) {
    const cookies = new Cookies()

    if (this.state.loggedInUserEmail === this.state.invitedUserEmail) {
      this.props.acceptInvitation(invitation).then(res => {
        this.props.history.push({
          pathname: `/home/projects`,
          state: { successMessage: res.message }
        })
        cookies.remove("invitation", { path: "/" })
      })
    } else if (register) {
      this.props.acceptInvitation(invitation).then(res => {
        this.props.history.push({
          pathname: `/home/projects`,
          state: { successMessage: res.message }
        })
        cookies.remove("invitation", { path: "/" })
      })
    } else {
      this.props.getEmailFromInvitation(invitation).then(res => {
        if (res.email) {
          this.setState({
            invitedUserEmail: res.email[0],
            existingUser: res.existing
          })
        }
      })
    }
  
  }

  register = () => {
    if (this.state.register) {
      this.setState({
        register: false,
        title: "Log in",
        btnText: "Sign Up",
        infoText: "Don't have an account yet?"
      });
    } else {
      this.setState({
        register: true,
        title: "Register",
        btnText: "Log in",
        infoText: "Already have an account?"
      });
    }
  };

  loginForm = () => {
    this.setState({
      display: true,
      register: false,
      title: "Log in",
      btnText: "Sign Up",
      infoText: "Don't have an account yet?"
    });
  };

  registerForm = () => {
    this.setState({
      display: true,
      register: true,
      title: "Register",
      btnText: "Log in",
      infoText: "Already have an account?"
    });
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleClickOpen = () => {
    this.setState({ display: false})
  }

  render() {
    const { classes, ...rest } = this.props;
    const { mobileOpen, display, invitedUserEmail, existingUser } = this.state;

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}
          style={{
            backgroundColor: "rgb(119, 186,193)",
            height: "90vh",
            padding: "0px",
            margin: "0px"
          }}
        >
          <GridContainer>
            <Hidden smDown implementation="css">
              <GridItem xs={12} sm={12} md={12}
                style={{
                  display: "flex",
                  position: "fixed",
                  width: "100%",
                  height: "82px",
                  zIndex: 10,
                }}
              >
              <GridContainer style={{ width: '100%'}}>
                <GridItem xs={3} sm={3} md={3} style={{ width: "auto", display: "flex", alignItems: "center" }}>
                  <Avatar style={{ backgroundColor: "white" }} />
                  <h1 style={{ marginLeft: "10px", color: "white", fontFamily: 'Roboto', fontSize: '40px' }}>  [ N A M E ] </h1>
                </GridItem>
                <GridItem xs={9} sm={9} md={9} style={{ width: "auto", display: "flex", alignItems: "center", justifyContent: 'flex-end' }}>
                      <Button
                        onClick={this.loginForm}
                        style={{
                          backgroundColor: "transparent",
                          border: "1px solid black",
                          boxShadow: "none",
                          color: "black",
                          marginRight: '20px',
                          textTransform: 'unset', fontSize: '15px'
                        }}
                      >
                        Log In
                      </Button>
                      <Button onClick={this.registerForm} color="success" style={{ color: "black", border: "1px solid rgb(102, 187, 106)", textTransform: 'unset', fontSize: '15px' }}> Sign Up </Button>
                </GridItem>
              </GridContainer>
              </GridItem>
              {display ?
              <GridItem xs={10} sm={3} md={3}
                style={{
                  position: "fixed",
                  right: "0px",
                  top: "70px",
                  zIndex: 10
                }}
              >
                <Card>
                  <div style={{ width: 'auto', display: 'flex', alignSelf: 'flex-end'}}>
                    <Tooltip
                      id="tooltip-top-start"
                      title="Close"
                      placement="top"
                      onClick={this.handleClickOpen}
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton aria-label="Close" className={classes.tableActionButton} >
                        <Close
                          style={{ color: 'black' }}
                          className={
                            classes.tableActionButtonIcon +
                            classes.close
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                  {this.state.register ? <RegisterForm /> : <LoginForm />}
                </Card>
              </GridItem>
              : null }
            </Hidden>

            <Hidden mdUp implementation="css">
            <MobileMenu handleDrawerToggle={this.handleDrawerToggle} {...rest} />
              {mobileOpen ? (
                <div
                  style={{
                    backgroundColor: "#F4CCCC",
                    zIndex: 5,
                    height: "100vh"
                  }}
                >
                  <GridItem xs={12} sm={10} md={10}
                    style={{
                      position: "fixed",
                      right: "0px",
                      top: "70px",
                      zIndex: 10,
                      minWidth: "100vw",
                      width: 'auto'
                    }}
                  >
                    <Card style={{ padding: '0px'}}>
                      <CustomTabs
                        headerColor="success"
                        tabs={[
                          {
                            tabName: "LOG IN",
                            tabIcon: "",
                            tabContent: <LoginForm />
                          },
                          {
                            tabName: "SIGN UP",
                            tabIcon: "",
                            tabContent: <RegisterForm />
                          }
                        ]}
                      />
                    </Card>
                  </GridItem>
                </div>
              ) : null}
            </Hidden>

            <GridItem xs={12} sm={10} md={10}
              style={{
                margin: "auto",
                justifyContent: "center",
                marginTop: "150px"
              }}
            >
              <GridContainer>
                <GridItem xs={12} sm={10} md={5} style={{ margin: "auto" }}>
                  <Typography style={{ fontSize: "1.5em", fontWeight: "600" }}>
                    [ N A M E ] is a collaboration platform built for every member of
                    your team to simplify your workflow!
                  </Typography>
                  <Typography style={{ fontSize: "18px" }}>
                    Invite clients and developers to join your projects, create
                    tickets and keep track of your development, plan features
                    and much more!
                  </Typography>
                  <Button
                    color="success"
                    style={{ width: "200px", color: "black" , textTransform: 'unset', fontSize: '15px'}}
                    onClick={this.registerForm}
                  >
                    Sign Up - it's free!
                  </Button>
                </GridItem>
                <GridItem xs={10} sm={10} md={7} style={{ margin: "auto" }}>
                  <img src={collab} alt="collab" width="90%" height="auto" />
                </GridItem>
                {invitedUserEmail ? (
                  <GridItem xs={10} sm={10} md={12} style={{ position: 'fixed', right: '0', top: '90px', zIndex: '10'}}>
                    <Card>
                      <CardHeader color="success">
                        <h4 className={this.props.classes.cardTitleWhite}> Fill in to accept the invitation! </h4>
                      </CardHeader>
                        {existingUser ? (
                          <LoginForm email={invitedUserEmail} />
                        ) : (
                          <RegisterForm email={invitedUserEmail} redirect={this.redirect.bind(this)} />
                        )}
                    </Card>
                  </GridItem>
                    ) : (
                    <GridItem xs={10} sm={10} md={7} style={{ margin: "auto", position: 'absolute' }}>
                    
                    {/* <Card>
                        <h4 className={this.props.classes.cardTitleWhite}>OOPS!</h4>
                        <Typography> It looks like your invitation allready has been used. </Typography>
                        <Typography> Login to start working on your projects! </Typography>
                        <Button onClick={this.goToLogin} style={{ margin: "auto" }} color="success" >
                          Login
                        </Button>
                    </Card> */}
                    </GridItem>
                  )}
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={10} md={10} style={{ margin: "auto", justifyContent: "center" }} >
          <GridContainer>
            <GridItem xs={12} sm={10} md={3} style={{ margin: "auto" }}>
              <Typography style={{ fontSize: "22px", fontWeight: "600" }}>
                Built for Developers,
              </Typography>
              <Typography style={{ fontSize: "22px", fontWeight: "600" }}>
                Product Managers,
              </Typography>
              <Typography style={{ fontSize: "22px", fontWeight: "600" }}>
                and UX Designers
              </Typography>
              <div
                style={{
                  width: "30%",
                  height: "10px",
                  backgroundColor: "rgb(209, 0, 83)"
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={10} md={9} style={{ margin: "auto" }}>
              <AppInfo />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} style={{ backgroundColor: "#E4E4E4", height: "80vh" }} >
          <GridContainer>
            <GridItem xs={10} sm={10} md={10}
              style={{
                margin: "auto",
                justifyContent: "center",
                marginTop: "10px"
              }}
            >
              <GridContainer>
                <GridItem xs={12} sm={12} md={4} style={{ margin: "auto" }}>
                  <Typography style={{ fontSize: "20px", fontWeight: "600" }}>
                    Share ideas and tasks!
                  </Typography>
                  <Typography style={{ fontSize: "18px" }}>
                    Use [ NAME ] to speed up collaboration, communication, and
                    idea exchange. Comment on each other's tickets, upload
                    images and report bugs with ease.
                  </Typography>
                </GridItem>
                <GridItem xs={12} sm={12} md={7} style={{ margin: "auto", position: "relative" }} >
                  <img src={together} alt="collab" width="100%" height="auto" />
                  <img
                    src={sitting}
                    alt="collab"
                    width="55%"
                    height="auto"
                    style={{
                      position: "absolute",
                      right: "0",
                      bottom: "10%",
                      height: "60%",
                      width: "auto"
                    }}
                  />
                  <img
                    src={standing}
                    alt="collab"
                    width="55%"
                    height="auto"
                    style={{
                      position: "absolute",
                      left: "0",
                      bottom: "10%",
                      height: "60%",
                      width: "auto"
                    }}
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem
          xs={12}
          sm={12}
          md={12}
          style={{
            backgroundColor: "rgb(119, 186,193)",
            height: "18vh",
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <GridContainer style={{ width: "100%", display: "flex", alignItems: "center" }} >
            <GridItem
              xs={12}
              sm={2}
              md={2}
              style={{ justifyContent: 'center' }}
            >
              <Avatar style={{ backgroundColor: "white" }} />
            </GridItem>
            <GridItem xs={12} sm={8} md={8} style={{ textAlign: "center" }}>
              <Typography style={{ fontSize: "12px", color: "white" }}>
                Copyright 2019 NAME. All rights reserved.
              </Typography>
              <Typography style={{ fontSize: "12px", color: "white" }}>
                <a href="https://bracket.gr" style={{ textDecoration: 'none', color: 'white'}}>
                  Bracket <sup>[ ]</sup>
                </a>  
              </Typography>
            </GridItem>
            <GridItem xs={12} sm={2} md={2} style={{ display: "flex", justifyContent: 'center', marginTop: '10px' }}>
              <a href="https://www.linkedin.com/in/eleni-nikou" style={{ textDecoration: 'none'}}>
                <Avatar style={{ backgroundColor: "white", marginRight: "15px" }}>
                <i className="fab fa-linkedin-in" style={{ color: 'black'}}></i>
              </Avatar>
              </a>  
              <a href="mailto:eleni.nikou@mail.com" style={{ textDecoration: 'none'}}>
                <Avatar style={{ backgroundColor: "white" }}>
                <i className="fas fa-envelope" style={{ color: 'black'}}></i>
              </Avatar>
              </a>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string
};

const mapDispatchToProps = dispatch => {
  return { 
    logout: () => dispatch(logout()),
    getUser: id => dispatch(getUser(id)),
    getEmailFromInvitation: token => dispatch(getEmailFromInvitation(token)),
    acceptInvitation: token => dispatch(acceptInvitation(token)) 
  };
};

export default withRouter(connect( null,  mapDispatchToProps)(withStyles(styles)(Login)));
