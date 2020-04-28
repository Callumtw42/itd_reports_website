
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import useIconSwitch from './icon_switch';

export default function HeaderBar(props) {

    return (<Div><AppBar >{props.children}</AppBar></Div>)

}

const Div = styled.div`

.MuiList-root {
    margin: 0 20px 0px 0px;
}

.MuiList-padding {
 margin-left: auto;
}


.MuiPaper-root{
    background-color: #004064;
    flex-direction: row;
    justify-content: left;
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