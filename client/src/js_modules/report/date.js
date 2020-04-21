import DateField from "../date_field"
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

    function Dates() {
        return (
            <div className='date'>
                <DateField
                    id="startDate"
                    label="Start Date"
                    defaultValue={startDate}
                    onChange={(event) => {
                        setStartDate(event.target.value);
                    }}
                />
                <DateField
                    id="endDate"
                    label="End Date"
                    defaultValue={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                />
            </div>
        )
    }

    function OneDate() {
        return (
            <div className='date'>
                <DateField
                    id="startDate"
                    label="Date"
                    defaultValue={startDate}
                    onChange={(event) => {
                        setStartDate(event.target.value);
                        setEndDate(event.target.value);
                    }}
                />
            </div>
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