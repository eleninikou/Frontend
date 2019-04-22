import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import Cookies from 'universal-cookie'
import PropTypes from 'prop-types'

// Components
import Card from "../components/theme/Card/Card"
import LoginForm from '../components/forms/login/LoginForm'
import CardHeader from "../components/theme/Card/CardHeader.jsx"
import CardBody from '../components/theme/Card/CardBody'
import GridItem from "../components/theme/Grid/GridItem.jsx"
import GridContainer from "../components/theme/Grid/GridContainer.jsx"

import withStyles from "@material-ui/core/styles/withStyles"

import { whiteColor, grayColor } from "../assets/jss/material-dashboard-react.jsx";

const styles = {
  center: {
    width: '100vw',
    transform: 'translateY(50%) translateX(15%)',
    margin: 'auto'
  },
  cardTitleWhite: {
    color: whiteColor,
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1"
    }
  },

};

class Login extends Component {
    
    componentWillMount = () => {
      const cookies = new Cookies()
        if(this.props.match.url === '/home/logout') {
          cookies.remove('token', { path: '/' })
          cookies.remove('user', { path: '/' })
          cookies.remove('invitation', { path: '/' })
          this.props.history.push('/')
        }
    }

  render() {
    return (
        <GridContainer > 
          <GridItem xs={12} sm={12} md={6} style={{ margin: 'auto', marginTop: '50vh', transform: 'translateY(-50%)'}}>
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

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withRouter(withStyles(styles)(Login))
  

