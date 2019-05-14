import React from "react";
import GridItem from "../theme/Grid/GridItem.jsx";
import { Typography } from "@material-ui/core";
import Button from "../theme/CustomButtons/Button.jsx";
import collab from "../../assets/img/enivorment.png";
import GridContainer from "../theme/Grid/GridContainer.jsx";
import Hidden from "@material-ui/core/Hidden";
import MediaQuery from 'react-responsive';

const SectionOne = ({ registerForm }) => {
  return (
  <GridItem xs={12} sm={11} md={10} style={{ margin: "auto", justifyContent: "center",  marginTop: "150px" }} >
    <GridContainer>
        <GridItem xs={12} sm={10} md={6} style={{ margin: "auto" }}>
        <MediaQuery query="(min-device-width: 960px)" >
          <img src={collab} alt="collab" width="90%" height="auto" />
        </MediaQuery>
        </GridItem>
      <GridItem xs={12} sm={10} md={6} style={{ margin: "auto" }}>
        <Typography style={{ fontSize: "2em", fontWeight: "600", paddingRight: '20px' }}>
          ease is a collaboration platform built for every member of your
          team to simplify your workflow!
        </Typography>
        <Typography style={{ fontSize: "18px" }}>
          Invite clients and developers to join your projects, create tickets
          and keep track of your development, plan features and much more!
        </Typography>
        <Hidden smDown implementation="css">
          <Button
            style={{
              width: "200px",
              color: "black",
              backgroundColor: "rgb(119, 186, 193)",
              textTransform: "unset",
              fontSize: "15px"
            }}
            onClick={registerForm}
          >
            Sign Up - it's free!
          </Button>
        </Hidden>
      </GridItem>
    </GridContainer>
  </GridItem>
  );
};
export default SectionOne;
