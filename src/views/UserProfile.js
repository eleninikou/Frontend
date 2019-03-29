import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "../components/theme/Grid/GridItem.jsx";
import GridContainer from "../components/theme/Grid/GridContainer.jsx";
import CustomInput from "../components/theme/CustomInput/CustomInput.jsx";
import Button from "../components/theme/CustomButtons/Button.jsx";
import Card from "../components/theme/Card/Card.jsx";
import CardHeader from "../components/theme/Card/CardHeader.jsx";
import CardBody from "../components/theme/Card/CardBody.jsx";
import CardFooter from "../components/theme/Card/CardFooter.jsx";


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

function UserProfile(props) {
  const { classes } = props;
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Name"
                    id="name"
                    className="my-input"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    className="my-input"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Password"
                    id="password"
                    className="my-input"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="danger">Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default withStyles(styles)(UserProfile);
