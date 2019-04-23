import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import Cookies from 'universal-cookie'
import PropTypes from 'prop-types'

// Components
import LoginForm from '../components/forms/login/LoginForm'
import RegisterForm from '../components/forms/register/RegisterForm'

// Theme components
import Card from "../components/theme/Card/Card"
import CardBody from '../components/theme/Card/CardBody'
import GridItem from "../components/theme/Grid/GridItem.jsx"
import CardFooter from "../components/theme/Card/CardFooter.jsx"
import CardHeader from "../components/theme/Card/CardHeader.jsx"
import GridContainer from "../components/theme/Grid/GridContainer.jsx"

// Material UI components
import Button from '@material-ui/core/Button'
import withStyles from "@material-ui/core/styles/withStyles"

import { whiteColor, grayColor } from "../assets/jss/material-dashboard-react.jsx"

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
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1"
    }
  },

};

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      register: false,
      errorMessage: '',
      title: 'Log in',
      btnText: 'Sign up',
      infoText: 'Don\'t have an account yet?'
    }

}

    componentWillMount = () => {
      const cookies = new Cookies()
        if(this.props.match.url === '/home/logout') {
          cookies.remove('token', { path: '/' })
          cookies.remove('user', { path: '/' })
          cookies.remove('invitation', { path: '/' })
          this.props.history.push('/')
        }
    }

    register = () => {
      if (this.state.register) {
        this.setState({ 
          register: false,
          title: 'Log in',
          btnText: 'Sign up',
          infoText: 'Don\'t have an account yet?'
        })
      } else {
        this.setState({ 
          register: true,
          title: 'Register',
          btnText: 'Sign in',
          infoText: 'Already hacve an account?'
        })
      }
    }

  render() {

    return (
        <GridContainer > 
          <GridItem xs={12} sm={12} md={6} style={{ margin: 'auto', marginTop: '50vh', transform: 'translateY(-50%)'}}>
          <Card>
            <CardHeader color="success">
              <h4 className={this.props.classes.cardTitleWhite}>{this.state.title}</h4>
            </CardHeader>
            <CardBody>
              {this.state.register ?
              <RegisterForm />
              : <LoginForm/> }
            </CardBody>
            <CardFooter>
              <div style={{ margin: 'auto'}}>
                {this.state.infoText} 
                <Button onClick={this.register}>{this.state.btnText}</Button>
              </div>
            </CardFooter>  
          </Card>
          </GridItem>
        </GridContainer>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withRouter(withStyles(styles)(Login))
  

