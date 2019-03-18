import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import  Login from '../../views/Login';
import  Dashboard from '../../views/Dashboard';
import Home from '../../views/Home'
import  NotFoundPage  from '../../views/NotFound';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/home' component={Home} />
          <Route component={NotFoundPage} /> 
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
