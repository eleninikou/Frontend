import React, { Component } from 'react'
import LoginForm from '../components/forms/login/LoginForm';
import { Divider } from '@material-ui/core';


export default class Login extends Component {

  submit = values => {
    // print the form values to the console
    console.log(values)
  }

    render() {
      return (   
        <div>
          <LoginForm handleSubmit={this.submit}/>
        </div>

      )
  }

}
  

