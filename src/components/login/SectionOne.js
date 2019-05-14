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
  <GridItem xs={12} sm={11} md={10} style={{ margin: "auto", justifyContent: "center"}} >
    <GridContainer>
        <MediaQuery query="(min-device-width: 960px)" >
          <GridItem xs={12} sm={10} md={6} style={{ margin: "auto", marginTop: '150px' }}>
            <img src={collab} alt="collab" width="90%" height="auto" />
          </GridItem>
          <GridItem xs={12} sm={10} md={6} style={{ margin: "auto", marginTop: '260px' }}>
            <Typography style={{ fontSize: "2em", fontWeight: "600", paddingRight: '20px', color: 'white', lineHeight: 'unset' }}>
              Ease is a collaboration platform built for every member of your
              team to simplify your workflow.
            </Typography>
            <Typography style={{ fontSize: "18px", marginTop: '7px', color: 'white' }}>
              Invite clients and developers to join your projects, create tickets
              and keep track of your development, plan features and much more!
            </Typography>
            <Hidden smDown implementation="css">
              <Button
                style={{
                  width: "200px",
                  color: "white",
                  backgroundColor: "#042C54",
                  textTransform: "unset",
                  fontSize: "15px",
                  marginTop: '35px'
                }}
                onClick={registerForm}
              >
                Sign Up - it's free
              </Button>
            </Hidden>
          </GridItem>
        </MediaQuery>
        <MediaQuery query="(max-device-width: 960px)" >
        <GridItem xs={12} sm={10} md={6} style={{ margin: "auto" }}>
            <Typography style={{ fontSize: "2em", fontWeight: "600", paddingRight: '20px', color: 'white', lineHeight: 'unset', marginTop: '70px'  }}>
              Ease is a collaboration platform built for every member of your
              team to simplify your workflow.
            </Typography>
            <Typography style={{ fontSize: "18px", marginTop: '7px', color: 'white' }}>
              Invite clients and developers to join your projects, create tickets
              and keep track of your development, plan features and much more!
            </Typography>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} style={{ margin: "auto", marginTop:"50px" }}>
            <img src={collab} alt="collab" width="90%" height="auto" />
          </GridItem>
        </MediaQuery>
    </GridContainer>
  </GridItem>
  );
};
export default SectionOne;
