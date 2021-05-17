import Typography from '@material-ui/core/Typography';
import React, { SetStateAction } from 'react';
import * as R from "rambda"
import * as d from '../datafns';

export interface EnhancedTableHeadProps {
    order: false | "desc" | "asc" | undefined,
    orderBy: string,
    onRequestSort: (event: React.MouseEvent, property: string) => void,
    data: d.obj[],
    rowCount: number
    className?: string
}

export interface HeadCell {
    id: string,
    numeric: boolean,
    disablePadding: false,
    label: string
}

export interface Classes {
    root?: any
    hilight?: any
    visuallyHidden?: any
}

export interface EnhancedTableProps {
    sortCallback?: React.Dispatch<SetStateAction<any>>
    bufferCallback?: (inc) => void
    initOrder?: false | "asc" | "desc"
    data: d.obj[]
}

export interface EmptyMessageProps {
    data: d.obj[]
}

export function sortByProperty(property: string, order: string) {
    let ord = (order === 'asc') ? -1 : 1;
    return function (a: d.obj, b: d.obj) {
        if (R.is(Object, a[property])) {
            const va = a[property]["value"]
            const vb = b[property]["value"]
            if (va > vb)
                return ord;
            else if (va < vb)
                return -ord;
            return 0;
        }
        else {
            if (a[property] > b[property])
                return ord;
            else if (a[property] < b[property])
                return -ord;

            return 0;
        }
    }
}

export function EmptyMessage(props: EmptyMessageProps) {
    return d.notEmpty(props.data)
        ? <></>
        : <div className='emptyMessage'><Typography >Empty</Typography></div>
}

