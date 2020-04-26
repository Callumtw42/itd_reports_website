import { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import useData from './data';
import useDate from './date';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import HeaderBar from '../header_bar'
import SimpleSelect from '../select'
import EnhancedTable from '../table'
export default function ReturnToSupplier(props) {

    const {
        startDate,
        endDate,
        Dates
    } = useDate();

    const {
        data
    } = useData(`/api/returntosupplier/${props.db}/${startDate}/${endDate}`, (data) => { return data });

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        setTableData(data);
    },[data])

    return (
        <div className='report'>
            <Paper className='reportContainer'>
                <HeaderBar ><Typography className='text' variant="h6">{props.header}</Typography></HeaderBar>
                <div className='reportBody'>
                    <Dates /><EnhancedTable data={tableData} />
                </div>
            </Paper>
        </div>
    );
}