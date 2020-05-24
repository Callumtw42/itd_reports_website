import Typography from '@material-ui/core/Typography';
import React , { useEffect } from 'react';
import { useState } from 'react';

import DateField from './date_field';
// import * as _ from './logic';
import { todaysDate, formatDate } from "./logic";
import Div from './style';

interface DateState {
    start: string,
    end: string
}

export default function useDate() {

    // const [startDate, setStartDate] = useState(_.todaysDate());
    // const [endDate, setEndDate] = useState(_.todaysDate());

    const [date, setDate] = useState({ start: todaysDate(), end: todaysDate() })

    function Dates(props: { color?: string, display?: string }
    ) {
        const { color = 'black', display = 'flex' } = props
        // const { start, end } = date
        return (
            <Div className='date' color={color} display={display}>
                <DateField
                    id="startDate"
                    defaultValue={date.start}
                    onChange={(d: string) => setDate({ ...date, start: formatDate(d), end: date.end })}
                />
                <Typography> - </Typography>
                <DateField
                    id="endDate"
                    defaultValue={date.end}
                    onChange={(d: string) => setDate({ ...date, start: date.start, end: formatDate(d) })}
                />
            </Div>
        )
    }

    function Date(props: { color?: string, display?: string }
    ) {
        const { color = 'black', display = "flex" } = props
        // const { start } = date
        
        return (

            <Div color={color} display={display} className='date'>
                <DateField
                    id="startDate"
                    defaultValue={date.start}
                    onChange={(d: string) => setDate({ ...date, start: formatDate(d), end: formatDate(d) })}
                />
            </Div>
        )
    }

    return {
        startDate: date.start,
        endDate: date.end,
        Dates,
        Date
    }

}
