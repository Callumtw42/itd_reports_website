import React, { useState, useEffect, HTMLAttributes, ReactComponentElement, Component } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import PieChartIcon from '@material-ui/icons/PieChart';
import { PropTypes } from '@material-ui/core';

interface button { icon: any, value: string }

export default function useIconSwitch([...buttons]: button[]) {
    // const [icon, setIcon] = useState('a');
    const [index, setIndex] = useState(0);
    const [iconValue, setIconValue] = useState(buttons[0]["value"])

    function handle() {
        setIndex(() => {
            const inc = (index + 1) % buttons.length;
            setIconValue(buttons[inc]["value"]);
            return inc;
        })
    }

    function IconSwitch() {
        return <button className="IconSwitch" onClick={handle}>{buttons[index]["icon"]}</button>
    }

    return {
        IconSwitch,
        iconValue
    }

}