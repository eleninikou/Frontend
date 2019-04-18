import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import Cookies from 'universal-cookie'
import ImageUploader from 'react-images-upload'
import axios from "axios"

// Redux
import { connect } from 'react-redux'
import { getUser, updateUser } from '../redux/actions/auth/Actions'

// Theme components
import GridItem from "../components/theme/Grid/GridItem.jsx"
import GridContainer from "../components/theme/Grid/GridContainer.jsx"
import Button from "../components/theme/CustomButtons/Button.jsx"
import Card from "../components/theme/Card/Card.jsx"
import CardHeader from "../components/theme/Card/CardHeader.jsx"
import CardBody from "../components/theme/Card/CardBody.jsx"
import CardFooter from "../components/theme/Card/CardFooter.jsx"
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx"
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline"

// Material UI components
import withStyles from "@material-ui/core/styles/withStyles"
import TextField from '@material-ui/core/TextField'

import { DangerDialogWrapped }  from '../components'

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      name: '',
      email: '',
      password: null,
      repeatPassword: '',
      successMessage: '',
      open: false,
    }
    this.onDrop= this.onDrop.bind(this)
  }

  componentWillMount = () => {
    const cookies = new Cookies()
    const user = cookies.get('user')

    this.props.getUser(user).then(res => {
      this.setState({
        user,
        name: res.user.name,
        email: res.user.email,
        avatar: res.user.avatar
      })
    })


    var id = window.setTimeout(null, 0)
    while (id--) { window.clearTimeout(id) }

  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }


  submit = event => {
    event.preventDefault();

    if(this.state.password !== null) {
      if(this.state.repeatPassword === this.state.password) {
        const user = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          avatar: this.state.avatar
        }
        this.props.updateUser(user, this.state.user).then(res => {
          this.setState({ successMessage: res.message })
        }).then(() => {
          this.showNotification('tr')
        })
      }
    } else {
      const user = {
        name: this.state.name,
        email: this.state.email,
        avatar: this.state.avatar
      }
      this.props.updateUser(user, this.state.user).then(res => {
        this.setState({ successMessage: res.message })
      }).then(() => {
        this.showNotification('tr')
      })
    }
    
  }

  onDrop(file) {   

    const cookies = new Cookies()
    var token = cookies.get('token')

    let reader = new FileReader()
    const scope = this

      reader.onload = () => {
        const formData = new FormData()
        formData.append('file', file[0])

        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/image`,  
          formData, { headers: { 
            "X-Requested-With": "XMLHttpRequest",
            'Access-Control-Allow-Origin': '*',
            "Authorization": `Bearer ${token}`
          }}).then((res) => {
            debugger;
            const url = process.env.REACT_APP_API_BASE_URL+res.data.url
            scope.setState({ avatar: url })
          })
      }
      reader.readAsDataURL(file[0])
  }

  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this), 6000);
    }

    handleClickOpen = () => { this.setState({ open: true }) }

    handleClose = open => { this.setState({ open })}
  

  render() {
    const { classes } = this.props
    const { successMessage, user } = this.state

  return (
    <form className={classes.form} onSubmit={this.submit}>
      <Snackbar
        place="tr"
        color="success"
        icon={CheckCircleOutline}
        message={successMessage}
        open={this.state.tr}
        closeNotification={() => this.setState({ tr: false })}
        close
      /> 
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <img src={this.state.avatar} alt="profile" style={{ display: 'block', borderRadius: '50%', width: '100px', height: '100px', margin: 'auto' }} />
                <ImageUploader
                      withIcon={true}
                      buttonText='Upload new profile picture'
                      onChange={this.onDrop}
                      imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                      maxFileSize={5242880}
                  />
              </GridItem>
              <GridContainer>
              </GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      label="name"
                      id="name"
                      type="text"
                      name="name"
                      className="my-input"
                      value={this.state.name}
                      onChange={this.handleChange.bind(this)}
                      fullWidth
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      label="email"
                      type="email"
                      name="email"
                      id="email-address"
                      value={this.state.email}
                      onChange={this.handleChange.bind(this)}
                      className="my-input"
                      fullWidth
                    />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      label="password"
                      id="password"
                      type="password"
                      name="password"
                      className="my-input"
                      onChange={this.handleChange.bind(this)}
                      fullWidth
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label="repeat password"
                    id="password"
                    type="password"
                    name="repeatPassword"
                    onChange={this.handleChange.bind(this)}
                    className="my-input"
                    fullWidth
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button type="submit" color="rose">Update Profile</Button>
              <Button color="rose" onClick={this.handleClickOpen}>Remove Account</Button>
              <DangerDialogWrapped 
                type={'account'}
                title={'Are you sure you want to delete your account?'}
                id={user.id}
                open={this.state.open}
                onClose={this.handleClose}
              />
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </form>
  );
  }
}

const mapDispatchToProps = dispatch => { 
  return { 
    getUser: id => dispatch(getUser(id)),
    updateUser: (user, id) => dispatch(updateUser(user, id))
   }
}

const mapStateToProps = state => ({ 
  user: state.auth.user,
  successMessage: state.auth.successMessage
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserProfile)));
