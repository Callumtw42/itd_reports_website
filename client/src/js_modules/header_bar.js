
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export default function HeaderBar(props) {

    function header() {
        if (typeof props.header === 'string')
            return <Typography className='text' variant="h6">{props.header}</Typography>
        else return (
            <div>
                <Typography className='text' variant="h6">{props.header.row1 + ' - ' + props.header.row2}</Typography>
            </div>
        )
    }

    return (<Div><AppBar>{header()}</AppBar></Div>)

}

const Div = styled.div`

.MuiPaper-root{
    background-color: #004064;
    flex-direction: row;
    position: relative;
    z-index: 0;

}   

.MuiToolbar-root{
    padding: 0;
}

h6{
    padding: 5px;
    font-size: 1em;
}

    @media (max-width:64em){
    .MuiPaper-root{
    display: none;
    } 
}
`;