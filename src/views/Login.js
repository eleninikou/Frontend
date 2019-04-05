import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import Cookies from 'universal-cookie'
import LoginForm from '../components/forms/login/LoginForm'
import Card from "../components/theme/Card/Card";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
    
    componentWillMount = () => {
      const cookies = new Cookies()
        if(this.props.match.url === '/home/logout') {
          cookies.remove('token')
          cookies.remove('user')
          this.props.history.push('/')
        }

    }

  render() {
    return (
      <div style={{ width: '100%', textAlign: 'center' }}>
        <LoginForm/>
      </div>
    )
  }
}

export default withRouter(Login)
  

