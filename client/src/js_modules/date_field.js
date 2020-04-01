
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import styled from "styled-components/macro";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const Div = styled.div`
  .MuiInputBase-root{
    font-size: 48px;
    min-width: 300px;
  }
  
  .MuiFormControl-root{
    min-width: 300px;
  }

  .MuiFormLabel-root{
    font-size: 32px;
  }
  `;

export default function DateField(props) {

    const classes = useStyles();

    return (
        <Div>
            <TextField
                id={props.id}
                label={props.label}
                type='date'
                defaultValue={props.defaultValue}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                  }}
                // value={endDate}
                onChange={props.onChange}
            />
        </Div>
    )

}