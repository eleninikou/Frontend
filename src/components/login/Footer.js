import React from 'react'
import GridItem from "../theme/Grid/GridItem.jsx";
import Button from "../theme/CustomButtons/Button.jsx";
import GridContainer from "../theme/Grid/GridContainer.jsx";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";

const Footer = () => {
    return (
        <GridItem xs={12} sm={12} md={12}
          style={{
            backgroundColor: "#00acc1",
            height: "10vh",
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
            alignItems: "center",
            padding: '0px'
          }} >
          <GridContainer style={{ width: "100%", display: "flex", alignItems: "center" }} >
            {/* <Hidden smDown implementation="css"> */}
              <GridItem xs={12} sm={2} md={2} style={{ justifyContent: 'center' }} >
                {/* <Avatar style={{ backgroundColor: "white" }} /> */}
              </GridItem>
            {/* </Hidden>   */}
            <GridItem xs={12} sm={8} md={8} style={{ textAlign: "center" }}>
              <Typography style={{ fontSize: "12px", color: "white" }}>
                Copyright 2019 NAME. All rights reserved.
              </Typography>
              {/* <Typography style={{ fontSize: "12px", color: "white" }}>
                <a href="https://bracket.gr" style={{ textDecoration: 'none', color: 'white'}}>
                  Bracket <sup>[ ]</sup>
                </a>  
              </Typography> */}
            </GridItem>
            <GridItem xs={12} sm={2} md={2} style={{ display: "flex", justifyContent: 'center', marginTop: '10px' }}>
              <a href="https://www.linkedin.com/in/eleni-nikou" style={{ textDecoration: 'none'}}>
                <Avatar style={{ backgroundColor: "white", marginRight: "15px" }}>
                <i className="fab fa-linkedin-in" style={{ color: 'black'}}></i>
              </Avatar>
              </a>  
              <a href="mailto:eleni.nikou@mail.com" style={{ textDecoration: 'none'}}>
                <Avatar style={{ backgroundColor: "white" }}>
                <i className="fas fa-envelope" style={{ color: 'black'}}></i>
              </Avatar>
              </a>
            </GridItem>
          </GridContainer>
        </GridItem>
    )
}
export default Footer;
