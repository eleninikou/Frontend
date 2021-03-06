import React from "react";
import moment from "moment";
// Theme components
import Button from "../theme/CustomButtons/Button.jsx";
import GridItem from "../theme/Grid/GridItem.jsx";
import CardBody from "../theme/Card/CardBody.jsx";
import CardFooter from "../theme/Card/CardFooter.jsx";
import GridContainer from "../theme/Grid/GridContainer.jsx";
// Material UI
import Typography from "@material-ui/core/Typography";


const MilestoneContent = ({ milestone, getEdit, creator }) => {
  
  const showForm = () => { getEdit(true) }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <Typography style={{ color: "grey", marginTop: "25px" }}>
                Title
              </Typography>
              <Typography>{milestone.title}</Typography>
              <Typography style={{ color: "grey", marginTop: "25px" }}>
                Focus
              </Typography>
              <Typography>{milestone.focus ? milestone.focus : "-"}</Typography>
              <Typography style={{ color: "grey", marginTop: "25px" }}>
                Due date
              </Typography>
              <Typography>
                {milestone.due_date
                  ? moment(milestone.due_date).format("YYYY-MM-DD")
                  : "-"}
              </Typography>
              <Typography style={{ color: "grey", marginTop: "25px" }}>
                Project
              </Typography>
              <Typography>{milestone.project.name}</Typography>
            </GridItem>
          </GridContainer>
        </CardBody>
        {creator ? (
          <CardFooter style={{ justifyContent: "flex-end" }}>
            <Button
              color="warning"
              onClick={showForm}
              style={{ float: "right" }}
            >
              Edit Milestone
            </Button>
          </CardFooter>
        ) : null}
      </GridItem>
    </GridContainer>
  );
};

export default MilestoneContent;
