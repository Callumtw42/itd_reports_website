import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useState } from 'react';

import DateField from './date_field';
import * as _ from './logic';
import Div from './style';

export default function useDate() {

    const [startDate, setStartDate] = useState(_.todaysDate());
    const [endDate, setEndDate] = useState(_.todaysDate());

    function Dates(props: { color?: string, display?: string }
    ) {
        const { color = 'black', display = 'flex' } = props
        return (
            <Div className='date' color={color} display={display}>
                <DateField
                    id="startDate"
                    defaultValue={startDate}
                    onChange={(date: string) => {
                        setStartDate(_.formatDate(date));
                    }}
                />
                <Typography> - </Typography>
                <DateField
                    id="endDate"
                    defaultValue={endDate}
                    onChange={(date: string) => setEndDate(_.formatDate(date))}
                />
            </Div>
        )
    }

    function Date(props: { color?: string, display?: string }
    ) {
        setEndDate(startDate)
        const { color = 'black', display = "flex" } = props
        return (

            <Div color={color} display={display} className='date'>
                <DateField
                    id="startDate"
                    defaultValue={startDate}
                    onChange={(date: string) => {
                        setStartDate(_.formatDate(date));
                        setEndDate(_.formatDate(date));
                    }}
                />
            </Div>
        )
    }

    return {
        startDate,
        endDate,
        Dates,
        Date
    }

}
