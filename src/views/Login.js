import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import {logout, getUser, getEmailFromInvitation, acceptInvitation } from "../redux/actions/auth/Actions"
// Theme components
import Hidden from "@material-ui/core/Hidden";
import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
// Material UI components
import withStyles from "@material-ui/core/styles/withStyles";
// Styles
import { whiteColor, grayColor } from "../assets/jss/material-dashboard-react.jsx";
// External
import Cookies from "universal-cookie";

import { MobileMenu, SectionOne, SectionTwo, SectionThree, Header, FormDisplay, InvitationFormDisplay, Footer, MobileFormDisplay } from '../components/login'

const styles = {
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
      invitation: ''
    };
  }

  componentDidMount = () => {
    const cookies = new Cookies();
    const token = cookies.get("token")

    // If Logout remove all cookies
    if (this.props.match.url === "/home/logout") {
      this.props.logout(token).then(() => {
        cookies.remove("token", { path: "/" });
        cookies.remove("user", { path: "/" });
        cookies.remove("invitation", { path: "/" });
        this.props.history.push("/");
      });
    }

    // If redirected from invitation
    if(this.props.match.params.id) {

      cookies.set("invitation", this.props.match.params.id, { path: "/", maxAge: 86399})

      const user = cookies.get("user")
      const invitation = cookies.get("invitation")
      const token = cookies.get("token")

      this.setState({ user, invitation })

      // If user allready is logged in. Check if same email address as invitation
      if (user) {
        this.props.getUser(user, token)
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
    const { mobileOpen, display, invitedUserEmail, existingUser, invitation } = this.state;

    return (
      <GridContainer>
        <GridItem  xs={12} sm={12} md={12} style={{ backgroundColor: "#00acc1", minHeight: "80vh", height: 'auto', padding: "0px", margin: "0px" }} >
          <GridContainer style={{ padding: '0px'}}>
            {/*  Desktop Menu  */}
            <Hidden smDown implementation="css">
              <Header loginForm={this.loginForm.bind(this)} registerForm={this.registerForm.bind(this)} />
              {display ? 
                <FormDisplay 
                  classes={classes} 
                  register={this.state.register} 
                  handleClickOpen={this.handleClickOpen.bind(this)}/> 
              : null }
            </Hidden>
            {/*  Mobile Menu */}
            <Hidden mdUp implementation="css">
              <MobileMenu handleDrawerToggle={this.handleDrawerToggle} {...rest} />
              {mobileOpen ? ( <MobileFormDisplay /> ) : null}
            </Hidden>
            <SectionOne registerForm={this.registerForm.bind(this)}/>
            <InvitationFormDisplay 
              classes={classes} 
              invitedUserEmail={invitedUserEmail} 
              existingUser={existingUser}
              display={display}
              invitation={invitation}
              />
          </GridContainer>
        </GridItem>
        <SectionTwo />
        <SectionThree />     
        <Footer />       
      </GridContainer>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return { 
    logout: () => dispatch(logout()),
    getUser: (id, token) => dispatch(getUser(id, token)),
    getEmailFromInvitation: token => dispatch(getEmailFromInvitation(token)),
    acceptInvitation: token => dispatch(acceptInvitation(token)) 
  };
};

export default withRouter(connect( null,  mapDispatchToProps)(withStyles(styles)(Login)));
