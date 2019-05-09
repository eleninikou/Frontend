import React from 'react'
import GridItem from "../theme/Grid/GridItem.jsx";
import Button from "../theme/CustomButtons/Button.jsx";
import GridContainer from "../theme/Grid/GridContainer.jsx";
import Avatar from "@material-ui/core/Avatar";

const Header = ({ registerForm, loginForm }) => {
    return (
      <GridItem xs={12} sm={12} md={12}
        style={{
          display: "flex",
          position: "fixed",
          backgroundColor: "rgb(119, 186,193)",
          width: "100%",
          height: "82px",
          zIndex: 10,
          padding: '0px'
        }}
      >
      <GridContainer style={{ width: '100%'}}>
        <GridItem xs={3} sm={3} md={3} style={{ width: "auto", display: "flex", alignItems: "center", padding: '0px !important' }}>
          {/* <Avatar style={{ backgroundColor: "white" }} /> */}
          <h1 style={{ marginLeft: "10px", color: "white", fontFamily: 'Roboto', fontSize: '40px' }}>  [ N A M E ] </h1>
        </GridItem>
        <GridItem xs={9} sm={9} md={9} style={{ width: "auto", display: "flex", alignItems: "center", justifyContent: 'flex-end' }}>
              <Button
                onClick={loginForm}
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid white",
                  boxShadow: "none",
                  color: "black",
                  marginRight: '20px',
                  width: '150px',
                  textTransform: 'unset', fontSize: '15px'
                }}
              >
                Log In
              </Button>
              <Button 
              onClick={registerForm} 
              color="success" 
              style={{ 
                color: "black", 
                border: "1px solid rgb(102, 187, 106)", 
                textTransform: 'unset', 
                fontSize: '15px',
                width: '150px',
                }}> Sign Up </Button>
          </GridItem>
        </GridContainer>
      </GridItem>
    )
}
export default Header;
