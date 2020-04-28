import React from 'react';
import { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import styled from 'styled-components';
import useDataFunctions from './report/data_functions';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function useSimpleSelect(items) {

    const d = useDataFunctions();

    const classes = useStyles();

    function SimpleSelect(props) {

        const [text, setText] = React.useState(
            items[0]
                ? items[0]['text']
                : 'empty'
        );

        function Items() {
            return items.map((i, index) => {
                return <MenuItem
                    key={index}
                    onMouseDown={
                        () => {
                            setText(i.text);
                            i.callBack();
                        }
                    }>
                    {i.text}
                </MenuItem>
            });
        }

        return (
            <Div color={props.color}>
                <FormControl className={classes.formControl}>
                    <Select
                        value={''}
                        displayEmpty
                        label={text}
                        renderValue={() => { return text }}
                    >
                        {Items()}
                    </Select>
                </FormControl>
            </Div>
        );
    }
    return {
        SimpleSelect: SimpleSelect,
    }
}

const Div = styled.div`

--color: ${props => props.color};
text-align: left;
    
.MuiInputBase-root {
  color: var(--color);
}

.MuiSvgIcon-root {
  fill: var(--color);
}

.MuiInput-underline::before {
  border-bottom: 1px solid var(--color);
}

.makeStyles-selectEmpty-275 {
  margin-top: 0;
}

.makeStyles-formControl-274 {
  margin: 0;
}

.MuiInput-underline::after {
    border-bottom: 1px solid var(--color);
}

.MuiInput-underline:hover:not(.Mui-disabled)::before {

    border-bottom: 2px solid var(--color);
    border-bottom-color: var(--color);
}

.Mui-selected:hover {
  background-color: var(--color);
}

.makeStyles-formControl-274 {
 margin:2px 5px;
}
`;