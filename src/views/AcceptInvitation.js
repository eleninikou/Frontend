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
import CardBody from '../components/theme/Card/CardBody'
import GridItem from "../components/theme/Grid/GridItem.jsx"
import CardHeader from "../components/theme/Card/CardHeader.jsx"
import GridContainer from "../components/theme/Grid/GridContainer.jsx"
// Material UI
import withStyles from "@material-ui/core/styles/withStyles"
// Styles
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx"


class AcceptInvitation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInUserEmail: null,
      invitedUserEmail: '',
      existingUser: '',
      register: false,
      user: ''
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
    

    componentWillMount = () => {
      const cookies = new Cookies()

      // Check if user is logged in
      var user = cookies.get('user')
      this.setState({ user })
      
      // Set and get invitation token
      cookies.set( "invitation", 
        this.props.match.params.id, 
        { path: "/", maxAge: 86399 })

      var invitation = cookies.get('invitation')
      
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
      <GridContainer style={{}}> 
        <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color="success">
            <h4 className={this.props.classes.cardTitleWhite}>Accept Invitation</h4>
          </CardHeader>
          <CardBody>
            {existingUser ?
              <LoginForm email={invitedUserEmail} />
            : <RegisterForm email={invitedUserEmail} redirect={this.redirect.bind(this)}  />}
          </CardBody>
        </Card>
        </GridItem>
      </GridContainer>
    )
  }
}

const mapDispatchToProps = dispatch => { 
    return { 
      getUser: id=> dispatch(getUser(id)),
      getEmailFromInvitation: token => dispatch(getEmailFromInvitation(token)),
      acceptInvitation: token => dispatch(acceptInvitation(token))
    }
  }
  
  const mapStateToProps = state => ({
      user: state.auth.user,
      email: state.auth.email
  });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(AcceptInvitation)))
  

