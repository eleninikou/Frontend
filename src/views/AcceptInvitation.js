import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import Cookies from 'universal-cookie'
import { connect } from 'react-redux'

// Components
import Card from "../components/theme/Card/Card";
import CardHeader from "../components/theme/Card/CardHeader.jsx"
import withStyles from "@material-ui/core/styles/withStyles"
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx"
import CardBody from '../components/theme/Card/CardBody';
import GridItem from "../components/theme/Grid/GridItem.jsx"
import GridContainer from "../components/theme/Grid/GridContainer.jsx"
import LoginForm from '../components/forms/login/LoginForm'

import { getUser, getEmail, acceptInvitation } from '../redux/actions/auth/Actions'
import RegisterForm from '../components/forms/register/RegisterForm';

class AcceptInvitation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInEmail: null,
      invitedEmail: '',
      existing: '',
    }
  }
    
    componentWillMount = () => {
      const cookies = new Cookies()
     cookies.set( "invitation", this.props.match.params.id, { path: "/", maxAge: 86399 });
      var user = cookies.get('user')
      var invitation = cookies.get('invitation')

      if (user) {
          this.props.getUser(user).then(res => {
            this.setState({ loggedInEmail: res.user.email })
          })

            this.props.getEmail(invitation).then(res => {
              this.setState({ invitedEmail: res.email[0], existing: res.existing })
            })
  
            debugger;
            if(this.state.loggedInEmail == this.state.invitedEmail) {
              this.props.acceptInvitation(invitation).then(res => {
                debugger;
                this.props.history.push({
                  pathname: `/home/projects`,
                  state: { successMessage: res.successMessage}
                })
              })
            }
  
        // Redirect to project and accept invitation
      } else {
          // Redirect to register page
      }

    }

  render() {
    const {loggedInEmail, invitedEmail, existing } = this.state;

    
    return (

      <GridContainer style={{}}> 
        <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color="success">
            <h4 className={this.props.classes.cardTitleWhite}>Accept Invitation</h4>
          </CardHeader>
          <CardBody>
            {existing ?
              <LoginForm email={invitedEmail}/>
            : 
              <RegisterForm email={invitedEmail}/>}
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
      getEmail: token => dispatch(getEmail(token)),
      acceptInvitation: token => dispatch(acceptInvitation(token))

    }
  }
  
  const mapStateToProps = state => ({
      user: state.auth.user,
      email: state.auth.email
  });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(AcceptInvitation)))
  

