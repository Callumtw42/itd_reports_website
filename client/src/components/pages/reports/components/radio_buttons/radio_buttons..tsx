import './style.scss';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { ChangeEvent, SetStateAction } from 'react';

export default function RadioButtons(props: { value: string, handleChange: (e: ChangeEvent<HTMLInputElement>) => void }) {

    return (
        <div className= "RadioButtons">
            <FormControl component="fieldset">
                <RadioGroup color="#004064" aria-label="gender" name="gender1" value={props.value} onChange={props.handleChange}>
                    <FormControlLabel color="#004064" value="Sales" control={<Radio />} label="Sales" />
                    <FormControlLabel color="#004064" value="Profit" control={<Radio />} label="Profit" />
                    <FormControlLabel color="#004064" value="Qty" control={<Radio />} label="Quantity" />
                </RadioGroup>
            </FormControl>
        </div>
    );
}

