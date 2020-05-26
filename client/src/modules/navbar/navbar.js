import Menu from './menu'
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import useStyles from './style'


export default function NavBar(props) {
  const classes = useStyles();

  function handleIconClick() {
    props.setSideBar(true);
  }

  function Header() {
    if (typeof props.header === 'string')
      return <Typography variant="h6" style={{ fontSize: 64 }} className={classes.title}>{props.header}</Typography>
    else return (
      <div className={classes.headerBox}>
        <Typography variant="h6" className={classes.title}>{props.header.row1}</Typography>
        <Typography variant="h6" className={classes.title}> {props.header.row2}</Typography>
      </div>
    )
  }

  return (
    <Div className='navbar'>
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar className={classes.toolBar}>
            <img src='ITDlogo.jpg' alt='logo'></img>
            <div id='header'><Header /></div>
          </Toolbar>
          <Link className={classes.link} to={"/"}>Logout</Link>
          <Menu setDb={props.setDb} />
          <div className='pageMenu'>
            <IconButton onClick={handleIconClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon className={classes.menuIcon} />
            </IconButton>
          </div>
        </AppBar>
      </div>
    </Div>
  );
}

const Div = styled.div`


.MuiPaper-root{
    background-color: #004064;
    flex-direction: row;
    justify-content: flex-end;
    
}

.MuiToolbar-root{
    padding: 0;
    min-width: 75%;
}

img{
    height: 150px;
    width: 150px;
    margin: 0 20px;
}

.menu > .textButton{
  display: none;
}

.menu{
   display: flex;
    margin: auto 0;
    flex-direction: row;
    justify-content: space-between;
    
}

.MuiPaper-root{
    z-index: 1;
}

    .MuiSvgIcon-root{
        height: 100px;
        width: 100px;
        color: rgba(255, 255, 255, 1);

    }

    .pageMenu{
      margin: auto 0;
    }

    .MuiButtonBase-root{
    background-color: none;
    color: rgba(255, 255, 255, 1);
    font-size: 3em;
    /* transition: 
    background-color 250ms cubic-bezier(0.2, 1, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 1, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 1.2, 1) 0ms; */
}

    
@media (min-width:64em){

    --navHeight: 40px;
    --icon: calc(var(--navHeight) + 20px);

    .MuiButtonBase-root{
      background-color: rgba(255, 255, 255, 0.3);
      font-size: 1em;
}

    .MuiPaper-root{
        min-height: var(--navHeight);
        justify-content: left;
    }

    #header{
        display: none;
    }

    header{
        min-height: var(--navHeight);
    }

    .MuiToolbar-root{
        min-height: var(--navHeight);
    }

    .pageMenu{
        display: none;
    }

    img{
    height: var(--icon);
    width: var(--icon);
    }


.menu > .iconButton{
  display: none;
}

.menu > .textButton{
  display: block;
}

.MuiToolbar-root{
    min-width: 0%;
}


}
`;