import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import styled from 'styled-components';

export default function RadioButtons(props) {

    return (
        <Div>
            <FormControl component="fieldset">
                {/* <FormLabel component="legend">Data</FormLabel> */}
                <RadioGroup color="#004064" aria-label="gender" name="gender1" value={props.value} onChange={props.handleChange}>
                    <FormControlLabel color="#004064" value="Sales" control={<Radio />} label="Sales" />
                    <FormControlLabel color="#004064" value="Profit" control={<Radio />} label="Profit" />
                    <FormControlLabel color="#004064" value="Quantity" control={<Radio />} label="Quantity" />
                </RadioGroup>
            </FormControl>
        </Div>
    );
}


const Div = styled.div`
.MuiFormGroup-root{
    flex-direction: row;
    margin-left: 1em;
}

.MuiTypography-root{
    font-size: 1em;
}

.MuiFormControlLabel-root{
    /* max-width: 4rem; */
}

.MuiSvgIcon-root{
    max-width: 0.8rem;
    max-height: 0.8rem;
}

.MuiRadio-colorSecondary.Mui-checked {
    color: #004064;
}

.XEifR .MuiRadio-colorSecondary.Mui-checked {
    color: #004064;
}

@media (max-width:64em){

    .MuiSvgIcon-root{
    max-width: 4rem;
    max-height: 4rem;
}

.MuiTypography-root{
    font-size: 2em;
}

}

`;