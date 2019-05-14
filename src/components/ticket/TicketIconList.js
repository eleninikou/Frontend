import React from "react";
import moment from "moment";
// Icons
import PersonPin from "@material-ui/icons/PersonPin";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Warning from "@material-ui/icons/Warning";


const TicketIconList = ({ ticket }) => {
  return ticket ? (
    <div>
    <Typography style={{ color: "grey", marginTop: "25px" }}> Assigned user </Typography>
        {ticket.assigned_user ? (
          <div style={{ display: 'flex', alignItems: 'center'}}>
              <img
                src={ticket.assigned_user.avatar}
                alt="user"
                style={{
                  display: "block",
                  width: "30px",
                  height: "30px",
                  marginRight: '10px',
                  borderRadius: '50%'
                }}
                />
              <Typography> {ticket.assigned_user.name} </Typography>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center'}}>
              <PersonPin style={{ fontSize: "18px" }} />
              <Typography> 
                  Not assigned yet
              </Typography>
            </div>
          )} 
      <Typography style={{ color: "grey", marginTop: "25px" }}> Type </Typography>
      <Typography>{ticket.type ? ticket.type.type : null} </Typography>
      <Typography style={{ color: "grey", marginTop: "25px" }}> Due date </Typography>
      <Typography>{ticket.due_date ? moment(ticket.due_date).format("YYYY-MM-DD") : '-' }</Typography>
      <Typography style={{ color: "grey", marginTop: "25px" }}> Status </Typography>
      <Typography>{ticket.status ? ticket.status.status : null} </Typography>
      <Typography style={{ color: "grey", marginTop: "25px" }}> Priority </Typography>
      {ticket.priority === "low" ? (
          <Avatar
            style={{
              backgroundColor: "#FADC08",
              height: "30px",
              width: "30px",
              marginRight: "20px"
            }}
          >
            <Warning style={{ fontSize: "18px" }} />
          </Avatar>
        ) : ticket.priority === "normal" ? (
          <Avatar
            style={{
              backgroundColor: "#4caf50",
              height: "30px",
              width: "30px",
              marginRight: "20px"
            }}
          >
            <Warning style={{ fontSize: "18px" }} />
          </Avatar>
        ) : (
          <Avatar
            style={{
              backgroundColor: "#f44336",
              height: "30px",
              width: "30px",
              marginRight: "20px"
            }}
          >
            <Warning style={{ fontSize: "18px" }} />
          </Avatar>
        )}
    </div>
  ) : null;
};

export default TicketIconList;
