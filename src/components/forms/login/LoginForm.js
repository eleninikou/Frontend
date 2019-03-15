import React from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import asyncValidate from './asyncValidate'


const validate = values => {
    const errors = {}
    const requiredFields = [
      'email',
      'password',
    ]
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required'
      }
    })
    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address'
    }
    return errors
}


const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    root: {
        flexGrow: 1,
        justifyContent: "center",
        textAlign: "center"
      },
  });


let LoginForm = props => {
  const { handleSubmit, classes } = props

  return (
    <Grid container className={classes.root}>
        <form onSubmit={handleSubmit}>
            <div>
                <TextField 
                    name="email" 
                    type="email"
                    label="Email" 
                />
            </div> 
            <div>
                <TextField 
                    name="password" 
                    type="password"
                    label="Password" />
            </div> 
            <Button type="submit" variant="contained" color="primary" className={classes.button}>Login</Button> 
        </form>
    </Grid >
  )
  
}


LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(LoginForm)