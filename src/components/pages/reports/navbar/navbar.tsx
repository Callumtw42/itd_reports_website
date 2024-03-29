import AppBar from '@material-ui/core/AppBar/AppBar';
import React, { useState, useEffect, ReactNode } from 'react';
import Div from './style'
import Typography from '@material-ui/core/Typography/Typography'
import Toolbar from '@material-ui/core/Toolbar';
import { Link, } from 'react-router-dom';
import useDBMenu from "./usedbmenu/useDBMenu"
import useDate from "../../../../lib/usedate/usedate";
import "./style.scss"

export default function useNavBar() {

    const { Select, selected } = useDBMenu()
    const [db, setDb] = useState('itdepos');
    const { startDate, endDate, dateRange, Dates, DateRange } = useDate();

    useEffect(() => {
        if (selected !== "empty") setDb(selected)
    }, [selected])


    function NavBar() {
        return (
            // <Div><AppBar position={"fixed"}>
            <div className="NavBar">
                <AppBar position="fixed">
                    <div className='left'>
                        <img src='ITDlogo.jpg' alt='logo'></img>
                        {/* <Typography className="text">Branch: </Typography><Select /> */}
                        <div className="dates">
                            <DateRange></DateRange>
                        </div>
                    </div>
                    <div className="right">
                        <Link className="link" to={"/"}><Typography >Logout</Typography></Link>
                    </div>
                </AppBar>
            </div>
        )
    }

    return {
        db,
        startDate,
        endDate,
        dateRange,
        NavBar
    }
}
