import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { getUser } from "../redux/actions/auth/Actions";
// Theme componets
import Footer from "../components/theme/Footer/Footer.jsx";
import Sidebar from "../components/theme/Sidebar/Sidebar.jsx";
import Navbar from "../components/theme/Navbars/Navbar.jsx";
// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography } from "@material-ui/core";
import MediaQuery from 'react-responsive';
import ScreenRotation from "@material-ui/icons/ScreenRotation"


// Views
import {
  CreateProject,
  Project,
  CreateTicket,
  Ticket,
  Milestone,
  CreateMilestone,
  Invite
} from "../views";
// Styles
import dashboardStyle from "../assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "../assets/css/main.css";

import Cookies from "universal-cookie";
import image from '../assets/img/dot.png'
import routes from "../routes.js";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/home") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
    })}
    <Route exact path="/home/create-milestone" component={CreateMilestone} />
    <Route path="/home/milestone/:id" component={Milestone} />
    <Route exact path="/home/create-project" component={CreateProject} />
    <Route path="/home/project/:id" component={Project} />
    <Route exact path="/home/create-ticket" component={CreateTicket} />
    <Route path="/home/ticket/:id" component={Ticket} />
    <Route path="/home/project-invite/:id" component={Invite} />
  </Switch>
);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: image,
      color: "blue",
      hasImage: true,
      fixedClasses: "dropdown show",
      mobileOpen: false,
      user: '',
      orientation: ''
    };
  }

  handleImageClick = image => {
    this.setState({ image: image });
  };

  handleColorClick = color => {
    this.setState({ color: color });
  };

  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  getRoute() {
    return this.props.location.pathname;
  }

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };

  componentDidMount = () => {
    window.addEventListener("resize", this.resizeFunction);

    const cookies = new Cookies();
    var token = cookies.get("token");
    if (!token) {
      this.props.history.push("/");
    }
    var user = cookies.get("user");
    this.props.getUser(user, token).then(res => {
      if(res.user) {
        this.setState({ user: res.user })
      }
    });
  };

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }


  render() {
    const { classes, isFetching, ...rest } = this.props;
    const { user } = this.state;


    return (
      user ? (
      <div className={classes.wrapper}>
        <Sidebar
          routes={routes}
          logoText={user ? user.name : ""}
          image={this.state.image}
          logo={this.props.user.avatar}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Navbar
            routes={routes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          <MediaQuery query="(max-device-width: 1224px)" >
            <MediaQuery query="(orientation: portrait)">
            <div style={{ width: '100%', height: 'auto', textAlign: 'center', position: 'fixed', marginTop: '10px', zIndex: '10'}}>
              <Typography style={{ color: "#D4D4D4", fontSize: '15px' }}>For the best experience, </Typography>
              <Typography style={{ color: "#D4D4D4", fontSize: '15px' }}> flip device to landscape mode </Typography>
              <ScreenRotation style={{ marginTop: '5px', color: "#D4D4D4" }} />
            </div>
            </MediaQuery>
          </MediaQuery>

          {this.getRoute() ? (
            <div className={classes.content} style={{ marginTop: "20px" }}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            ""
          )}
          {this.getRoute() ? <Footer /> : null}
        </div>
    </div>
    ) : (
      <div style={{ width: "100%", textAlign: 'center', position: 'absolute', margin: 'auto', top: '50%', bottom: '0', left: '0', right: '0' }}>
      <Typography style={{ color: "#D4D4D4", fontSize: '15px' }}>Loading...</Typography>
    </div>
    )
    )
  }
}

Home.propTypes = { classes: PropTypes.object.isRequired };

const mapDispatchToProps = dispatch => {
  return { getUser: (id, token) => dispatch(getUser(id, token)) };
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isFetching: state.auth.isFetching
});

export default withRouter( connect( mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Home)));
