import React from 'react'
import GridItem from "../theme/Grid/GridItem.jsx";
import Card from "../theme/Card/Card";
import CardHeader from "../theme/Card/CardHeader.jsx";
import LoginForm from "../forms/login/LoginForm";
import RegisterForm from "../forms/register/RegisterForm";
import { Typography } from "@material-ui/core";
import CardIcon from "../theme/Card/CardIcon.jsx"
import ErrorOutline from "@material-ui/icons/ErrorOutline"
import CardBody from '../theme/Card/CardBody.jsx';

const InvitationFormDisplay = ({ invitedUserEmail, existingUser, classes, display, invitation, redirect, isFetching }) => {
    return (
        invitedUserEmail ? (
        <GridItem xs={10} sm={3} md={3} style={{ position: "fixed", right: "17px", top: "90px",  zIndex: 10 }} >
            <Card style={{ minWidth: '312px', marginRight: '10px', paddingBottom: '50px'}}>
              <CardHeader color="success" style={{ marginBottom: '20px'}}>
                <h4 className={classes.cardTitleWhite}> Fill in to accept the invitation! </h4>
              </CardHeader>
                { existingUser ? 
                <LoginForm email={invitedUserEmail} /> : 
                <RegisterForm email={invitedUserEmail} redirect={redirect} />}
            </Card>
        </GridItem>
        ) : display ? null 
        : invitation && !isFetching ? (
          <GridItem xs={10} sm={3} md={3} style={{ position: "fixed", right: "17px", top: "90px",  zIndex: 10 }} >
            <Card style={{ minWidth: '312px', marginRight: '10px'}}>
            <CardHeader >
              <CardIcon color="danger">
                <ErrorOutline style={{ color: 'white'}} />
              </CardIcon>
            </CardHeader>
              <CardBody>
                <Typography> It looks like your invitation allready has been used. </Typography>
                <Typography> You can still login to start working on your own projects! </Typography>
              </CardBody>
            </Card>
          </GridItem>
        ) : null
    )
}
export default InvitationFormDisplay;
