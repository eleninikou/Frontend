import React from 'react'
import GridItem from "../theme/Grid/GridItem.jsx";
import GridContainer from "../theme/Grid/GridContainer.jsx";
import { Typography } from "@material-ui/core";
import together from "../../assets/img/NS2R7RJK.png";
import sitting from "../../assets/img/girlexplaining.png";
import standing from "../../assets/img/ZvTjn__9.png";

const SectionThree = () => {
    return (
        <GridItem xs={12} sm={12} md={12} style={{ backgroundColor: "#E4E4E4", height: "80vh" }} >
          <GridContainer>
            <GridItem xs={10} sm={10} md={10} style={{ margin: "auto", justifyContent: "center",  marginTop: "10px" }} >
              <GridContainer>
                <GridItem xs={12} sm={12} md={4} style={{ margin: "auto" }}>
                  <Typography style={{ fontSize: "20px", fontWeight: "600" }}>
                    Share ideas and tasks!
                  </Typography>
                  <Typography style={{ fontSize: "18px" }}>
                    Use [ NAME ] to speed up collaboration, communication, and
                    idea exchange. Comment on each other's tickets, upload
                    images and report bugs with ease.
                  </Typography>
                </GridItem>
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
