import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import ImageUploader from "react-images-upload";
import axios from "axios";
// Redux
import { connect } from "react-redux";
import { getUser, updateUser } from "../redux/actions/auth/Actions";
// Theme components
import Card from "../components/theme/Card/Card.jsx";
import Button from "../components/theme/CustomButtons/Button.jsx";
import GridItem from "../components/theme/Grid/GridItem.jsx";
import CardIcon from "../components/theme/Card/CardIcon.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import Snackbar from "../components/theme/Snackbar/Snackbar.jsx";
import CardFooter from "../components/theme/Card/CardFooter.jsx";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
// Material UI components
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
// Components
import LoadingSpinner from "../components/spinner/LoadingSpinner";
import { DangerDialogWrapped } from "../components";

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
      user: "",
      name: "",
      email: "",
      password: null,
      repeatPassword: "",
      successMessage: "",
      errorMessage: "",
      open: false
    };
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount = () => {
    const cookies = new Cookies();
    const user = cookies.get("user");
    const token = cookies.get("token");

    this.props.getUser(user, token).then(res => {
      if (res.user) {
        this.setState({
          user,
          name: res.user.name,
          email: res.user.email,
          avatar: res.user.avatar
        });
      } else {
        this.setState({ errorMessage: "No internet connection" });
        this.showNotification("tr");
      }
    });

    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submit = event => {
    event.preventDefault();

    if (this.state.password !== null) {
      if (this.state.repeatPassword === this.state.password) {
        const user = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          avatar: this.state.avatar
        };
        this.props
          .updateUser(user, this.state.user)
          .then(res => {
            this.setState({ successMessage: res.message });
          })
          .then(() => {
            this.showNotification("tr");
          });
      }
    } else {
      const user = {
        name: this.state.name,
        email: this.state.email,
        avatar: this.state.avatar
      };
      this.props
        .updateUser(user, this.state.user)
        .then(res => {
          this.setState({ successMessage: res.message });
        })
        .then(() => {
          this.showNotification("tr");
        });
    }
  };

  onDrop(file) {
    const cookies = new Cookies();
    var token = cookies.get("token");

    let reader = new FileReader();
    const scope = this;

    reader.onload = () => {
      const formData = new FormData();
      formData.append("file", file[0]);
      return axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/tickets/image`,
          formData,
          {
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(res => {
          const url = process.env.REACT_APP_API_BASE_URL + res.data.url;
          scope.setState({ avatar: url });
        });
    };
    reader.readAsDataURL(file[0]);
  }

  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      6000
    );
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = open => {
    this.setState({ open });
  };

  render() {
    const { classes, isFetching, text } = this.props;
    const { successMessage, errorMessage, user } = this.state;

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
        {errorMessage ? (
          <Snackbar
            place="tr"
            color="danger"
            // icon={CheckCircleOutline}
            message={errorMessage}
            open={this.state.tr}
            closeNotification={() => this.setState({ tr: false })}
            close
          />
        ) : null}
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <CardIcon color="rose" style={{ display: "flex" }}>
                  <h4 className={this.props.classes.cardTitleWhite}>Profile</h4>
                </CardIcon>
              </CardHeader>
              <CardBody>
                {isFetching ? (
                  <LoadingSpinner text={text}/>
                ) : (
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      {this.state.avatar ? (
                        <img
                          src={this.state.avatar}
                          alt="profile"
                          style={{
                            display: "block",
                            borderRadius: "50%",
                            width: "100px",
                            height: "100px",
                            margin: "auto"
                          }}
                        />
                      ) : (
                        <Avatar
                          style={{
                            margin: "auto",
                            height: "100px",
                            width: "100px"
                          }}
                        >
                          <AccountCircle style={{ fontSize: "70px" }} />
                        </Avatar>
                      )}
                      <ImageUploader
                        withIcon={true}
                        buttonText="Upload new profile picture"
                        onChange={this.onDrop}
                        imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
                        maxFileSize={5242880}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} style={{ margin: "auto" }}>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <TextField
                            label="Name"
                            id="name"
                            type="text"
                            name="name"
                            className="my-input"
                            value={this.state.name}
                            onChange={this.handleChange.bind(this)}
                            fullWidth
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <TextField
                            label="Email"
                            type="email"
                            name="email"
                            id="email-address"
                            value={this.state.email}
                            onChange={this.handleChange.bind(this)}
                            className="my-input"
                            fullWidth
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <TextField
                            label="Change password"
                            id="password"
                            type="password"
                            name="password"
                            className="my-input"
                            onChange={this.handleChange.bind(this)}
                            fullWidth
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <TextField
                            label="Repeat password"
                            id="password"
                            type="password"
                            name="repeatPassword"
                            onChange={this.handleChange.bind(this)}
                            className="my-input"
                            fullWidth
                          />
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                )}
              </CardBody>
              <CardFooter style={{ justifyContent: "flex-end" }}>
                <Button type="submit" color="rose">
                  Update Profile
                </Button>
              </CardFooter>
              <DangerDialogWrapped
                type={"account"}
                title={"Are you sure you want to delete your account?"}
                id={user.id}
                open={this.state.open}
                onClose={this.handleClose}
              />
            </Card>
          </GridItem>
          <Button
            style={{ margin: "auto" }}
            color="rose"
            onClick={this.handleClickOpen}
          >
            Remove Account
          </Button>
        </GridContainer>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: (id, token) => dispatch(getUser(id, token)),
    updateUser: (user, id) => dispatch(updateUser(user, id))
  };
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isFetching: state.auth.isFetching,
  text: state.auth.text,
  successMessage: state.auth.successMessage
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(UserProfile))
);
