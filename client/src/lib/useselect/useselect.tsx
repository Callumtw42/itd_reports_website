import './style.scss';

import { Typography } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import React, { HTMLAttributes, useRef } from 'react';
import { ReactNode, useEffect } from 'react';

// import Div from './style';
export default function useSimpleSelect(items: string[], color?: string) {

    const [selected, setSelected] = React.useState(
        items[0]
            ? items[0]
            : 'empty'
    );

    useEffect(() => {
        if (selected === 'empty' && items[0])
            setSelected(items[0])
    }, [items])

    function Items(props: {}) {
        return <>{
            items.map((s, index) => {
                return <MenuItem className = "item"
                    aria-haspopup
                    key={index}
                    onMouseDown={
                        () => {
                            setSelected(s);
                        }
                    }>
                    {s}
                </MenuItem>
            })
        }</>
    }

    function Select(props: HTMLAttributes<HTMLDivElement>) {
        const ref = useRef(null) as any
        return (
            <div className="Select" ref={ref}>
                <div className="head"><div className="text"><Typography >{selected}<ArrowDropDownIcon /></Typography></div>
                    <div >
                        <Paper className="Items" >
                            <Items />
                        </Paper>
                    </div>
                </div>
            </div >
        );
    }

    return {
        selected,
        Select
    }

}