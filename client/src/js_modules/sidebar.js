import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import BarChartIcon from '@material-ui/icons/BarChart';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PieChartIcon from '@material-ui/icons/PieChart';
import React, { useEffect } from 'react';
import styled from 'styled-components';




const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function SideBar(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerClose = () => {
        setOpen(false);
        props.setSideBar(false);

    };

    function handlePageChange(e) {

        props.setDisplaySalesByCategory('none');
        props.setDisplaySalesByHour('none');
        props.setDisplayStock('none');

        switch (e.target.textContent) {
            case 'Sales By Hour': props.setDisplaySalesByHour('inline');
                break;
            case 'Sales By Category': props.setDisplaySalesByCategory('inline');
                break;
            case 'Stock': props.setDisplayStock('inline');
                break;
            default:
        }
        handleDrawerClose();
    }

    useEffect(() => {
        setOpen(props.display);
    }, [props.display]);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Div>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="right"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem className='clickable' button onClick={(e) => handlePageChange(e)} >
                            <ListItemIcon><PieChartIcon /></ListItemIcon>
                            <ListItemText primary={'Sales By Category'} />
                        </ListItem>
                        <Divider />

                        <ListItem className='clickable' button onClick={(e) => handlePageChange(e)}>
                            <ListItemIcon><BarChartIcon /></ListItemIcon>
                            <ListItemText primary={'Sales By Hour'} />
                        </ListItem>
                        <Divider />

                        <ListItem className='clickable' button onClick={(e) => handlePageChange(e)}>
                            <ListItemIcon><ListAltIcon /></ListItemIcon>
                            <ListItemText primary={'Stock'} />
                        </ListItem>

                    </List>
                    <Divider />
                </Drawer>
            </Div>
        </div>
    );
}

const Div = styled.div`
.MuiListItemText-root> *{
    /* font-size: 48px; */
}

.MuiTypography-body1{
    font-size: 32px;
    margin: 0 10px 0 0;
}

.MuiSvgIcon-root{
    height:56px;
    width:56px;
    margin: 0 10px 0 0;
}
.MuiButtonBase-root{
    /* margin: 0 0 0 30px; */
    /* padding: 0; */
}
`;
// const
