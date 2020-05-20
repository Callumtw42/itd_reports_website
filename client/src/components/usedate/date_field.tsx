import 'date-fns';

import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import React from 'react';

import Div from './style';

export default function DateField(props: { defaultValue: ParsableDate, id: string, onChange: (date: string) => void }) {

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
                    onChange={props.onChange as unknown as (date: MaterialUiPickersDate, value: string | null | undefined) => void}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
        </Div>
    )

}
