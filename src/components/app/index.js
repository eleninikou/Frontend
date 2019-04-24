import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { Login, Home, CreateProject, Project, NotFoundPage, AcceptInvitation  } from '../../views'

function PrivateRoute({ component: Component, ...rest }) {
  
  const cookies = new Cookies()
  var token = cookies.get('token')
  
  // token ? show components : redirect to login
  return (
    <Route
      {...rest}
      render={props =>
        token ? <Component {...props} />
       : <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      }
    />
  )
}

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Login} />
          <PrivateRoute path='/home/logout' component={Login} />
          <PrivateRoute path='/home' component={Home} />
          <PrivateRoute exact path='/home/create-project' component={CreateProject} />
          <PrivateRoute exact path='/home/project/{id}' component={Project} />
          <Route path='/accept/:id' component={AcceptInvitation} /> 
          <Route component={NotFoundPage} /> 
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
