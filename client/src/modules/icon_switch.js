import React, { useState, useEffect } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import PieChartIcon from '@material-ui/icons/PieChart';

export default function useIconSwitch(buttons) {

    const [a, b] = buttons;
    const [icon, setIcon] = useState('a');

    function Icon(props) {

        return icon === 'a'
            ? a.icon
            : b.icon
    }
    function handle(event) {
        // console.log(event.target.accessKey)
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
        return (

            < List >
                <ListItem className='clickable' button accessKey={icon} onClick={handle}>
                    <ListItemIcon><Icon icon={icon} /></ListItemIcon>
                </ListItem>
            </List >
        )
    }

    return {
        IconSwitch
    }

}