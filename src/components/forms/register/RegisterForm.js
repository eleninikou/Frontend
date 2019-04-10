import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import GoogleLogin from 'react-google-login'
import { register, googleLogin } from '../../../redux/actions/auth/Actions'
import dashboardStyle from "../../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx"
import GridContainer from "../../theme/Grid/GridContainer.jsx";
import GridItem from "../../theme/Grid/GridItem.jsx";
import CardBody from '../../theme/Card/CardBody';
import { FormControl } from '@material-ui/core';
import Cookies from 'universal-cookie'


class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: this.props.email,
      password: '',
      repeatPassword: '',
      errorMessage: ''
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
        const creds = {
          email: this.state.email,
          password: this.state.password
        };


    const cookies = new Cookies()
    var invitation = cookies.get('invitation')

    this.props.register(creds)
    .then(res => {
      if (invitation) {
        this.props.acceptInvitation(invitation).then(res => {
          console.log(res)
          debugger;
        } )
      }



        if(res.email) {
            this.props.history.push('/home/dashboard')
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

  render () {
    const { classes } = this.props
  return (
    <GridContainer >
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer>
            <CardBody>
            <form style={{ width: '100%', textAlign: 'center'}} onSubmit={this.submit}>
            <GridItem xs={12} sm={12} md={12}>
              <FormControl className={classes.formControl}>
                <TextField 
                    name="name" 
                    type="text"
                    label="Full name" 
                    fullWidth
                    value={this.state.name}
                    onChange={this.handleChange}
                />
              </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
              <FormControl className={classes.formControl}>
                <TextField 
                    name="email" 
                    type="email"
                    label="Email" 
                    fullWidth
                    value={this.state.email}
                    onChange={this.handleChange}
                />
              </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
              <FormControl className={classes.formControl}>
                <TextField 
                      name="password" 
                      type="password"
                      label="Password"
                      fullWidth
                      value={this.state.password}
                      onChange={this.handleChange}
                  />
                </FormControl>
                </GridItem> 
                <GridItem xs={12} sm={12} md={12}>
              <FormControl className={classes.formControl}>
                <TextField 
                      name="repeatPassword" 
                      type="repeatPassword"
                      label="Repeat Password"
                      fullWidth
                      value={this.state.repeatPassword}
                      onChange={this.handleChange}
                  />
                </FormControl>
                </GridItem> 
                <GridItem xs={12} sm={12} md={12} style={{ marginTop: '30px'}}>
                <FormControl className={classes.formControl}>
                  <Button type="submit" variant="contained" color="primary" >
                    Register
                  </Button> 
                  </FormControl>
                </GridItem> 
            </form>
              <GridItem xs={12} sm={12} md={12} style={{ textAlign: 'center', marginTop: '20px'}}>
              <FormControl className={classes.formControl}>
                <GoogleLogin
                  clientId="490433308929-go7fh6c8fd4hbq4mgcp6qbpu0hcm1c2h.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  width="100%"
                  />
                </FormControl>
                </GridItem> 
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
  }
}

const mapStateToProps = state => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(RegisterForm)));

