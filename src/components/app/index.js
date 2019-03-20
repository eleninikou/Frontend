import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import  Login from '../../views/Login';
import Home from '../../views/Home'
import Project from '../../views/Project'
import CreateProject from '../../views/CreateProject'
import EditProject from '../../views/EditProject'

import  NotFoundPage  from '../../views/NotFound';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/home' component={Home} />
          <Route exact path='/home/create-project' component={CreateProject} />
          <Route exact path='/home/edit-project/{id}' component={EditProject} />
          <Route exact path='/home/show-project/{id}' component={Project} />
          <Route exact path='/logout' component={Login} />
          <Route component={NotFoundPage} /> 
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
