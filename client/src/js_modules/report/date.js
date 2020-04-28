import DateField from "../date_field"
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import React from "react";
import { useState } from 'react';
export default function useDate() {

    const [startDate, setStartDate] = useState(todaysDate());
    const [endDate, setEndDate] = useState(todaysDate());

    function todaysDate() {
        var today = new Date();
        var date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + (today.getDate())).slice(-2);
        return date;
    }

    function formatDate(date) {
        let d = new Date(date);
        let formatted = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + (d.getDate())).slice(-2)
        return formatted;
    }

    function Dates(props) {
        const { color = 'black' } = props
        return (
            <Div className='date' color={color}>
                <DateField
                    id="startDate"
                    defaultValue={startDate}
                    onChange={(date) => {
                        setStartDate(formatDate(date));
                    }}
                />
                <Typography> - </Typography>
                <DateField
                    id="endDate"
                    defaultValue={endDate}
                    onChange={(date) => setEndDate(formatDate(date))}
                />
            </Div>
        )
    }

    function OneDate(props) {
        const { color = 'black' } = props
        return (

            <Div color={color} className='date'>
                <DateField
                    id="startDate"
                    defaultValue={startDate}
                    onChange={(date) => {
                        setStartDate(formatDate(date));
                        setEndDate(formatDate(date));
                    }}
                />
            </Div>

        )
    }

    return {
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        todaysDate,
        Dates,
        OneDate

    }

}

const Div = styled.div`

--color: ${props => props.color};
text-align: left;
    
.MuiInputBase-root {
  color: var(--color);
 width:  10em;
}

.MuiSvgIcon-root {
  fill: var(--color);
}

.MuiInput-underline::before {
  border-bottom: 1px solid var(--color);
}

.makeStyles-selectEmpty-275 {
  margin-top: 0;
}

.makeStyles-formControl-274 {
  margin: 0;
}

.MuiInput-underline::after {
    border-bottom: 1px solid var(--color);
}

.MuiInput-underline:hover:not(.Mui-disabled)::before {

    border-bottom: 2px solid var(--color);
    border-bottom-color: var(--color);
}

.Mui-selected:hover {
  background-color: var(--color);
}

.makeStyles-formControl-274 {
 margin:2px 5px;
}
`