import React from 'react'
import GridItem from "../theme/Grid/GridItem.jsx";
import GridContainer from "../theme/Grid/GridContainer.jsx";
import { Typography } from "@material-ui/core";
import InfoIcons from "./InfoIcons";
import InfoIconsMobile from "./InfoIconsMobile";
import MediaQuery from 'react-responsive';

const SectionTwo = () => {
    return (
        <GridItem xs={12} sm={10} md={10} style={{ margin: "auto", display: 'flex', minHeight: '70vh', height: 'auto'}} >
          <GridContainer>
            <MediaQuery query="(max-device-width: 960px)" >
              <div style={{ width: '100%', height: '40px'}}></div>
            </MediaQuery>    
            <GridItem xs={12} sm={10} md={3} style={{ margin: "auto" }}>
              <Typography style={{ fontSize: "22px", fontWeight: "600" }}>
                Built for Developers
              </Typography>
              <Typography style={{ fontSize: "22px", fontWeight: "600" }}>
                and Clients.
              </Typography>
              <div style={{ width: "30%", height: "10px", backgroundColor: "rgb(209, 0, 83)" }} />
            </GridItem>
            <GridItem xs={12} sm={10} md={9} style={{ margin: "auto" }}>
              <MediaQuery query="(min-device-width: 960px)" >
                <InfoIcons />
              </MediaQuery>    
              <MediaQuery query="(max-device-width: 960px)" >
                <InfoIconsMobile />
              </MediaQuery>    
            </GridItem>
          </GridContainer>
        </GridItem>
    )
}
export default SectionTwo;
