import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { logout } from '../redux/actions/auth/Actions'

// Components
import LoginForm from '../components/forms/login/LoginForm'
import RegisterForm from '../components/forms/register/RegisterForm'
// Theme components
import Card from "../components/theme/Card/Card"
import CardBody from '../components/theme/Card/CardBody'
import GridItem from "../components/theme/Grid/GridItem.jsx"
import CardIcon from "../components/theme/Card/CardIcon.jsx"
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

class Logout extends Component {
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
          cookies.remove('token', { path: '/' })
          cookies.remove('user', { path: '/' })
          cookies.remove('invitation', { path: '/' })
          this.props.logout().then(res => {
              console.log(res)
          })
    }




  render() {
    return (
        <GridContainer > 
          <GridItem xs={12} sm={12} md={12} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '150px'}}>
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

            </Card>
          </GridItem>
        </GridContainer>
    )
  }
}

Logout.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

const mapDispatchToProps = dispatch => { 
    return { 
        logout: () => dispatch(logout())
    }
  }

export default withRouter(connect(null, mapDispatchToProps)(withStyles(styles)(Logout)))
  

