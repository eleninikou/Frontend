import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
// Redux
import { connect } from 'react-redux'
import { login, googleLogin, acceptInvitation } from '../../../redux/actions/auth/Actions'
// Material UI components
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import { FormControl } from '@material-ui/core'
import FormHelperText from '@material-ui/core/FormHelperText'
// Theme components
import GridContainer from "../../theme/Grid/GridContainer.jsx"
import GridItem from "../../theme/Grid/GridItem.jsx"
import CardBody from '../../theme/Card/CardBody'
// external
import Cookies from 'universal-cookie'
import GoogleLogin from 'react-google-login'
// Styles
import dashboardStyle from "../../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx"
import LoginSpinner from '../../spinner/LoginSpinner'

class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: this.props.email,
      password: '',
      errorMessage: '',
      hasError: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
    this.responseGoogle = this.responseGoogle.bind(this)
}

  // Login user when auth by google
  responseGoogle = response => {
    if (!response.error) {
      this.props.googleLogin(response.profileObj)
      .then(res => {
        if(res.success){ this.props.history.push('/home/dashboard') }
        else { this.setState({ errorMessage: 'Could not log in user, try again later'})}  
      })
    }
  }

  submit = event => {
    event.preventDefault()
    const cookies = new Cookies()
    var invitation = cookies.get('invitation')

    // If everything is filled in
    if(this.state.email && this.state.password) {
      const creds = {
        email: this.state.email,
        password: this.state.password
      }
      this.props.login(creds)
      .then(res => {
        if(res && res.id) {
          debugger;
          // If cookie invitation -> accept invitation
          if (invitation) { 
            debugger;
            this.props.acceptInvitation(invitation)
            .then(res => {
              console.log(res)
              debugger;
              this.props.history.push({
                pathname: `/home/projects`,
                state: { successMessage: res.message} // Display message that invitation is accepted
              })
              cookies.remove('invitation', { path: '/' })
            })
          } else { this.props.history.push('/home/dashboard') } // Just log in
        } 
    }) 
   } else { this.setState({ hasError: true }) }
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  render () {
  const { classes, isFetching, errorMessage } = this.props
  const { hasError, email, password } = this.state

  return (
    <GridContainer >
      <GridItem xs={12} sm={12} md={12}>
        <GridContainer >
          <CardBody >
            <form style={{ width: '100%', textAlign: 'center'}} onSubmit={this.submit}>
            <GridItem xs={12} sm={12} md={8} style={{ margin: 'auto'}}>
              <FormControl className={classes.formControl}>
                {hasError && !email && <FormHelperText id="email">Fill in your email!</FormHelperText>}
                <TextField 
                   error={hasError && !email ? true : false}
                    name="email" 
                    type="email"
                    autoComplete="username"
                    label="Email" 
                    fullWidth
                    value={email}
                    onChange={this.handleChange}
                />
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={12} md={8} style={{ margin: 'auto'}}>
              <FormControl className={classes.formControl}>
                {hasError && !password && <FormHelperText id="password">Fill in your password!</FormHelperText>}
                  <TextField 
                      error={hasError && !password ? true : false}  
                      name="password" 
                      type="password"
                      autoComplete="current-password"
                      label="Password"
                      fullWidth
                      value={password}
                      onChange={this.handleChange}
                  />
                </FormControl>
              </GridItem> 
              <GridItem xs={12} sm={12} md={8} style={{ margin: 'auto', marginTop: '30px'}}>
                <FormControl className={classes.formControl}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    style={{ backgroundColor: '#66bb6a',  padding: '10px' }}>
                    Log in
                  </Button> 
                </FormControl>
              </GridItem> 
              </form>

              {!this.props.email ? // If not redirected from invitation show google option
                <div>
                  <GridItem xs={12} sm={12} md={8} style={{ margin: 'auto', textAlign: 'center', marginTop: '20px'}}>
                  <FormControl className={classes.formControl}>
                    <GoogleLogin
                      clientId="490433308929-go7fh6c8fd4hbq4mgcp6qbpu0hcm1c2h.apps.googleusercontent.com"
                      buttonText="USE GOOGLE ACCOUNT"
                      onSuccess={this.responseGoogle}
                      onFailure={this.responseGoogle}
                      width="100%"
                      className="google-btn"
                      />
                    </FormControl>
                    </GridItem> 
                    <GridItem xs={12} sm={12} md={12} style={{ textAlign: 'center', marginTop: '20px'}}>
                      {isFetching ? <LoginSpinner />  : errorMessage}
                    </GridItem> 
                </div>
              : null }
            </CardBody>
          </GridContainer>    
        </GridItem>
      </GridContainer>   
    )
  }
}

const mapDispatchToProps = dispatch => { 
  return { 
    login: creds => dispatch(login(creds)),
    googleLogin: googleAuth => dispatch(googleLogin(googleAuth)),
    acceptInvitation: token => dispatch(acceptInvitation(token))
  }
}

const mapStateToProps = state => ({ 
  isFetching : state.auth.isFetching,
  errorMessage: state.auth.errorMessage
 })

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(LoginForm)))

