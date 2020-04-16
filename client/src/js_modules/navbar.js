import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import HomeWorkIcon from '@material-ui/icons/HomeWork';

const useStyles = makeStyles((theme) => ({
  toolBar: {
    minHeight: 150,
    backgroundColor: '#004064'
  },
  title: {
    flexGrow: 1,
    fontSize: 48
  },
  headerBox: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

function Menu(props) {
  const [open, setOpen] = React.useState(false);
  const [databases, setDatabases] = React.useState(['xxx'])
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleSelect = (event) => {
    props.setDb(event.target.textContent);
    handleClose(event);
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  function allocateData(data) {
    setDatabases(data.map(e => { return Object.values(e)[0] }));
  }

  React.useEffect(() => {
    fetch(`api/databases`)
      .then(res => res.json())
      .then(data => allocateData(data))
      .catch((error) => {
      });

  }, []);

  function DBList() {
    let key = 0;
    return (
      databases.map(e => { return <MenuItem key={key++} onClick={handleSelect}>{e}</MenuItem> })
    );
  }


  return (
    <div className='menu'>

      <div className='textButton'>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Branch Selector
        </Button>
      </div>
      <div className='iconButton'>
        <IconButton
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <HomeWorkIcon />
        </IconButton>
      </div>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <DBList />
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );

}

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