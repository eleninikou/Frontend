import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import Cookies from 'universal-cookie'

// Components
import Card from "../components/theme/Card/Card";
import LoginForm from '../components/forms/login/LoginForm'
import CardHeader from "../components/theme/Card/CardHeader.jsx"
import withStyles from "@material-ui/core/styles/withStyles"
import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx"
import CardBody from '../components/theme/Card/CardBody';
import GridItem from "../components/theme/Grid/GridItem.jsx"
import GridContainer from "../components/theme/Grid/GridContainer.jsx"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
    
    componentWillMount = () => {
      const cookies = new Cookies()
        if(this.props.match.url === '/home/logout') {
          cookies.remove('token', { path: '/' })
          cookies.remove('user', { path: '/' })
          this.props.history.push('/')
        }

    }

  render() {
    return (
      <GridContainer style={{}}> 
        <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color="success">
            <h4 className={this.props.classes.cardTitleWhite}>Login</h4>
          </CardHeader>
          <CardBody>
            <LoginForm/>
          </CardBody>
        </Card>
        </GridItem>
      </GridContainer>
    )
  }
}

export default withRouter(withStyles(dashboardStyle)(Login))
  

