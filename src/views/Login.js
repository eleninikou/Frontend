import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import { connect } from "react-redux";
import { logout } from "../redux/actions/auth/Actions";
// Components
import LoginForm from "../components/forms/login/LoginForm";
import RegisterForm from "../components/forms/register/RegisterForm";
// Theme components
import Hidden from "@material-ui/core/Hidden";
import Card from "../components/theme/Card/Card";
import Drawer from "@material-ui/core/Drawer";
import Button from "../components/theme/CustomButtons/Button.jsx";
import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";

// Material UI components
import Avatar from "@material-ui/core/Avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomTabs from "../components/theme/CustomTabs/CustomTabs.jsx"
// Styles
import {
  whiteColor,
  grayColor
} from "../assets/jss/material-dashboard-react.jsx";
// External
import Cookies from "universal-cookie";
import PropTypes from "prop-types";
import AppInfo from "../components/login/AppInfo";
import { Typography } from '@material-ui/core'
import collab from '../assets/img/enivorment.png'
import together from '../assets/img/NS2R7RJK.png'
import sitting from '../assets/img/girlexplaining.png'
import standing from '../assets/img/ZvTjn__9.png'
import MobileMenu from "../components/login/MobileMenu";
import AccountCircle from "@material-ui/icons/AccountCircle";


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
  };

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
      register: false,
      title: "Log in",
      btnText: "Sign Up",
      infoText: "Don't have an account yet?"
    });
  };

  registerForm = () => {
    this.setState({
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

  render() {
    const { classes, ...rest } = this.props;
    const { mobileOpen } = this.state;

    return (
      <GridContainer >
          <MobileMenu
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
        <GridItem xs={12} sm={12} md={12}  style={{ backgroundColor: 'rgb(119, 186,193)', height: '90vh', padding: '0px', margin: '0px' }}>
          <GridContainer >
          <Hidden smDown implementation="css">
            <GridItem xs={12} sm={12} md={12} style={{
                display: "flex",
                position: 'fixed',
                width: '100%',
                height: '82px',
                zIndex: 10,
                justifyContent: "space-between",
                alignItems: 'baseline'
              }} >

            <div style={{ width: 'auto', display: 'flex', alignItems: 'center'}}>
              <Avatar style={{ backgroundColor: 'white'}}>
              </Avatar>
              <h1 style={{ marginLeft: '10px', color: 'white'}} > [NAME] </h1>
            </div>
              <div style={{ width: "auto" }} />
              <ul className="Menu" style={{ padding: '0px', margin: '0px'}}>
                <li onClick={this.loginForm}>
                  <Button style={{ backgroundColor: 'transparent', border: '1px solid black', boxShadow: 'none', color: 'black'}}> Log In </Button>
                </li>
                <li onClick={this.registerForm}>
                  <Button color="success" style={{ color: 'black'}}> Sign Up </Button>
                </li>
              </ul>
            </GridItem>
            <GridItem xs={10} sm={3} md={3} style={{ position: 'fixed', right: '0px', top: '70px', zIndex: 10}}>
              <Card>
                  {this.state.register ? <RegisterForm /> : <LoginForm />}
              </Card> 
            </GridItem>
          </Hidden>  

          <Hidden mdUp implementation="css">
              {mobileOpen ? 
                <div style={{ backgroundColor: '#F4CCCC', zIndex: 5, height: '100vh'}}>
                  <GridItem xs={12} sm={10} md={10} style={{ position: 'fixed', right: '0px', top: '70px', zIndex: 10, width: '100vw'}}>
                    <Card>
                    <CustomTabs
                    headerColor="success"
                    tabs={[
                      {
                        tabName: 'LOG IN',
                        tabIcon: '',
                        tabContent: (<LoginForm/>)
                      },
                      {
                        tabName: 'SIGN UP',
                        tabIcon: '',
                        tabContent: (<RegisterForm />)
                      }
                    ]} />
                    </Card> 
                  </GridItem>
                </div>
                : null }
          </Hidden>    

          {/* </Hidden>   */}
            <GridItem xs={10} sm={10} md={10} style={{ margin: 'auto', justifyContent: 'center', marginTop: '150px'}}>
              <GridContainer>
                <GridItem xs={10} sm={10} md={5} style={{ margin: 'auto'}}>
                  <Typography style={{ fontSize: '28px', fontWeight: '600'}}> [Name] is a Collaboration platform built for every member of your team to simplify your workflow!</Typography>
                  <Typography style={{ fontSize: '18px'}}> Invite Clients and developers to join your projects, create tickets and keep track of your development, plan features and much more! </Typography>
                  <Button color="success" style={{ width: '200px', color: 'black'}} onClick={this.registerForm}> Sign Up - it's free!</Button>
                </GridItem>
                <GridItem xs={10} sm={10} md={7} style={{ margin: 'auto'}}>
                  <img src={collab} alt="collab" width="90%" height="auto" />
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={10} md={10} style={{ margin: 'auto', justifyContent: 'center'}}>
         <GridContainer>
          <GridItem xs={10} sm={10} md={3} style={{ margin: 'auto'}}>
            <Typography style={{ fontSize: '22px', fontWeight: '600'}}>Built for Developers,</Typography>
            <Typography style={{ fontSize: '22px', fontWeight: '600'}}>Product Managers,</Typography>
            <Typography style={{ fontSize: '22px', fontWeight: '600'}}>and UX Designers,</Typography>
            <div style={{ width: '30%', height: '10px', backgroundColor: 'rgb(209, 0, 83)'}}></div>
          </GridItem>
          <GridItem xs={10} sm={10} md={9} style={{ margin: 'auto'}}>
            <AppInfo />
          </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}  style={{ backgroundColor: '#E4E4E4', height: '80vh' }}>
          <GridContainer>
            <GridItem xs={10} sm={10} md={10} style={{ margin: 'auto', justifyContent: 'center', marginTop: '10px'}}>
              <GridContainer >
                <GridItem xs={12} sm={12} md={4} style={{ margin: 'auto'}}>
                  <Typography style={{ fontSize: '20px', fontWeight: '600'}}> Share ideas and tasks!</Typography>
                  <Typography style={{ fontSize: '18px', }}> Use [ NAME ] to speed up collaboration, communication, and idea exchange. Comment on each other's tickets, upload images and report bugs with ease.</Typography>
                </GridItem>
                <GridItem xs={12} sm={12} md={7} style={{ margin: 'auto', position: 'relative'}}>
                    <img src={together} alt="collab" width="100%" height="auto"  />
                      <img src={sitting} alt="collab" width="55%" height="auto" style={{ position: 'absolute', right: '0', bottom: '10%', height: '60%', width: 'auto' }} />
                      <img src={standing} alt="collab" width="55%" height="auto" style={{ position: 'absolute', left: '0', bottom: '10%', height: '60%', width: 'auto' }} />
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>     
        <GridItem xs={12} sm={12} md={12}  style={{ backgroundColor: 'rgb(119, 186,193)', height: '10vh', display: 'flex', width: '100%', justifyContent: 'space-around', alignItems: 'center'}}>
         <GridContainer style={{ width: '100%', display: 'flex', alignItems: 'center'}}>
         <GridItem xs={12} sm={2} md={2} style={{ textAlign: '-webkit-right'}}>
         <Avatar style={{ backgroundColor: 'white'}}></Avatar>
         </GridItem>     
         <GridItem xs={12} sm={8} md={8} style={{ textAlign: 'center'}}>
          <Typography style={{ fontSize: '12px', color: 'white' }}> Copyright 2019 NAME. All rights reserved.</Typography>
          <Typography style={{ fontSize: '12px', color: 'white' }}> Bracket <sup>[ ]</sup></Typography>

         </GridItem> 
         <GridItem xs={12} sm={2} md={2} style={{ display: 'flex'}}>
          <Avatar style={{ backgroundColor: 'white', marginRight:'15px'}}></Avatar>
          <Avatar style={{ backgroundColor: 'white'}}></Avatar>
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
  return { logout: () => dispatch(logout()) };
};


export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(withStyles(styles)(Login))
);
