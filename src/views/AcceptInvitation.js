import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import Cookies from 'universal-cookie'
// Redux
import { connect } from 'react-redux'
import { getUser, getEmailFromInvitation, acceptInvitation } from '../redux/actions/auth/Actions'
// Components
import LoginForm from '../components/forms/login/LoginForm'
import RegisterForm from '../components/forms/register/RegisterForm'
// Theme components
import Card from "../components/theme/Card/Card"
import Button from "../components/theme/CustomButtons/Button.jsx"
import CardBody from '../components/theme/Card/CardBody'
import GridItem from "../components/theme/Grid/GridItem.jsx"
import CardHeader from "../components/theme/Card/CardHeader.jsx"
import CardFooter from "../components/theme/Card/CardFooter.jsx"
import GridContainer from "../components/theme/Grid/GridContainer.jsx"
// Material UI
import withStyles from "@material-ui/core/styles/withStyles"
// Styles
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx"
import AppInfo from '../components/login/AppInfo'
import { Typography } from '@material-ui/core';

class AcceptInvitation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInUserEmail: null,
      invitedUserEmail: '',
      existingUser: '',
      register: false,
      user: '',
      message: ''
    }
  }

    redirect(invitation, register) {
      const cookies = new Cookies()

      if(this.state.loggedInUserEmail === this.state.invitedUserEmail) {
        
      this.props.acceptInvitation(invitation).then(res => {
        this.props.history.push({
          pathname: `/home/projects`,
          state: { successMessage: res.message}
        })
        cookies.remove('invitation', { path: '/' })
      })

      } else if(register) {
        this.props.acceptInvitation(invitation)
        .then(res => {
          this.props.history.push({
            pathname: `/home/projects`,
            state: { successMessage: res.message}
          })
          cookies.remove('invitation', { path: '/' })
        })
      } else {
          this.props.getEmailFromInvitation(invitation).then(res => {
            if(res.email) {
              this.setState({ invitedUserEmail: res.email[0], existingUser: res.existing })
            }
          })
      }
    }
    
    goToLogin = () => {
      this.props.history.push('/')
    }

    componentDidMount = () => {
      const cookies = new Cookies()

      // Check if user is logged in
      var user = cookies.get('user')
      this.setState({ user })
      
      // Set and get invitation token
      cookies.set( "invitation", 
        this.props.match.params.id, 
        { path: "/", maxAge: 86399 })

      var invitation = cookies.get('invitation')

      // this.props.checkInvitation(invitation).then(res => { console.log(res)})
      
      // If user is logged in. Check if same email address as invitation
      if (user) {
        this.props.getUser(user).then(res => {
          this.setState({ loggedInUserEmail: res.user.email })
        }).then(() => {
          this.props.getEmailFromInvitation(invitation)
          .then(res => {
            if(res.email) {
              this.setState({ 
                invitedUserEmail: res.email[0], 
                existingUser: res.existing 
              })
            }})
          .then(() => { this.redirect(invitation, false) })
        })

      // If no user is logged in. Set email from invitation in form.
      // If existing in login form, if not in register form
      } else {
        this.props.getEmailFromInvitation(invitation)
        .then(res => {
          if(res.email) {
            this.setState({ 
              invitedUserEmail: res.email[0], 
              existingUser: res.existing 
            })
          }})
      } 
    }


  render() {
    const { invitedUserEmail, existingUser } = this.state;
    return (
      <div  style={{marginTop: '150px'}}>
      <GridContainer> 
        <AppInfo />
        <GridItem xs={12} sm={12} md={4} >
        {invitedUserEmail ?
        <Card>
          <CardHeader color="success">
            <h4 className={this.props.classes.cardTitleWhite}>Fill in to join the team!</h4>
          </CardHeader>
          <CardBody>
            {existingUser ?
              <LoginForm email={invitedUserEmail} />
            : <RegisterForm email={invitedUserEmail} redirect={this.redirect.bind(this)}  />}
          </CardBody>
        </Card>
        : 
        <Card>
          <CardHeader color="danger">
            <h4 className={this.props.classes.cardTitleWhite}>OOPS!</h4>
          </CardHeader>
          <CardBody>
            <Typography> It looks like your invitation allready has been used. </Typography>
            <Typography> Login to start working on your projects!</Typography>
          </CardBody>
          <CardFooter >
            <Button onClick={this.goToLogin} style={{ margin: 'auto'}} color="success">Login</Button>
          </CardFooter>
        </Card> }
        </GridItem>
      </GridContainer>
        </div>
    )
  }
}

const mapDispatchToProps = dispatch => { 
    return { 
      getUser: id=> dispatch(getUser(id)),
      getEmailFromInvitation: token => dispatch(getEmailFromInvitation(token)),
      acceptInvitation: token => dispatch(acceptInvitation(token)),
    }
  }
  
  const mapStateToProps = state => ({
      user: state.auth.user,
      email: state.auth.email
  })

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(AcceptInvitation)))
  

