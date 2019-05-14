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
          background: "linear-gradient(60deg, #26c6da, #00acc1)",
          // borderBottom: '1px solid rgba(255,255,255, 0.2)',
          width: "100%",
          height: "80px",
          zIndex: 10,
          padding: '0px'
        }}
      >
      <GridContainer style={{ width: '100%'}}>
        <GridItem xs={3} sm={3} md={3} style={{ width: "auto", display: "flex", padding: '0px !important' }}>
          {/* <Avatar style={{ backgroundColor: "white" }} /> */}
          <a href="/" style={{ textDecoration: 'none'}}>
            <h1 style={{ margin: "0px", color: "white", fontFamily: 'Roboto', fontSize: '52px', marginTop: '15px' }}>  e a s e . </h1>
          </a>
        </GridItem>
        <GridItem xs={9} sm={9} md={9} style={{ textAlign: 'right', }}>
              <Button
                onClick={loginForm}
                style={{
                  backgroundColor: "rgba(255,255,255, 0.2)",
                  border: " 1px solid rgba(255,255,255, 0.2)",
                  boxShadow: "none",
                  color: "#042C54",
                  marginRight: '10px',
                  width: '170px',
                  textTransform: 'unset', 
                  fontSize: '15px',
                  marginTop: '18px'
                }}
              >
                Log In
              </Button>
              <Button 
              onClick={registerForm} 
              style={{ 
                color: "white", 
                backgroundColor: "#042C54",
                textTransform: 'unset', 
                border: "1px solid #042C54",
                fontSize: '15px',
                width: '170px',
                marginTop: '18px'
                }}> Sign Up </Button>
          </GridItem>
        </GridContainer>
      </GridItem>
    )
}
export default Header;
