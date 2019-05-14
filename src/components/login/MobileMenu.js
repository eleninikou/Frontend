import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
import headerStyle from "../../assets/jss/material-dashboard-react/components/headerStyle.jsx";

function MobileMenu({ ...props }) {

    const { classes, color } = props;
    const appBarClasses = classNames({
      [" " + classes[color]]: color
    });

  return (
    <AppBar className={classes.appBar + appBarClasses} >
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', zIndex: '20'}}>
          <Hidden mdUp implementation="css">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={props.handleDrawerToggle}
              >
              <Menu style={{fontSize: '55px', color: 'black'}} />
            </IconButton>
          </Hidden>
      </div>
    </AppBar>
  );
}

MobileMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(headerStyle)(MobileMenu);
