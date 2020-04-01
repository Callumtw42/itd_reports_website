import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // minHeight: 100
    },
    toolBar: {
        minHeight: 150,
        backgroundColor: '#004064'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    menuIcon: {
        fontSize: 100
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

export default function NavBar(props) {
    const classes = useStyles();

    function handleIconClick() {
        props.setSideBar(true);
    }

    return (
        <Div>
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar className={classes.toolBar}>
                        <img src='ITDlogo.jpg'></img>

                        <div className={classes.headerBox}>
                            <Typography variant="h6" className={classes.title}>
                                {props.header.row1}
                            </Typography>
                            <Typography variant="h6" className={classes.title}>
                                {props.header.row2}
                            </Typography>
                        </div>
                    </Toolbar>
                    <IconButton onClick={handleIconClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon className={classes.menuIcon} />
                    </IconButton>
                </AppBar>
                {console.log("Nav Render")}
            </div>
        </Div>
    );
}

const Div = styled.div`
/* .MuiAppBar-root{
    flex-direction: row;
} */
.MuiPaper-root{
    background-color: #004064;
    flex-direction: row;
    /* align-content: right; */
    justify-content: space-between
}

.MuiToolbar-root{
    padding: 0;
}


img{
    height: 150px;
    width: 150px;
    margin: 0 20px;
    /* align-self: right; */
    
}
/* .img{
    align-self: right;
} */
`;