import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import styled from 'styled-components';

export default function DropDown(props) {
  const [open, setOpen] = React.useState(false);
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
    console.log('xx')
    props.callback(event.target.textContent);
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

  function Items() {
    let key = 0;
    return (
      props.list.map(e => { return <Div1><MenuItem key={key++} onClick={handleSelect}>{e}</MenuItem></Div1> })
    );
  }


  return (
    <Div1>
      <div className='menu'>

        <div className='textButton'>
          <Button
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            {props.title}
          </Button>
        </div>

        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom', zIndex: 1 }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <Items />
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

      </div>
    </Div1>
  );

}

const Div1 = styled.div`

.MuiMenuItem-root {
  font-size: 4em;
}

.MuiButton-root{
  font-size: 2rem;
  /* color: #FFFFFF */
  background-color: rgba(0, 0, 0, 0.06);
 margin-left: 1em;
}

.MuiButtonBase-root{

}

@media (min-width:64em){

  .MuiMenuItem-root {
  font-size: 1em;
}

.MuiButton-root{
  font-size: 1rem;
  /* color: #FFFFFF */
}

}

`;