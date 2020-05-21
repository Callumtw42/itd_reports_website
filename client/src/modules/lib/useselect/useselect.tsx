import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import MuiSelect from '@material-ui/core/Select';
import React from 'react';
import { useEffect } from 'react';

import Div from './style';

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

    function Items() {
        return items.map((s, index) => {
            return <MenuItem
                key={index}
                onMouseDown={
                    () => {
                        setSelected(s);
                    }
                }>
                {s}
            </MenuItem>
        });
    }

    function Select() {
        return (
            <Div color={color}>
                <FormControl >
                    <MuiSelect
                        value={''}
                        displayEmpty
                        label={selected}
                        renderValue={() => { return selected }}
                    >
                        {Items()}
                    </MuiSelect>
                </FormControl>
            </Div>
        );
    }

    return {
        selected,
        Select
    }

}