import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

export default function DropDown(props) {
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
      console.log(event.target.textContent);
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
  
        <div className = 'textButton'>
          <Button
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            Branch Selector
          </Button>
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