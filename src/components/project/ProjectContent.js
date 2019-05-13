import React from "react";
// Theme components
import Button from "../theme/CustomButtons/Button.jsx";
import CardBody from "../theme/Card/CardBody.jsx";
import GridItem from "../theme/Grid/GridItem.jsx";
import GridContainer from "../theme/Grid/GridContainer.jsx";
// Material UI
import Avatar from "@material-ui/core/Avatar";
//Icons
import AccountCircle from "@material-ui/icons/AccountCircle";
// Material UI components
import Typography from "@material-ui/core/Typography";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

const ProjectContent = ({ project, getEdit, creator, admins, clients, isAdmin }) => {

  const showForm = () => { getEdit(true) }
  
  return (
    <CardBody>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Typography style={{ color: "grey", marginTop: "25px" }}>
            Project name
          </Typography>
          <Typography> {project.name} </Typography>
          <Typography style={{ color: "grey", marginTop: "25px" }}>
            Description
          </Typography>
          <Typography>{project.description}</Typography>

          {clients.length ? (
            <Typography style={{ color: "grey", marginTop: "25px" }}>
              Client
            </Typography>
          ) : null}
          {clients
            ? clients.map(client => {
                return <Typography>{client.user.name}</Typography>;
              })
            : null}
          <Typography style={{ color: "grey", marginTop: "25px" }}>
            Status
          </Typography>
          <Typography> 
            {project.active === 1 ? (
              <FiberManualRecord
                style={{ color: "#4caf50", fontSize: "15px", marginRight: '5px' }}
              />
            ) : (
              <FiberManualRecord
                style={{ color: "#ef5350", fontSize: "15px", marginRight: '5px'}}
              />
            )}
          {project.active ? "Active" : "Inactive"} 
          </Typography>
          <Typography style={{ color: "grey", marginTop: "25px" }}>
            Admin
          </Typography>

          {admins
            ? admins.map(admin => {
                return (
                  <div key={admin.user.id} style={{ display: "flex", alignItems: "center" }}>
                    {admin.user ? (
                      admin.user.avatar ? (
                        <img
                          src={admin.user.avatar}
                          alt="user"
                          style={{
                            display: "block",
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            marginRight: "10px"
                          }}
                        />
                      ) : (
                        <Avatar style={{ width: "30px", height: "30px" }}>
                          <AccountCircle style={{ fontSize: "18px" }} />{" "}
                        </Avatar>
                      )
                    ) : null}
                    <Typography>
                      {admin.user ? admin.user.name : null}{" "}
                    </Typography>
                  </div>
                );
              })
            : null}
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          {creator || isAdmin ? (
            <Button
              color="success"
              onClick={showForm}
              style={{ float: "right" }}
            >
              Edit Project
            </Button>
          ) : null}
        </GridItem>
      </GridContainer>
    </CardBody>
  );
};

export default ProjectContent;
