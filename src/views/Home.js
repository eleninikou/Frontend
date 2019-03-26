import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import withStyles from "@material-ui/core/styles/withStyles";
import Footer from "../components/theme/Footer/Footer.jsx";
import Sidebar from "../components/theme/Sidebar/Sidebar.jsx";
import logo from "../assets/img/reactlogo.png";

import routes from "../routes.js";
import dashboardStyle from "../assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import image from "../assets/img/sidebar-2.jpg";
import Project from './Project'
import CreateProject from './CreateProject'
import EditProject from './EditProject'
import CreateTicket from './CreateTicket'
import EditTicket from './EditTicket'
import CreateMilestone from "./CreateMilestone.js";
import Invite from "./Invite.js";

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
        );}
    })}
      <Route exact path='/home/create-milestone' component={CreateMilestone} />
      <Route path='/home/edit-milestone/:id' component={EditTicket} />
      <Route exact path='/home/create-project' component={CreateProject} />
      <Route path='/home/edit-project/:id' component={EditProject} />
      <Route path='/home/show-project/:id' component={Project} />
      <Route exact path='/home/create-ticket' component={CreateTicket} />
      <Route path='/home/edit-ticket/:id' component={EditTicket} />
      <Route path='/home/project-invite/:id' component={Invite} />
      <Route path='/home/show-ticket/:id' component={EditTicket} />

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
      mobileOpen: false
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

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
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
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={routes}
          logoText={""}
          logo={logo}
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">

          {/* <Navbar
            routes={routes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          /> */}

          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : ('')} 
          {this.getRoute() ? <Footer /> : null}
        </div>
      </div>
    );
  }
}

Home.propTypes = { classes: PropTypes.object.isRequired };

export default withStyles(dashboardStyle)(Home);
