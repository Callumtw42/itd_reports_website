import './style.scss';

import EventIcon from '@material-ui/icons/Event';
import React, { EventHandler, useEffect } from 'react';
import { useState } from 'react';

import { formatDate, todaysDate } from './logic';

export default function useDate() {

    const [date, setDate] = useState({ start: todaysDate(), end: todaysDate() })

    function Dates(props: {}) {
        return <div className="container">
            <DateField handleChange={(e) => setDate({
                ...date, start: formatDate(e.currentTarget.value), end: date.end
            })} defaultValue={date.start} />
            <div>-</div>
            <DateField handleChange={(e) => setDate({
                ...date, start: date.start, end: formatDate(e.currentTarget.value)
            })} defaultValue={date.end} />
        </div>
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
        Dates,
        // Date
    }

}
