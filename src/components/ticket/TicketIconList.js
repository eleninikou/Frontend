import React from "react";
import moment from "moment";

// Material UI
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

// Icons
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import PersonPin from "@material-ui/icons/PersonPin";
import LinearScale from "@material-ui/icons/LinearScale";

const TicketIconList = ({ ticket, classes }) => {
  return ticket ? (
    <List className="my-ticket-list">
      <ListItem>
        <ListItemAvatar>
          <Tooltip
            id="tooltip-top-start"
            title="Assigned user"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <Avatar
              style={{
                backgroundColor: "#f44336",
                width: "30px",
                height: "30px"
              }}
            >
              {ticket.assigned_user ? (
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
              ) : (
                <PersonPin style={{ fontSize: "18px" }} />
              )}
            </Avatar>
          </Tooltip>
        </ListItemAvatar>
        <ListItemText
          primary={
            ticket.assigned_user
              ? "Assigned to: " + ticket.assigned_user.name
              : null
          }
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Tooltip
            id="tooltip-top-start"
            title="Due date"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <Avatar
              style={{
                backgroundColor: "#041031",
                width: "30px",
                height: "30px"
              }}
            >
              <DateRange style={{ fontSize: "18px" }} />
            </Avatar>
          </Tooltip>
        </ListItemAvatar>
        <ListItemText
          primary={"Due date: " + moment(ticket.due_date).format("YYYY-MM-DD")}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Tooltip
            id="tooltip-top-start"
            title="Status"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <Avatar
              style={{
                backgroundColor: "#4caf50",
                width: "30px",
                height: "30px"
              }}
            >
              <LinearScale style={{ fontSize: "18px" }} />
            </Avatar>
          </Tooltip>
        </ListItemAvatar>
        <ListItemText
          primary={ticket.status ? "Status: " + ticket.status.status : null}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Tooltip
            id="tooltip-top-start"
            title="Priority"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            {ticket.priority == "low" ? (
              <Avatar
                style={{
                  backgroundColor: "#FADC08",
                  width: "30px",
                  height: "30px"
                }}
              >
                <Warning style={{ fontSize: "18px" }} />
              </Avatar>
            ) : ticket.priority == "normal" ? (
              <Avatar
                style={{
                  backgroundColor: "#4caf50",
                  width: "30px",
                  height: "30px"
                }}
              >
                <Warning style={{ fontSize: "18px" }} />
              </Avatar>
            ) : (
              <Avatar
                style={{
                  backgroundColor: "#f44336",
                  width: "30px",
                  height: "30px"
                }}
              >
                <Warning style={{ fontSize: "18px" }} />
              </Avatar>
            )}
          </Tooltip>
        </ListItemAvatar>
        <ListItemText primary={"Priority: " + ticket.priority} />
      </ListItem>
    </List>
  ) : null;
};

export default TicketIconList;
