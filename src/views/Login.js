import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
// Components
import LoginForm from '../components/forms/login/LoginForm'
import RegisterForm from '../components/forms/register/RegisterForm'
// Theme components
import Card from "../components/theme/Card/Card"
import CardBody from '../components/theme/Card/CardBody'
import GridItem from "../components/theme/Grid/GridItem.jsx"
import CardIcon from "../components/theme/Card/CardIcon.jsx"
import CardFooter from "../components/theme/Card/CardFooter.jsx"
import CardHeader from "../components/theme/Card/CardHeader.jsx"
import CustomTabs from "../components/theme/CustomTabs/CustomTabs.jsx"
import GridContainer from "../components/theme/Grid/GridContainer.jsx"
// Material UI components
import { Typography } from '@material-ui/core'
import withStyles from "@material-ui/core/styles/withStyles"
// Icons
import Note from "@material-ui/icons/Note"
import Person from "@material-ui/icons/Person"
import Timeline from "@material-ui/icons/Timeline"
import BugReport from "@material-ui/icons/BugReport"
import PersonAdd from "@material-ui/icons/PersonAdd"
import LowPriority from "@material-ui/icons/LowPriority"
import ContactMail from "@material-ui/icons/ContactMail"
import AccountCircle from "@material-ui/icons/AccountCircle"
// Styles
import { whiteColor, grayColor } from "../assets/jss/material-dashboard-react.jsx"
// External
import Cookies from 'universal-cookie'
import PropTypes from 'prop-types'


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
          this.props.history.push('/')
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
          <GridItem xs={12} sm={12} md={12} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '150px'}}>
            {/* <div style={{ width: '100%'}}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 57 13.1" style={{ width: '150px', height: 'auto', alignSelf: 'center'}}>
               <title>logo</title>
                  <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                   <g>
                     <g>
                       <path d="M7.4,9.4a3.7,3.7,0,0,1-3.7,3.7,3.8,3.8,0,0,1-2.4-1v.8H0V1.6H1.3V6.7a3.8,3.8,0,0,1,2.4-1A3.7,3.7,0,0,1,7.4,9.4Zm-1.3,0a2.4,2.4,0,1,0-2.4,2.4A2.4,2.4,0,0,0,6.1,9.4Z"/>
                       <path d="M10.2,6.6a4.3,4.3,0,0,1,2.6-.9L12.5,7a2.2,2.2,0,0,0-2.2,2.1v3.8H8.9V5.9h1.3Z"/>
                       <path d="M19.3,5.9h1.3v7.1H19.3v-.8a3.8,3.8,0,0,1-2.4,1,3.7,3.7,0,1,1,0-7.4,3.8,3.8,0,0,1,2.4,1Zm0,3.5A2.4,2.4,0,1,0,17,11.8,2.4,2.4,0,0,0,19.3,9.4Z"/>
                       <path d="M28.7,11.6l-.4.4a3.6,3.6,0,0,1-2.6,1.1A3.7,3.7,0,0,1,23.1,12a3.7,3.7,0,0,1,0-5.2,3.7,3.7,0,0,1,2.6-1.1,3.6,3.6,0,0,1,2.6,1.1l.4.4L27.6,8a2.4,2.4,0,1,0-1.9,3.8,2.4,2.4,0,0,0,1.9-1Z"/>
                       <path d="M36.8,12.9H35.1L32.5,9.4l-1.2,1.1v2.4H30V1.6h1.3V8.7l3.1-2.9h1.9L33.5,8.4Z"/>
                       <path d="M43.5,9.7H38.1a2.2,2.2,0,0,0,2,2.1,2.7,2.7,0,0,0,1.7-.7l1.1.7-.9.8a4,4,0,0,1-1.9.5A3.2,3.2,0,0,1,37.8,12a3.6,3.6,0,0,1-1-2.2,2.2,2.2,0,0,1,0-.3,3.8,3.8,0,0,1,.1-.8,3.7,3.7,0,0,1,.9-1.7,3.2,3.2,0,0,1,2.4-1.1,3.3,3.3,0,0,1,2.4,1.1,3.6,3.6,0,0,1,.9,1.7A4.3,4.3,0,0,1,43.5,9.7ZM42.1,8.6h0a2.1,2.1,0,0,0-2-1.5,2.2,2.2,0,0,0-2,1.5h3.9Z"/>
                       <polygon points="48.7 5.9 46.6 5.9 46.6 3.1 45.2 3.1 45.2 5.9 44 5.9 44 7.2 45.2 7.2 45.2 13.1 46.6 13.1 46.6 7.2 48.4 7.2 48.7 5.9"/>
                     </g>
                     <g>
                       <path class="cls-1" d="M50.5.3H52V1h-.7V6.2H52v.8H50.5Z"/>
                       <path class="cls-1" d="M55.2,6.2h.7V1h-.7V.3h1.5V6.9H55.2Z"/>
                     </g>
                   </g>
                 </g>
               </g>
              </svg> 
              <Typography>Ticket Management System </Typography>     
            </div>       */}
            {/* <ul className="Menu">
              <li onClick={this.loginForm}><Typography style={{ textTransform: 'uppercase'}}>Log In</Typography></li>
              <li onClick={this.registerForm}><Typography  style={{ textTransform: 'uppercase'}}>Sign Up</Typography></li>
            </ul> */}
          </GridItem>
          <GridItem xs={12} sm={6} md={7}>
            <Card>
              <GridContainer > 
                <GridItem xs={12} sm={10} md={12}>
                  <CardBody>
                    <Typography style={{ fontSize: '28px'}}>BTMS is built for every member in your team to help you work more collaboratively and get more done!</Typography>
                    <GridContainer > 
                      <GridItem xs={12} sm={12} md={4}>
                        <Card>
                          <CardHeader>
                            <CardIcon color="info">
                              <ContactMail style={{ color: 'white'}} />
                            </CardIcon>
                          </CardHeader>
                          <CardBody>
                            <Typography>Invite Clients and Developers to join your project!</Typography>
                          </CardBody>
                        </Card>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <Card>
                          <CardHeader>
                            <CardIcon color="rose">
                              <LowPriority style={{ color: 'white'}} />
                            </CardIcon>
                          </CardHeader>
                          <CardBody>
                            <Typography>Prioritize and Organize your work.</Typography>
                          </CardBody>
                        </Card>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <Card>
                          <CardHeader>
                            <CardIcon color="primary">
                              <Note style={{ color: 'white'}} />
                            </CardIcon>
                          </CardHeader>
                          <CardBody>
                            <Typography>Create tickets to keep track of your project development.</Typography>
                          </CardBody>
                        </Card>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <Card>
                          <CardHeader>
                            <CardIcon color="success">
                              <Person style={{ color: 'white'}} />
                            </CardIcon>
                          </CardHeader>
                          <CardBody>
                            <Typography>Assign tickets to your team members and follow their progress.</Typography>
                          </CardBody>
                        </Card>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <Card>
                          <CardHeader>
                            <CardIcon color="warning">
                              <Timeline style={{ color: 'white'}} />
                            </CardIcon>
                          </CardHeader>
                          <CardBody>
                            <Typography>Use milestones to help you plan features and establish release dates.</Typography>
                          </CardBody>
                        </Card>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <Card>
                          <CardHeader>
                            <CardIcon color="danger">
                              <BugReport style={{ color: 'white'}} />
                            </CardIcon>
                          </CardHeader>
                          <CardBody>
                            <Typography>Report bugs and issues with ease!</Typography>
                          </CardBody>
                        </Card>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </GridItem>
              </GridContainer>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={5} style={{}}>
            <Card>
              <CustomTabs
                    headerColor="success"
                    tabs={[
                      {
                        tabName: 'LOG IN',
                        tabIcon: AccountCircle,
                        tabContent: (<LoginForm/>)
                      },
                      {
                        tabName: 'SIGN UP',
                        tabIcon: PersonAdd,
                        tabContent: (<RegisterForm />)
                      }
                    ]} />
              <CardFooter>
                {/* <div style={{ margin: 'auto'}}>
                  <Typography>
                    {this.state.infoText}
                    <Button onClick={this.register}>{this.state.btnText}</Button>
                  </Typography> 
                </div> */}
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
}

export default withRouter(withStyles(styles)(Login))
  

