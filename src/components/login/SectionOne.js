import React from "react";
import GridItem from "../theme/Grid/GridItem.jsx";
import { Typography } from "@material-ui/core";
import Button from "../theme/CustomButtons/Button.jsx";
import collab from "../../assets/img/enivorment.png";

const SectionOne = ({ registerForm }) => {
  return (
    <div style={{ display: "flex" }}>
      <GridItem xs={12} sm={10} md={6} style={{ margin: "auto" }}>
        <Typography style={{ fontSize: "2em", fontWeight: "600" }}>
          [ N A M E ] is a collaboration platform built for every member of your
          team to simplify your workflow!
        </Typography>
        <Typography style={{ fontSize: "18px" }}>
          Invite clients and developers to join your projects, create tickets
          and keep track of your development, plan features and much more!
        </Typography>
        <Button
          color="success"
          style={{
            width: "200px",
            color: "black",
            textTransform: "unset",
            fontSize: "15px"
          }}
          onClick={registerForm}
        >
          Sign Up - it's free!
        </Button>
      </GridItem>
      <GridItem xs={10} sm={10} md={6} style={{ margin: "auto" }}>
        <img src={collab} alt="collab" width="90%" height="auto" />
      </GridItem>
    </div>
  );
};
export default SectionOne;
