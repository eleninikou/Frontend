import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import  Login from '../../views/Login';
import Home from '../../views/Home'
import CreateProject from '../../views/CreateProject'
import Project from '../../views/Project'

import  NotFoundPage  from '../../views/NotFound';
import '../../assets/css/main.css'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/home' component={Home} />
          <Route exact path='/home/create-project' component={CreateProject} />
          <Route exact path='/home/project/{id}' component={Project} />
          <Route exact path='/logout' component={Login} />
          <Route component={NotFoundPage} /> 
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
