import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'

import GoogleLogin from 'react-google-login'
import { login, googleLogin } from '../../../redux/actions/auth/Actions'


const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
      marginTop: "20px"
    },
    form: {
        flexGrow: 1,
        justifyContent: "center",
        textAlign: "center",
        padding: "50px"
      },
    card: {
        maxWidth: 345,
        margin: "auto",
        marginTop: "50vh",
        transform: "translateY(-50%)"
      }
  });

  

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
}

  responseGoogle = response => {
    if (!response.error) {
      this.props.googleLogin(response.profileObj)
      .then(res => {
          debugger;
          if(!res.error) {
            this.props.history.push('/home')
          }
        })
    }
  }

  submit = event => {
    event.preventDefault();
    const creds = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.login(creds)
      .then(res => {
        console.log(res)
        debugger;
        if(!res.error) {
          this.props.history.push('/home')
        }
      })
  }
  
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render () {
    const {classes } = this.props
  return (
    <Card className={classes.card}>
        <form className={classes.form} onSubmit={this.submit}>
            <div>
                <TextField 
                    name="email" 
                    type="email"
                    label="Email" 
                    value={this.state.textFieldValue}
                    onChange={this.handleChange}
                />
            </div> 
            <div>
                <TextField 
                    name="password" 
                    type="password"
                    label="Password"
                    value={this.state.textFieldValue}
                    onChange={this.handleChange}
                />
            </div> 
            <Button type="submit" variant="contained" color="primary" className={classes.button}>Login</Button> 
        </form>
            <GoogleLogin
              clientId="490433308929-go7fh6c8fd4hbq4mgcp6qbpu0hcm1c2h.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
            />
    </Card >
  )
  }
}

const mapDispatchToProps = dispatch => { 
  return { 
    login: creds => dispatch(login(creds)),
    googleLogin: googleAuth => dispatch(googleLogin(googleAuth))
  }
}

const mapStateToProps = state => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginForm)));

