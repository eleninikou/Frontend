import React from 'react'
// Theme components
import Card from "../theme/Card/Card"
import CardBody from '../theme/Card/CardBody'
import GridItem from "../theme/Grid/GridItem.jsx"
import CardIcon from "../theme/Card/CardIcon.jsx"
import CardHeader from "../theme/Card/CardHeader.jsx"
import GridContainer from "../theme/Grid/GridContainer.jsx"
// Material UI components
import { Typography } from '@material-ui/core'
// Icons
import Note from "@material-ui/icons/Note"
import Person from "@material-ui/icons/Person"
import Timeline from "@material-ui/icons/Timeline"
import BugReport from "@material-ui/icons/BugReport"
import LowPriority from "@material-ui/icons/LowPriority"
import ContactMail from "@material-ui/icons/ContactMail"


const AppInfo = () => {
    return (
      <GridContainer style={{height: '60vh'}}> 
        <GridItem xs={12} sm={8} md={8} style={{ margin: 'auto'}}>
          <CardBody>
            <GridContainer > 
              <GridItem xs={12} sm={12} md={4}>
                <Card>
                  <CardHeader>
                    <CardIcon color="info">
                      <ContactMail style={{ color: 'white'}} />
                    </CardIcon>
                  </CardHeader>
                  <CardBody>
                    <Typography>Invite Clients and Developers to join your project!</Typography>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card>
                  <CardHeader>
                    <CardIcon color="rose">
                      <LowPriority style={{ color: 'white'}} />
                    </CardIcon>
                  </CardHeader>
                  <CardBody>
                    <Typography>Prioritize and Organize your work.</Typography>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card>
                  <CardHeader>
                    <CardIcon color="primary">
                      <Note style={{ color: 'white'}} />
                    </CardIcon>
                  </CardHeader>
                  <CardBody>
                    <Typography>Create tickets to keep track of your project development.</Typography>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card>
                  <CardHeader>
                    <CardIcon color="success">
                      <Person style={{ color: 'white'}} />
                    </CardIcon>
                  </CardHeader>
                  <CardBody>
                    <Typography>Assign tickets to your team members and follow their progress.</Typography>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card>
                  <CardHeader>
                    <CardIcon color="warning">
                      <Timeline style={{ color: 'white'}} />
                    </CardIcon>
                  </CardHeader>
                  <CardBody>
                    <Typography>Use milestones to help you plan features and establish release dates.</Typography>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card>
                  <CardHeader>
                    <CardIcon color="danger">
                      <BugReport style={{ color: 'white'}} />
                    </CardIcon>
                  </CardHeader>
                  <CardBody>
                    <Typography>Report bugs and issues with ease!</Typography>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </CardBody>
        </GridItem>
      </GridContainer>
    )
}
export default AppInfo;
