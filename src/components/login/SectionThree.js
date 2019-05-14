import React from 'react'
import GridItem from "../theme/Grid/GridItem.jsx";
import GridContainer from "../theme/Grid/GridContainer.jsx";
import { Typography } from "@material-ui/core";
import together from "../../assets/img/NS2R7RJK.png";
import sitting from "../../assets/img/girlexplaining.png";
import standing from "../../assets/img/ZvTjn__9.png";
import MediaQuery from 'react-responsive';

const SectionThree = () => {
    return (
        <GridItem xs={12} sm={12} md={12} style={{ backgroundColor: "#E4E4E4", minHeight: "70vh", height: 'auto' }} >
          <GridContainer>
            <GridItem xs={10} sm={10} md={10} style={{ margin: "auto", justifyContent: "center",  marginTop: "10px" }} >
              <GridContainer>
              <MediaQuery query="(max-device-width: 960px)" >
                <div style={{ width: '100%', height: '40px'}}></div>
              </MediaQuery>   
                <GridItem xs={12} sm={12} md={4} style={{ marginTop: "270px" }}>
                  <Typography style={{ fontSize: "1.4em", fontWeight: "600" }}>
                    Share ideas and tasks!
                  </Typography>
                  <Typography style={{ fontSize: "1em" }}>
                    Speed up collaboration, communication, and
                    idea exchange. Comment on each other's tickets, upload
                    images and report bugs with ease.
                  </Typography>
                  <Typography style={{ fontSize: "1em", marginTop: '10px' }}>
                    Speed up collaboration, communication, and
                    idea exchange. Comment on each other's tickets, upload
                    images and report bugs with ease.
                  </Typography>
                </GridItem>
                <MediaQuery query="(max-device-width: 960px)" >
                  <div style={{ width: '100%', height: '40px'}}></div>
                </MediaQuery>  
                <GridItem xs={12} sm={12} md={7} style={{ margin: "auto", position: "relative" }} >
                  <img src={together} alt="collab" width="100%" height="auto" />
                  <img
                    src={sitting}
                    alt="collab"
                    width="55%"
                    height="auto"
                    style={{
                      position: "absolute",
                      right: "0",
                      bottom: "10%",
                      height: "60%",
                      width: "auto"
                    }}
                  />
                  <img
                    src={standing}
                    alt="collab"
                    width="55%"
                    height="auto"
                    style={{
                      position: "absolute",
                      left: "0",
                      bottom: "10%",
                      height: "60%",
                      width: "auto"
                    }}
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
    )
}
export default SectionThree;
