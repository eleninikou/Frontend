import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// Components
import Button from "../components/theme/CustomButtons/Button.jsx";
import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import { Typography } from "@material-ui/core";

import collab from "../assets/img/enivorment.png";

class NotFoundPage extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() { this.props.history.goBack()}

  render() {
    return (
      <GridContainer style={{ height: "100vh" }}>
        <GridItem xs={10} sm={10} md={6} style={{ margin: "auto" }}>
            <img
              src={collab}
              alt="collab"
              width="100%"
              height="auto"
            />
         </GridItem>

        <GridItem xs={10} sm={10} md={6} style={{ margin: "auto" }}>
            <Typography
              style={{
                color: "black",
                fontSize: "55px",
              }}
            >
              Got lost?
            </Typography>
            <Button
              color="success"
              onClick={this.goBack}
            >
              Return
            </Button>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withRouter(NotFoundPage);
