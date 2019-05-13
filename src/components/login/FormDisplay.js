import React from 'react'
import GridItem from "../theme/Grid/GridItem.jsx";
import Card from "../theme/Card/Card";
import CardIcon from "../theme/Card/CardIcon.jsx"
import CardHeader from "../theme/Card/CardHeader.jsx";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
// Icons
import HowToReg from "@material-ui/icons/HowToReg"
import AccountCircle from "@material-ui/icons/AccountCircle"

import LoginForm from "../forms/login/LoginForm";
import RegisterForm from "../forms/register/RegisterForm";

const FormDisplay = ({ register, handleClickOpen, classes }) => {
    return (
        <GridItem xs={10} sm={3} md={3} style={{ position: "fixed", right: '2px', top: "55px",  zIndex: 10 }} >
            <Card style={{ minWidth: '312px', marginRight: '10px'}}>
                <CardHeader style={{ display: 'flex', justifyContent: 'space-between'}}>
                <CardIcon color="success">
                    {register ?
                    <HowToReg style={{ color: 'white'}} />
                    : <AccountCircle style={{ color: 'white'}} /> }
                </CardIcon>
                <div style={{ width: 'auto', display: 'flex', alignSelf: 'flex-end'}}>
                  <Tooltip
                    id="tooltip-top-start"
                    title="Close"
                    placement="top"
                    onClick={handleClickOpen}
                    classes={{ tooltip: classes.tooltip }} >
                    <IconButton aria-label="Close" className={classes.tableActionButton} >
                      <Close style={{ color: 'black' }} className={ classes.tableActionButtonIcon + classes.close }/>
                    </IconButton>
                  </Tooltip>
                </div>
          </CardHeader>
          {register ? <RegisterForm /> : <LoginForm />}
        </Card>
      </GridItem>

    )
}
export default FormDisplay;
