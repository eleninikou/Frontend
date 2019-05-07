import React from "react";
import { Typography } from "@material-ui/core";
import DashboardSpinner from "./DashboardSpinner";

const LoadingSpinner = ({ text }) => {
    return (
    <div style={{ width: "100%", textAlign: 'center', position: 'absolute', margin: 'auto', top: '50%', bottom: '0', left: '0', right: '0' }}>
        <Typography style={{ color: "#D4D4D4", fontSize: '15px' }}>{text}</Typography>
        <DashboardSpinner />
      </div>
    )
}

export default LoadingSpinner;

