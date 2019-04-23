import React, { Component } from 'react'
import { withRouter } from "react-router-dom"

import { connect } from 'react-redux'
import { register, googleLogin, acceptInvitation } from '../../../redux/actions/auth/Actions'

import Cookies from 'universal-cookie'
import GoogleLogin from 'react-google-login'

import GridItem from "../../theme/Grid/GridItem.jsx";
import CardBody from '../../theme/Card/CardBody'
import GridContainer from "../../theme/Grid/GridContainer.jsx";

// Material UI
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles'
import { FormControl } from '@material-ui/core';

// Style
import dashboardStyle from "../../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx"


class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      errorMessage: '',
      invitation: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
}

  responseGoogle = response => {
    if (!response.error) {
      this.props.googleLogin(response.profileObj)
      .then(res => {
        if(res.success){
            this.props.history.push('/home/dashboard')
          }
        else {
          this.setState({ errorMessage: 'Could not log in, show error message'})
        }  
        })
    }
  }

  submit = event => {

    event.preventDefault();
    if(this.state.password === this.state.repeatPassword) {

      const email =  '';
      if(this.props.email) {
        this.email = this.props.email
      } else {
        this.email = this.state.email
      }
      const creds = {
        name: this.state.name,
        email: this.email,
        password: this.state.password
      };
      ;

      this.props.register(creds)
      .then(res => {
        if(res.email) {
          if (this.state.invitation) {
            this.props.redirect(this.state.invitation, true)
          } else {
            this.props.history.push('/home/dashboard')
          }
        } else {
          this.setState({ errorMessage: 'Could not log in, show error message'})
        }
      })
    }
  }
  
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  componentWillMount = () => {
    const cookies = new Cookies()
    var invitation = cookies.get('invitation')
    this.setState({ invitation })

  }


  render () {

  const { classes, email } = this.props

  return (
    <GridContainer >
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer>
            <CardBody>
            <form style={{ width: '100%', textAlign: 'center'}} onSubmit={this.submit}>
            <GridItem xs={12} sm={12} md={6} style={{ margin: 'auto'}}>
              <FormControl className={classes.formControl}>
                <TextField 
                    name="name" 
                    type="text"
                    label="Full name" 
                    className="my-input"
                    fullWidth
                    value={this.state.name}
                    onChange={this.handleChange}
                />
              </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={6} style={{ margin: 'auto'}}>
              <FormControl className={classes.formControl}>
                <TextField 
                    disabled={email ? true : false}
                    name="email" 
                    type="email"
                    label="Email" 
                    className="my-input"
                    fullWidth
                    value={email}
                    onChange={this.handleChange}
                />
              </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={6} style={{ margin: 'auto'}}>
              <FormControl className={classes.formControl}>
                <TextField 
                      name="password" 
                      type="password"
                      label="Password"
                      className="my-input"
                      fullWidth
                      value={this.state.password}
                      onChange={this.handleChange}
                  />
                </FormControl>
                </GridItem> 
                <GridItem xs={12} sm={12} md={6} style={{ margin: 'auto'}}>
              <FormControl className={classes.formControl}>
                <TextField 
                      name="repeatPassword" 
                      type="repeatPassword"
                      label="Repeat Password"
                      className="my-input"
                      fullWidth
                      value={this.state.repeatPassword}
                      onChange={this.handleChange}
                  />
                </FormControl>
                </GridItem> 
                <GridItem xs={12} sm={12} md={4} style={{ margin: 'auto'}} >
                <FormControl className={classes.formControl}>
                  <Button type="submit" variant="contained" color="primary" 
                    style={{ 
                      marginTop: '30px', 
                      marginBottom: '20px',
                      backgroundColor: '#66bb6a', 
                      padding: '10px' 
                    }} 
                  >
                    Register
                  </Button> 
                  </FormControl>
                </GridItem> 
            </form>
            {!this.state.invitation ?
            <div>
                <GridItem xs={12} sm={12} md={4} style={{ textAlign: 'center', margin: 'auto'}}>
                  <FormControl className={classes.formControl}>
                    <GoogleLogin
                      clientId="490433308929-go7fh6c8fd4hbq4mgcp6qbpu0hcm1c2h.apps.googleusercontent.com"
                      buttonText="Use your google account"
                      onSuccess={this.responseGoogle}
                      onFailure={this.responseGoogle}
                      width="100%"
                      />
                    </FormControl>
                </GridItem> 
              </div>  
            : null }
                <GridItem xs={12} sm={12} md={12} style={{ textAlign: 'center', marginTop: '20px'}}>
                  {this.state.errorMessage}
                </GridItem> 
            </CardBody>
            </GridContainer>    
        </GridItem>
      </GridContainer>    
  )
  }
}

const mapDispatchToProps = dispatch => { 
  return { 
    register: creds => dispatch(register(creds)),
    googleLogin: googleAuth => dispatch(googleLogin(googleAuth)),
    acceptInvitation: token => dispatch(acceptInvitation(token))

  }
}

const mapStateToProps = state => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(RegisterForm)));

