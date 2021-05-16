import './style.scss';

import { Typography } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import React, { HTMLAttributes, useRef } from 'react';
import { ReactNode, useEffect } from 'react';
import { Dropdown } from "react-bootstrap"

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
        return (<>{items.map((item, index) =>
            <Dropdown.Item
                key={index}
                onMouseDown={() => setSelected(item)}
            >{item}</Dropdown.Item>

        )}
            {/* <Dropdown.Item >Action</Dropdown.Item>
            <Dropdown.Item >Another action</Dropdown.Item>
            <Dropdown.Item >Something else</Dropdown.Item> */}
        </>)
    }

    function Select(props: HTMLAttributes<HTMLDivElement>) {
        return (
            <div>

                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                       {selected} 
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Items />
                    </Dropdown.Menu>
                </Dropdown>
                {/* <div className="head">
                    <div className="text">
                        <Typography >
                            {selected}
                            <ArrowDropDownIcon />
                        </Typography>
                    </div>
                    <div >
                        <Paper className="Items" >
                            <Items />
                        </Paper>
                    </div>
                </div> */}
            </div >
        );
    }

    return {
        selected,
        Select
    }

}