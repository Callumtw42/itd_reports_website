import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
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
export default function DateField(props) {

    const classes = useStyles();

    return (
        <Div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    value={props.defaultValue}
                    onChange={props.onChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
        </Div>
    )

}

const Div = styled.div`

.MuiFormControl-root{
    padding: 0 10px;
}

.date_field{
    max-width: 50%;
}

.MuiFormControl-marginNormal {
 margin-top: 0px;
 margin-bottom: 0px;
}
  `;

