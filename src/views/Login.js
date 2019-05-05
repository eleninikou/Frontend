import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { logout } from '../redux/actions/auth/Actions'
// Components
import LoginForm from '../components/forms/login/LoginForm'
import RegisterForm from '../components/forms/register/RegisterForm'
// Theme components
import Card from "../components/theme/Card/Card"
import Button from "../components/theme/CustomButtons/Button.jsx"
import CardBody from '../components/theme/Card/CardBody'
import GridItem from "../components/theme/Grid/GridItem.jsx"
import CardIcon from "../components/theme/Card/CardIcon.jsx"
import CardFooter from "../components/theme/Card/CardFooter.jsx"
import CardHeader from "../components/theme/Card/CardHeader.jsx"
import GridContainer from "../components/theme/Grid/GridContainer.jsx"
// Material UI components
import { Typography } from '@material-ui/core'
import withStyles from "@material-ui/core/styles/withStyles"
// Icons
import PersonAdd from "@material-ui/icons/PersonAdd"
import AccountCircle from "@material-ui/icons/AccountCircle"
// Styles
import { whiteColor, grayColor } from "../assets/jss/material-dashboard-react.jsx"
// External
import Cookies from 'universal-cookie'
import PropTypes from 'prop-types'
import AppInfo from '../components/login/AppInfo';


const styles = {
  center: {
    width: '100vw',
    transform: 'translateY(50%) translateX(15%)',
    margin: 'auto'
  },
  cardTitleWhite: {
    color: whiteColor,
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    textAlign: 'center',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    margin: 'auto',
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1"
    }
  }
}

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      register: false,
      login: false,
      errorMessage: '',
      title: 'Log in',
      btnText: 'Sign Up',
      infoText: 'Don\'t have an account yet?'
    }
}

    componentDidMount = () => {
      const cookies = new Cookies()
        if(this.props.match.url === '/home/logout') {
          cookies.remove('token', { path: '/' })
          cookies.remove('user', { path: '/' })
          cookies.remove('invitation', { path: '/' })
          this.props.logout().then(res => {
            console.log(res)
            debugger;
            this.props.history.push('/')
          })
        }
    }

    register = () => {
      if (this.state.register) {
        this.setState({ 
          register: false,
          title: 'Log in',
          btnText: 'Sign Up',
          infoText: 'Don\'t have an account yet?'
        })
      } else {
        this.setState({ 
          register: true,
          title: 'Register',
          btnText: 'Log in',
          infoText: 'Already have an account?'
        })
      }
    }

    loginForm = () => {
      this.setState({ 
        register: false,
        title: 'Log in',
        btnText: 'Sign Up',
        infoText: 'Don\'t have an account yet?'
      })
    }

    registerForm = () => {
      this.setState({ 
        register: true,
        title: 'Register',
        btnText: 'Log in',
        infoText: 'Already have an account?'
      })
    }

  render() {
    return (
        <GridContainer > 
          <GridItem xs={12} sm={12} md={12} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px'}}>
             <div style={{ width: '100%'}}>
            </div>      
            <ul className="Menu">
              <li onClick={this.loginForm}>
                <Button color="success"> Log In </Button>
              </li>
              <li onClick={this.registerForm}>
                <Button color="success"> Sign Up </Button></li>
            </ul>
          </GridItem>
          <AppInfo />
          <GridItem xs={12} sm={6} md={4}>
            <Card>
            <CardHeader color="success">
              <CardIcon >
                {this.state.register ? 
                <PersonAdd style={{ color: 'white' }} />
              : <AccountCircle style={{ color: 'white' }} />}
              </CardIcon>
            </CardHeader>
            <CardBody>
                {this.state.register ?
                <RegisterForm />
                : <LoginForm/> }
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}
const mapDispatchToProps = dispatch => { 
  return {  logout: () => dispatch(logout()) }}

export default withRouter(connect(null, mapDispatchToProps)(withStyles(styles)(Login)))