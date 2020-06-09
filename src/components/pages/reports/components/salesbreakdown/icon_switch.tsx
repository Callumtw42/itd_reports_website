import React, { useState, useEffect, HTMLAttributes } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import PieChartIcon from '@material-ui/icons/PieChart';
import { PropTypes } from '@material-ui/core';

export default function useIconSwitch(buttons: { icon: React.ReactNode, callBack: () => any }[]) {

    const [a, b] = buttons;
    const [icon, setIcon] = useState('a');

    function handle() {
        if (icon === 'a') {
            setIcon('b');
            a.callBack();
        }
        else {
            setIcon('a');
            b.callBack();
        }
    }

    function IconSwitch() {
        return <button className = "IconSwitch" onClick={handle}>{icon === 'a' ? a.icon : b.icon}</button>
    }

    return {
        IconSwitch
    }

}