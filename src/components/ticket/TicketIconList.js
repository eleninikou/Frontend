import React from "react";
import moment from "moment";
// Icons
import PersonPin from "@material-ui/icons/PersonPin";
import Typography from "@material-ui/core/Typography";


const TicketIconList = ({ ticket, classes }) => {
  return ticket ? (
    <div>
    <Typography style={{ color: "grey", marginTop: "25px" }}> Assigned user </Typography>
    <Typography> 
        {ticket.assigned_user ? (
            <div>
              <img
                src={ticket.assigned_user.avatar}
                alt="user"
                style={{
                  display: "block",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%"
                }}
              />
              ticket.assigned_user.name
            </div>
          ) : (
            <div>
              <PersonPin style={{ fontSize: "18px" }} />
              Not assigned yet
            </div>
          )} </Typography>
      <Typography style={{ color: "grey", marginTop: "25px" }}> Type </Typography>
      <Typography>{ticket.type ? ticket.type.type : null} </Typography>
      <Typography style={{ color: "grey", marginTop: "25px" }}> Due date </Typography>
      <Typography>{ticket.due_date ? moment(ticket.due_date).format("YYYY-MM-DD") : '-' }</Typography>
      <Typography style={{ color: "grey", marginTop: "25px" }}> Status </Typography>
      <Typography>{ticket.status ? ticket.status.status : null} </Typography>
      <Typography style={{ color: "grey", marginTop: "25px" }}> Priority </Typography>
      <Typography> {ticket.priority ? ticket.priority : null} </Typography>

    </div>
  ) : null;
};

export default TicketIconList;
