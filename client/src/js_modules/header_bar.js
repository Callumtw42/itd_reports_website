
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export default function HeaderBar(props) {

    function Header() {
        if (typeof props.header === 'string')
            return <Typography className='text' variant="h6">{props.header}</Typography>
        else return (
            <div>
                <Typography className='text' variant="h6">{props.header.row1 + ' - ' + props.header.row2}</Typography>
            </div>
        )
    }

    function Menu() {
        return props.menu ? props.menu : <></>;
    }

    return (<Div><AppBar ><Header className='header' /><Menu className='menu'/></AppBar></Div>)

}

const Div = styled.div`

.MuiList-root {
    margin: 0 20px 0px 0px;
}

.MuiPaper-root{
    background-color: #004064;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    z-index: 0;

}   

.MuiListItemIcon-root{
    color: white;
}

.clickable{
    width: 32px;
}

.MuiToolbar-root{
    padding: 0;
}

h6{
    padding: 5px;
    font-size: 1em;
}

.MuiList-padding {
  padding-top: 0;
  padding-bottom: 0;
}

.MuiList-padding {
  padding-top: 0;
  padding-bottom: 0;
}

.MuiListItem-root {
  padding-top: 5px;
  padding-bottom: 5px;
}

.MuiListItem-gutters {
    padding-left: 0;
    padding-right: 0;
}

    @media (max-width:64em){
    .MuiPaper-root{
    display: none;
    } 
}
`;