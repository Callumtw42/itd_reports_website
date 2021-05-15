import './style.scss';

import EventIcon from '@material-ui/icons/Event';
import React, { EventHandler, useEffect } from 'react';
import { useState } from 'react';
import { formatDate, todaysDate } from './logic';
import useSelect from "../useselect/useselect"
import * as u from "../../utils"

export default function useDate() {

    const [date, setDate] = useState({ start: "2020-03-21", end: "2020-03-28" })
    const { Select, selected } = useSelect(["Day", "Week", "Month", "Quarter", "Year"]);

    const { start, end } = date;
    useEffect(() => {
        switch (selected) {
            case "Day": {
                setDate({ start: "2020-03-21", end: "2020-03-21" })
                break;
            }
            case "Week": {
                setDate({ start: start, end: u.addToDate(start, 7) })
                break;
            }
            case "Month": {
                setDate({ start: start, end: u.addToDate(start, 31) });
                break;
            }
            case "Quarter": {
                setDate({ start: start, end: u.addToDate(start, 31 * 3) });
                break;
            }
            case "Year": {
                setDate({ start: start, end: u.addToDate(start, 365) });
                break;
            }
        }
    }, [selected])

    function Dates(props: {}) {
        return <div className="Dates">
            <DateField handleChange={(e) => setDate({
                ...date, start: formatDate(e.currentTarget.value), end: date.end
            })} defaultValue={date.start} />
            <div>-</div>
            <DateField handleChange={(e) => setDate({
                ...date, start: date.start, end: formatDate(e.currentTarget.value)
            })} defaultValue={date.end} />
        </div>
    }

    function DateRange() {
        return (
            <div className="Dates">
                <DateField handleChange={(e) => setDate({
                    ...date, start: formatDate(e.currentTarget.value), end: end
                })} defaultValue={start} />
                <Select />
            </div>
        )
    }

    function Date(props: {}) {
        return <DateField handleChange={(e) => setDate({
            ...date, start: formatDate(e.currentTarget.value), end: formatDate(e.currentTarget.value)
        })} defaultValue={date.end} />
    }

    function DateField(props: { handleChange: (e: React.FormEvent<HTMLInputElement>) => void, defaultValue: string }) {
        return <div className="datefield"><input type="date"
            required
            defaultValue={props.defaultValue}
            onChange={props.handleChange}

        />
            <EventIcon className="icon" />
        </div>
    }

    return {
        startDate: date.start,
        endDate: date.end,
        dateRange: selected,
        Dates,
        Date,
        DateRange
    }

}
