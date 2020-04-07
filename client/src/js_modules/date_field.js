
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import styled from "styled-components/macro";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },

}));

const Div = styled.div`

.MuiFormControl-root{
    padding: 0 10px;
}

.date_field{
    max-width: 50%;
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