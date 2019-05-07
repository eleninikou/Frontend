import React from "react";
import { Typography } from "@material-ui/core";
import LoginSpinner from "./LoginSpinner";

const LoginTextSpinner = ({ text }) => {
    return (
    <div>
        <Typography style={{ color: "#D4D4D4", fontSize: '15px' }}>{text}</Typography>
        <LoginSpinner />
      </div>
    )
}

export default LoginTextSpinner;

